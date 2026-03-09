import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  // Basic
  name:           { type: String, required: true },   // Make e.g. "Ford"
  model:          { type: String, required: true },   // e.g. "KA"
  variant:        { type: String, default: "" },      // e.g. "Zetec Black Edition"
  year:           { type: Number, required: true },
  price:          { type: Number, required: true },
  monthlyPayment: { type: Number, default: 0 },
  registration:   { type: String, default: "Not specified" },

  // Specs
  mileage:        { type: Number, default: 0 },
  fuelType:       { type: String, default: "Petrol" },
  transmission:   { type: String, default: "Manual" },
  bodyType:       { type: String, default: "" },
  engine:         { type: String, default: "" },
  colour:         { type: String, default: "" },

  // Content
  description:    { type: String, default: "" },
  features:       { type: [String], default: [] },

  // Under the Bonnet — matches bonnetData array exactly
  bonnetData: {
    type: [{
      _id:   false,
      icon:  { type: String, default: "" },
      title: { type: String, default: "" },
      value: { type: String, default: "" },
    }],
    default: [],
  },

  // Images
  images: { type: [String], required: true },

}, { timestamps: true });

const carModel = mongoose.models.car || mongoose.model("car", carSchema);
export default carModel;