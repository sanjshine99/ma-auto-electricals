import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./route/userRoute.js";
import carRouter from "./route/carRoute.js";
import productRouter from "./route/productRoute.js";
import stripeRouter from "./route/stripeRoute.js";
import orderRouter from "./route/orderRoute.js";
import invoiceRouter from "./route/invoiceRoute.js";
import "dotenv/config.js";
import http from "http";
import { Server } from "socket.io";

// --- Configuration ---
const app = express();
const port = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL;

// Safety check for production configuration
if (!clientUrl) {
  console.error("FATAL ERROR: CLIENT_URL is not defined in .env file.");
  process.exit(1);
}

// --- Middleware ---
app.use(express.json());
app.use(cors({
  origin: clientUrl,
  credentials: true, // Required if you use cookies or auth headers
}));

connectDB();
app.use("/images", express.static("uploads"));

// --- Routes ---
app.use("/api/user", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/orders", orderRouter);
app.use("/api/invoices", invoiceRouter);

app.get("/", (req, res) => res.send("API is running"));

// --- HTTP + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: clientUrl,
    methods: ["GET", "POST"]
  } 
});

// Make io accessible in controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));