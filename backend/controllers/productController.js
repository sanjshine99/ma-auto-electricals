import productModel from "../models/ProductModel.js";
import fs from "fs";
import multer from "multer";
import path from "path";

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });

// --- CREATE product ---
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, count, category } = req.body;
    const images = req.files.map((file) => `${file.filename}`);

    const product = new productModel({
      name,
      description,
      price,
      count,
      images,
      category: category || "Default",
    });

    const savedProduct = await product.save();

    // --- SOCKET.IO EMIT ---
    req.app.get("io").emit("newProduct", savedProduct);

    res.status(201).json({ success: true, message: "Product created", data: savedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- GET all products ---
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- GET product by ID ---
export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- UPDATE product ---
export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const { name, description, price, count, category, removeImages,isBestSelling } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (count) product.count = Number(count);
    if (category) product.category = category;
    if (isBestSelling !== undefined) {
      
      product.isBestSelling = isBestSelling === "true" || isBestSelling === true;
    }
   

    // Remove images
    if (removeImages) {
      const imgsToRemove = JSON.parse(removeImages);
      product.images = product.images.filter(img => !imgsToRemove.includes(img));
      imgsToRemove.forEach(img => {
        const filePath = path.join("uploads", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(f => f.filename);
      product.images = [...product.images, ...newImages];
    }

    const updatedProduct = await product.save();

    // --- SOCKET.IO EMIT ---
    req.app.get("io").emit("updateProduct", updatedProduct);

    res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// --- DELETE product ---
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });

    // --- SOCKET.IO EMIT ---
    req.app.get("io").emit("deleteProduct", deletedProduct._id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};