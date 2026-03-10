import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controllers/carController.js";

const carRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname.replace(/[^a-z0-9.]/gi, '_')}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPEG, PNG, WEBP allowed."), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err)
    return res.status(400).json({ success: false, message: err.message });
  next();
};

// Public read endpoints
carRouter.get("/",    getCars);
carRouter.get("/:id", getCarById);

// Protected write endpoints (require admin auth)
carRouter.post("/",      authMiddleware, upload.array("images", 15), handleMulterError, createCar);
carRouter.put("/:id",    authMiddleware, upload.array("images", 15), handleMulterError, updateCar);
carRouter.delete("/:id", authMiddleware, deleteCar);

export default carRouter;
