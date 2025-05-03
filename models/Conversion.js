// models/Conversion.js
import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  inputValue: Number,
  inputUnit: String,
  conversions: {
    celsius: Number,
    fahrenheit: Number,
    kelvin: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: "30d", // Auto-delete after 30 days
    },
  },
});

export default mongoose.models.Conversion ??
  mongoose.model("Conversion", conversionSchema);
