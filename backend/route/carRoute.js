import express from "express";
import multer from "multer";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controllers/carController.js";
import authMiddleware from "../middleware/auth.js"
const carRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
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

carRouter.post("/",  authMiddleware,    upload.array("images", 15), handleMulterError, createCar);
carRouter.get("/",       getCars);
carRouter.get("/:id",    getCarById);
carRouter.put("/:id",  authMiddleware,  upload.array("images", 15), handleMulterError, updateCar);
carRouter.delete("/:id", authMiddleware, deleteCar);

export default carRouter;