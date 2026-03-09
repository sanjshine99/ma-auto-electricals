import carModel from "../models/CarModel.js";
import fs from "fs";
import path from "path";

// CREATE car
export const createCar = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const images = req.files.map((file) => file.filename);

    const car = new carModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      year: req.body.year,
      model: req.body.model,
      images, // array of filenames
    });

    await car.save();
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add car" });
  }
};


// GET all cars
export const getCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);

    if (!car) return res.status(404).json({ error: "Car not found" });

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Car Controller
export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await carModel.findById(carId);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    const { name, description, price, year, model, removeImages } = req.body;

    // Update fields if provided
    if (name) car.name = name;
    if (description) car.description = description;
    if (price) car.price = Number(price);
    if (year) car.year = Number(year);
    if (model) car.model = model;

    // Remove selected images
    if (removeImages) {
      const imagesToRemove = JSON.parse(removeImages);
      car.images = car.images.filter(img => !imagesToRemove.includes(img));
      
      imagesToRemove.forEach(img => {
        const filePath = path.join("uploads", img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        } else {
          console.log(`File not found: ${filePath}`);
        }
      });
    }

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      car.images = [...car.images, ...newImages];
    }

    await car.save();
    res.status(200).json({ success: true, message: "Car updated successfully", data: car });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE car
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await carModel.findByIdAndDelete(req.params.id);

    if (!deletedCar)
      return res.status(404).json({ error: "Car not found" });

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
