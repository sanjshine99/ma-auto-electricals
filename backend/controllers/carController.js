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

    let features = [];
    let bonnetData = [];
    try { features   = JSON.parse(req.body.features   || "[]"); } catch {}
    try { bonnetData = JSON.parse(req.body.bonnetData || "[]"); } catch {}

    const car = new carModel({
      name:           req.body.name,
      model:          req.body.model,
      variant:        req.body.variant        || "",
      year:           Number(req.body.year),
      price:          Number(req.body.price),
      monthlyPayment: Number(req.body.monthlyPayment || 0),
      registration:   req.body.registration   || "Not specified",
      mileage:        Number(req.body.mileage  || 0),
      fuelType:       req.body.fuelType        || "Petrol",
      transmission:   req.body.transmission    || "Manual",
      bodyType:       req.body.bodyType        || "",
      engine:         req.body.engine          || "",
      colour:         req.body.colour          || "",
      ulez:           req.body.ulez === "true" || req.body.ulez === true,
      description:    req.body.description,
      features,
      bonnetData,
      images,
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

// UPDATE car
export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await carModel.findById(carId);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    const {
      name, model, variant, description, price, year, monthlyPayment,
      registration, mileage, fuelType, transmission, bodyType, engine,
      colour, ulez, removeImages, orderedImages,
    } = req.body;

    if (name)                         car.name           = name;
    if (model)                        car.model          = model;
    if (variant !== undefined)        car.variant        = variant;
    if (description)                  car.description    = description;
    if (price)                        car.price          = Number(price);
    if (year)                         car.year           = Number(year);
    if (monthlyPayment !== undefined) car.monthlyPayment = Number(monthlyPayment);
    if (registration)                 car.registration   = registration;
    if (mileage !== undefined)        car.mileage        = Number(mileage);
    if (fuelType)                     car.fuelType       = fuelType;
    if (transmission)                 car.transmission   = transmission;
    if (bodyType)                     car.bodyType       = bodyType;
    if (engine)                       car.engine         = engine;
    if (colour)                       car.colour         = colour;

    if (ulez !== undefined) {
      car.ulez = ulez === "true" || ulez === true;
    }

    if (req.body.features) {
      try { car.features = JSON.parse(req.body.features); } catch {}
    }
    if (req.body.bonnetData) {
      try { car.bonnetData = JSON.parse(req.body.bonnetData); } catch {}
    }

    // 1. Remove deleted images from disk
    if (removeImages) {
      const imagesToRemove = JSON.parse(removeImages);
      imagesToRemove.forEach((img) => {
        const filePath = path.join("uploads", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    // 2. Build the new images array:
    //    - Start with the ordered existing filenames (primary first)
    //    - Then append any newly uploaded files
    let finalImages = [];

    if (orderedImages) {
      // orderedImages = existing filenames in the order admin chose (primary at index 0)
      finalImages = JSON.parse(orderedImages);
    }

    if (req.files && req.files.length > 0) {
      const newFilenames = req.files.map((file) => file.filename);
      finalImages = [...finalImages, ...newFilenames];
    }

    if (finalImages.length > 0) {
      car.images = finalImages;
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
    if (!deletedCar) return res.status(404).json({ error: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};