import mongoose from "mongoose";
import { optional } from "zod";

const blogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },

    metaTitle: { type: String },
    metaDescription: { type: String },

  
  },
  {
    timestamps: true, // includes createdAt and updatedAt
  }
);

const BlogCategory =
  mongoose.models.BlogCategory ??
  mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
