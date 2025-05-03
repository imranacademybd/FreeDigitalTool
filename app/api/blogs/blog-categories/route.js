import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await BlogCategory.find();
    // Check if blogs are found
    
    return Response.json({ status: "SUCCESS", categories });
  } catch (err) {
    console.log("blogs categories error: ", err);

    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
