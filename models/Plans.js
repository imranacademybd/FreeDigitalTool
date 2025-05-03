// models/Plan.js
import mongoose from "mongoose";

const ToolFieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: mongoose.Schema.Types.Mixed, // number, boolean, string
  },
  { _id: false }
);

const ToolConfigSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    fields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false }
);

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    yearlyPrice: { type: Number, default: 0 },
    monthlyPrice: { type: Number, default: 0 },
    allow_api: { type: Boolean, default: false },
    no_ads: { type: Boolean, default: false },

    dailyUsage: { type: Number, default: 10 },
    wordCount: { type: Number, default: 100 },
    fileSize: { type: Number, default: 10 },
    numberOfImage: { type: Number, default: 10 },
    numberOfDomain: { type: Number, default: 10 },

    tools: {
      type: Object, // This allows saving dynamic tool keys and values
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Plan ?? mongoose.model("Plan", planSchema);
