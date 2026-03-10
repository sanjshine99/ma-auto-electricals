import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// 1. Storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    // Sanitize the filename to remove potentially dangerous characters
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname.replace(/[^a-z0-9.]/gi, '_')}`);
  },
});

// 2. File Filter (Validation)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."), false);
  }
};

// 3. Multer Middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// 4. Helper for Multer Errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// --- Routes ---
// Public read endpoints
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// Protected write endpoints (require admin auth)
productRouter.post("/", authMiddleware, upload.array("images", 5), handleMulterError, createProduct);
productRouter.put("/:id", authMiddleware, upload.array("images", 5), handleMulterError, updateProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);

export default productRouter;
