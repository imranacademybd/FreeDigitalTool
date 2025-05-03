// models/advertisement.js
import mongoose from "mongoose";
import { optional } from "zod";

const advertisementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["text", "image", "code"],
    },
    targetUrl: {
      type: String,
      optional: true,
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return this.type !== "image" || !!v;
        },
        message: "Image URL is required for image advertisements",
      },
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Advertisement =
  mongoose.models.Advertisement ??
  mongoose.model("Advertisement", advertisementSchema);

export default Advertisement;
