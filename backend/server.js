import "dotenv/config"; // MUST be first line
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./route/userRoute.js";
import carRouter from "./route/carRoute.js";
import productRouter from "./route/productRoute.js";
import stripeRouter from "./route/stripeRoute.js";
import orderRouter from "./route/orderRoute.js";
import invoiceRouter from "./route/invoiceRoute.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.ADMIN_URL,
  process.env.CLIENT_URL,
].map((url) => url?.replace(/\/$/, "")).filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server requests (no origin) only in development
    if (!origin && process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ⚠️ STRIPE WEBHOOK: Must be registered BEFORE express.json()
// Stripe webhook needs raw body for signature verification.
// If express.json() runs first, req.body becomes a parsed object
// and stripe.webhooks.constructEvent() will throw an error.
app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" })
);

// Normal middleware for all other routes
app.use(cors(corsOptions));
app.use(express.json());

connectDB();
app.use("/images", express.static("uploads"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/orders", orderRouter);
app.use("/api/invoices", invoiceRouter);

app.get("/", (req, res) => res.send("API is running"));

// HTTP + Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected"));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});