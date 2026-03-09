import mongoose from "mongoose";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import productModel from "../models/ProductModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.CLIENT_URL;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

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

    // STOCK CHECK BEFORE PAYMENT
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
 * STRIPE WEBHOOK - Stripe directly calls this when payment succeeds.
 * This is the RELIABLE way to save orders.
 *
 * IMPORTANT: This route needs raw body (not parsed JSON).
 * See stripeRoute.js - express.raw() middleware is applied for this route.
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
    console.log("webhook conneted")
  let event;
  try {
    // Verify webhook came from Stripe using STRIPE_WEBHOOK_SECRET
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      await handleCheckoutCompleted(event.data.object, req);
    } catch (err) {
      console.error("Webhook handling failed:", err.message);
      // Still return 200 so Stripe doesn't keep retrying for logic errors
    }
  }

  // Always respond 200 to Stripe
  res.json({ received: true });
};

/**
 * CHECKOUT SUCCESS PAGE - Called by frontend after redirect.
 * Now just READS the already-saved order (webhook saved it).
 * Has a fallback in case webhook hasn't fired yet.
 */
export const checkoutSuccess = async (req, res) => {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    // Retry loop: wait for webhook to save the order (up to 5 seconds)
    let order = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      order = await orderModel.findOne({ stripeSessionId: session_id });
      if (order) break;
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (!order) {
      // Fallback: webhook may not have fired yet, save manually
      console.log("Fallback: webhook may not have fired yet, save manually")
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
      order = await handleCheckoutCompleted(stripeSession, req);
    } else {
      console.log("Fallback: webhook may not have fired yet, save manually")
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

/**
 * SHARED LOGIC - Saves order, decrements stock, sends emails.
 * Called by both webhook and checkoutSuccess fallback.
 */
async function handleCheckoutCompleted(stripeSession, req) {
 
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const metadata = stripeSession.metadata || {};
    const products = JSON.parse(metadata.cart || "[]");

    // Prevent duplicate orders
    const exists = await orderModel.findOne({
      stripeSessionId: stripeSession.id,
    });
    if (exists) {
      await session.endSession();
      return exists;
    }

    // Only process fully paid sessions
    if (stripeSession.payment_status !== "paid") {
      throw new Error(
        `Payment not completed. Status: ${stripeSession.payment_status}`
      );
    }

    // Decrement stock (inside transaction)
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

    // Socket update
    if (req && req.app) {
      const io = req.app.get("io");
      if (io) {
        const updatedProducts = await productModel.find({
          _id: { $in: products.map((p) => p._id) },
        });
        updatedProducts.forEach((p) => io.emit("stockUpdated", p));
      }
    }

    // Send emails
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Order ${order.orderId}`,
      html: `<h3>New order placed by ${order.user}</h3>`,
    });

    await sendEmail({
      to: order.email,
      subject: `Order Confirmation ${order.orderId}`,
      html: `<h3>Thank you for your order, ${order.user}!</h3>`,
    });

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("handleCheckoutCompleted error:", err);
    throw err;
  }
}