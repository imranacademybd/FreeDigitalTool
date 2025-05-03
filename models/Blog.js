import mongoose from "mongoose";
import { optional } from "zod";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },

    coverImage: { type: String, required: true }, // Imgbb or URL
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    authorName: { type: String, required: true },
    authorProfession: { type: String, optional: true },
    authorBio: { type: String, required: true },
    authorFacebook: { type: String, optional: true },
    authorLinkedin: { type: String, optional: true },
    authorYoutube: { type: String, optional: true },
    authorTwitterX: { type: String, optional: true },
    authorInstagram: { type: String, optional: true },
    authorImage: { type: String, optional: true },

    metaTitle: { type: String },
    metaDescription: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },

    featured: { type: Boolean, default: false, optional: true },
    views: { type: Number, default: 0 },
  },

  {
    timestamps: true, // adds createdAt and updatedAt
 
  }
);

if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

const Blog = mongoose.models.Blog ?? mongoose.model("Blog", blogSchema);
export default Blog;
