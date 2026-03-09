import "dotenv/config"; // 1. Ithe FIRST line-la irukanum
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

// 2. Allowed Origins - Console log panni check pannuvom
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173"
].map(url => url?.replace(/\/$/, "")); // Trailing slash (/) iruntha remove pannum

console.log("Allowed Origins:", allowedOrigins);

// 3. CORS Options FIX
const corsOptions = {
  origin: function (origin, callback) {
    // Vite development-la 'origin' correct-ah irukanum
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// --- Middleware ---
app.use(cors(corsOptions)); // <--- Inga 'corsOptions' pass panna maranthitteenga!
app.use(express.json());

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
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  } 
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected"));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});