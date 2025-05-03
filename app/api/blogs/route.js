 // This is to ensure the route is not cached by Next.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory";



export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request?.url);
    const recent = searchParams?.get("recent");
    const limitParam = searchParams?.get("limit");


     let query = Blog.find();

     if (recent === "true" || limitParam) {
       query = query.sort({ createdAt: -1 });
       if (limitParam) query = query.limit(parseInt(limitParam));
       else query = query.limit(5); // default 5
     }


    const blogs = await query.populate({
      path: "category",
      select: "name", // 👈 only get category name
    });
    // Check if blogs are found
      const simplifiedBlogs = blogs?.map((blog) => {
        const blogObj = blog.toObject();

        return {
          ...blogObj,
          category: blogObj.category?.name || null, // ✅ Only the name as a string
        };
      });
    
   

    return Response.json({
      status: "SUCCESS",
      simplifiedBlogs,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
