
import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";
import Category from "@/models/Category";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const blogCategory = await BlogCategory.findById(id).populate("parentCategory");

    // Check if blogs are found
    const simplifiedBlogsCategory = blogCategory?.toObject();
    if (simplifiedBlogsCategory) {
      simplifiedBlogsCategory.parentCategory =
        simplifiedBlogsCategory?.parentCategory?.name || null; // ✅ Only the name as a string
    }

    if (!simplifiedBlogsCategory) {
      return Response.json(
        { status: "ERROR", message: "Category not found" },
        { status: 404 }
      );
    }

    return Response.json({ status: "SUCCESS", simplifiedBlogsCategory });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
