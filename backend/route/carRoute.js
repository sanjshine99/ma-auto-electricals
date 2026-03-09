import express from "express";
import multer from "multer";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controllers/carController.js";

const carRouter = express.Router();

// 1. Storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
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

// 3. Multer Middleware with limits and filter
const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit: 5MB per file
  }
});

// Middleware to handle Multer errors (like file size limits)
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// Routes
carRouter.post("/", upload.array("images", 5), handleMulterError, createCar);
carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.put("/:id", upload.array("images", 5), handleMulterError, updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;