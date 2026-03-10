import mongoose from "mongoose";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import productModel from "../models/ProductModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.CLIENT_URL;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// ─── EMAIL TEMPLATES ────────────────────────────────────────────────────────

function buildProductRows(products) {
  return products
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">
          ${item.name}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;text-align:right;">
          £${Number(item.price).toFixed(2)}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;font-weight:600;color:#317F21;text-align:right;">
          £${(Number(item.price) * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");
}

// Email to CUSTOMER after order
function customerEmailHtml(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#317F21,#4CAF50);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:1px;">✅ Order Confirmed!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
              Thank you for your purchase, <strong>${order.user}</strong>
            </p>
          </td>
        </tr>

        <!-- Order ID Banner -->
        <tr>
          <td style="background:#f9fff7;padding:16px 40px;border-bottom:1px solid #e8f5e9;">
            <p style="margin:0;font-size:13px;color:#666;">Order Reference</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#317F21;letter-spacing:1px;">
              #${order.orderId}
            </p>
          </td>
        </tr>

        <!-- Customer Details -->
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#333;border-bottom:2px solid #e8f5e9;padding-bottom:8px;">
              📦 Delivery Details
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:13px;color:#888;padding:4px 0;width:120px;">Name</td>
                <td style="font-size:14px;color:#333;padding:4px 0;font-weight:600;">${order.user}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#888;padding:4px 0;">Email</td>
                <td style="font-size:14px;color:#333;padding:4px 0;">${order.email}</td>
              </tr>
              ${order.phone ? `
              <tr>
                <td style="font-size:13px;color:#888;padding:4px 0;">Phone</td>
                <td style="font-size:14px;color:#333;padding:4px 0;">${order.phone}</td>
              </tr>` : ""}
              ${order.address ? `
              <tr>
                <td style="font-size:13px;color:#888;padding:4px 0;">Address</td>
                <td style="font-size:14px;color:#333;padding:4px 0;">${order.address}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>

        <!-- Products Table -->
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#333;border-bottom:2px solid #e8f5e9;padding-bottom:8px;">
              🛒 Items Ordered
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
              <thead>
                <tr style="background:#f9f9f9;">
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:left;font-weight:600;">PRODUCT</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:center;font-weight:600;">QTY</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:right;font-weight:600;">PRICE</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:right;font-weight:600;">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${buildProductRows(order.products)}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Total -->
        <tr>
          <td style="padding:16px 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td></td>
                <td style="width:200px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fff7;border-radius:8px;padding:16px;border:1px solid #e8f5e9;">
                    <tr>
                      <td style="font-size:14px;color:#666;">Total Paid</td>
                      <td style="font-size:22px;font-weight:700;color:#317F21;text-align:right;">
                        £${Number(order.amount).toFixed(2)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;font-size:13px;color:#999;">
              Questions? Contact us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color:#317F21;">${process.env.ADMIN_EMAIL}</a>
            </p>
            <p style="margin:8px 0 0;font-size:12px;color:#bbb;">MA Auto Electricals</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Email to ADMIN for every new order
function adminEmailHtml(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a2e,#317F21);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:24px;">🔔 New Order Received</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">
              ${new Date(order.createdAt).toLocaleString("en-GB", {
                day: "2-digit", month: "long", year: "numeric",
                hour: "2-digit", minute: "2-digit"
              })}
            </p>
          </td>
        </tr>

        <!-- Order ID -->
        <tr>
          <td style="background:#fffde7;padding:16px 40px;border-bottom:1px solid #fff9c4;">
            <p style="margin:0;font-size:13px;color:#888;">Order ID</p>
            <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#f57f17;letter-spacing:1px;">
              #${order.orderId}
            </p>
          </td>
        </tr>

        <!-- Customer Info -->
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#333;border-bottom:2px solid #f0f0f0;padding-bottom:8px;">
              👤 Customer Details
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:13px;color:#888;padding:5px 0;width:120px;">Name</td>
                <td style="font-size:14px;color:#333;padding:5px 0;font-weight:600;">${order.user}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#888;padding:5px 0;">Email</td>
                <td style="font-size:14px;color:#333;padding:5px 0;">${order.email}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#888;padding:5px 0;">Phone</td>
                <td style="font-size:14px;color:#333;padding:5px 0;">${order.phone || "—"}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#888;padding:5px 0;">Address</td>
                <td style="font-size:14px;color:#333;padding:5px 0;">${order.address || "—"}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Products Table -->
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#333;border-bottom:2px solid #f0f0f0;padding-bottom:8px;">
              🛒 Products Ordered
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
              <thead>
                <tr style="background:#f9f9f9;">
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:left;font-weight:600;">PRODUCT</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:center;font-weight:600;">QTY</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:right;font-weight:600;">PRICE</th>
                  <th style="padding:10px 12px;font-size:12px;color:#888;text-align:right;font-weight:600;">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${buildProductRows(order.products)}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Total + Payment Status -->
        <tr>
          <td style="padding:16px 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#e8f5e9;color:#317F21;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;">
                    ✅ ${order.payment_status}
                  </span>
                </td>
                <td style="width:220px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:8px;padding:16px;">
                    <tr>
                      <td style="font-size:14px;color:#aaa;">Total Received</td>
                      <td style="font-size:22px;font-weight:700;color:#4CAF50;text-align:right;">
                        £${Number(order.amount).toFixed(2)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#bbb;">MA Auto Electricals — Admin Notification</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── CONTROLLERS ────────────────────────────────────────────────────────────

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

    for (const item of cart) {
      const product = await productModel.findById(item._id);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.name}` });
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
      metadata: { user: name, email, phone, address, cart: JSON.stringify(compactCart) },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log("Webhook received");

  let event;
  try {
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
    }
  }

  res.json({ received: true });
};

export const checkoutSuccess = async (req, res) => {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    let order = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      order = await orderModel.findOne({ stripeSessionId: session_id });
      if (order) break;
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (!order) {
      console.log("Fallback: retrieving from Stripe directly");
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
      order = await handleCheckoutCompleted(stripeSession, req);
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// ─── SHARED LOGIC ────────────────────────────────────────────────────────────

async function handleCheckoutCompleted(stripeSession, req) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const metadata = stripeSession.metadata || {};
    const products = JSON.parse(metadata.cart || "[]");

    const exists = await orderModel.findOne({ stripeSessionId: stripeSession.id });
    if (exists) {
      await session.endSession();
      return exists;
    }

    if (stripeSession.payment_status !== "paid") {
      throw new Error(`Payment not completed. Status: ${stripeSession.payment_status}`);
    }

    for (const item of products) {
      const product = await productModel.findById(item._id).session(session);
      if (!product) throw new Error(`Product not found: ${item.name}`);
      if (product.count < item.quantity) {
        throw new Error(`Only ${product.count} item(s) available for ${item.name}`);
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
    if (req?.app) {
      const io = req.app.get("io");
      if (io) {
        const updatedProducts = await productModel.find({
          _id: { $in: products.map((p) => p._id) },
        });
        updatedProducts.forEach((p) => io.emit("stockUpdated", p));
      }
    }

    // ✅ Beautiful emails with full order details
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Order #${order.orderId} — £${Number(order.amount).toFixed(2)}`,
      html: adminEmailHtml(order),
    });

    await sendEmail({
      to: order.email,
      subject: `✅ Order Confirmed #${order.orderId} — MA Auto Electricals`,
      html: customerEmailHtml(order),
    });

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("handleCheckoutCompleted error:", err);
    throw err;
  }
}