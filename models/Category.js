// models/Category.js
import mongoose from "mongoose";
import { optional } from "zod";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug must be lowercase letters, numbers and hyphens",
      ],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    icon: {
      type: String,
      default: "",
    },
    toolsCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Tools count must be an integer",
      },
    },
    metaTitle: {
      type: String,
      required: [true, "Meta title is required"],
    },
    metaDescription: {
      type: String,
      required: [true, "Meta description is required"],
    },
    homepage: {
      type: Boolean,
      default: false,
      optional: true,
    },
  },

  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);

export default Category;
