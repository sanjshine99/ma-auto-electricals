import mongoose from "mongoose";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import productModel from "../models/ProductModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.CLIENT_URL;

/**
 * CREATE STRIPE CHECKOUT SESSION
 */
export const createCheckoutSession = async (req, res) => {
  const { cart, userDetails } = req.body;

  try {
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const name = userDetails.name || "Guest";
    const email = userDetails.email || "noemail@example.com";
    const phone = userDetails.phone || "";
    const address = userDetails.address || "";

    // 🔴 STOCK CHECK BEFORE PAYMENT
    for (const item of cart) {
      const product = await productModel.findById(item._id);

      if (!product) {
        return res.status(404).json({
          error: `Product not found: ${item.name}`,
        });
      }

      if (item.quantity > product.count) {
        return res.status(400).json({
          error: `Only ${product.count} item(s) available for ${item.name}`,
          availableStock: product.count,
          productId: product._id,
        });
      }
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: item.description?.substring(0, 200),
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const compactCart = cart.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cart`,
      metadata: {
        user: name,
        email,
        phone,
        address,
        cart: JSON.stringify(compactCart),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
};

/**
 * CHECKOUT SUCCESS → SAVE ORDER + DECREMENT STOCK
 */
export const checkoutSuccess = async (req, res) => {
  const { session_id } = req.query;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = stripeSession.metadata || {};
    const products = JSON.parse(metadata.cart || "[]");

    // 🔒 Prevent duplicate order
    const exists = await orderModel.findOne({
      stripeSessionId: stripeSession.id,
    });
    if (exists) {
      return res.json({ success: true, order: exists });
    }

    // 🔴 DECREMENT STOCK (TRANSACTION SAFE)
    for (const item of products) {
      const product = await productModel
        .findById(item._id)
        .session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }

      if (product.count < item.quantity) {
        throw new Error(
          `Only ${product.count} item(s) available for ${item.name}`
        );
      }

      product.count -= item.quantity;
      await product.save({ session });
    }

    const order = new orderModel({
      orderId: uuidv4(),
      stripeSessionId: stripeSession.id,
      user: metadata.user || "Guest",
      email: metadata.email || stripeSession.customer_email,
      phone: metadata.phone || "",
      address: metadata.address || "",
      products,
      amount: stripeSession.amount_total / 100,
      payment_status: stripeSession.payment_status,
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    // 🔔 SOCKET UPDATE
    const io = req.app.get("io");
    const updatedProducts = await productModel.find({
      _id: { $in: products.map((p) => p._id) },
    });
    updatedProducts.forEach((p) => io.emit("stockUpdated", p));

    // 📧 EMAILS
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Order ${order.orderId}`,
      html: `<h3>New order placed</h3>`,
    });

    await sendEmail({
      to: order.email,
      subject: `Order Confirmation ${order.orderId}`,
      html: `<h3>Thank you for your order</h3>`,
    });

    res.json({ success: true, order });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
