
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory";

// Route: GET /api/blogs/author/[authorName]
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { authorName } = await params;

    // Find all blogs matching the authorName
    const blogs = await Blog.find({ authorName }).populate({
      path: "category",
      select: "name", // only get category name
    });

    if (!blogs || blogs.length === 0) {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          message: "No blogs found for this author",
        }),
        { status: 404 }
      );
    }

    // Simplify each blog document
    const simplifiedBlogs = blogs.map((blog) => {
      const obj = blog.toObject();
      obj.category = obj.category?.name || null;
      return obj;
    });

    return new Response(
      JSON.stringify({ status: "SUCCESS", data: simplifiedBlogs }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching blogs by author:", err);
    return new Response(
      JSON.stringify({ status: "ERROR", message: err.message }),
      { status: 500 }
    );
  }
}
