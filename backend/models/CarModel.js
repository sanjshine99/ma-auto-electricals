import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // Basic
    name:         { type: String, required: [true, "Make is required"] },
    model:        { type: String, required: [true, "Model is required"] },
    variant:      { type: String, default: "" },
    year:         { type: Number, required: [true, "Year is required"] },
    price:        { type: Number, required: [true, "Price is required"] },
    registration: { type: String, required: [true, "Registration is required"] },

    // Specs
    mileage:      { type: Number, required: [true, "Mileage is required"], min: [0, "Mileage cannot be negative"] },
    fuelType:     { type: String, required: [true, "Fuel type is required"] },
    transmission: { type: String, required: [true, "Transmission is required"] },
    bodyType:     { type: String, required: [true, "Body type is required"] },
    engine:       { type: String, required: [true, "Engine is required"] },
    colour:       { type: String, required: [true, "Colour is required"] },
    ulez:         { type: Boolean, default: false },

    // Content
    description:  { type: String, required: [true, "Description is required"] },
    features:     { type: [String], default: [] },

    // Under the Bonnet
    bonnetData: {
      type: [
        {
          _id:   false,
          icon:  { type: String, default: "" },
          title: { type: String, default: "" },
          value: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // Images
    images: { type: [String], required: [true, "At least one image is required"] },
  },
  { timestamps: true }
);

const carModel = mongoose.models.car || mongoose.model("car", carSchema);
export default carModel;