 // This is to make sure the page is not cached by Next.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    
    const blog = await Blog.findById(id).populate({
      path: "category",
      select: "name", // 👈 only get category name
    });

    // Check if blogs are found
    const simplifiedBlogs = blog?.toObject();
    if (simplifiedBlogs) {
      simplifiedBlogs.category = simplifiedBlogs?.category?.name || null; // ✅ Only the name as a string
    }

    if (!blog) {
      return Response.json(
        { status: "ERROR", message: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json({ status: "SUCCESS", simplifiedBlogs });
  } catch (err) {
    console.log("single blog error", err);

    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
