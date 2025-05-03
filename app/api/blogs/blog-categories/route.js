
import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await BlogCategory.find().populate("parentCategory");
    // Check if blogs are found
    const simplifiedBlogsCategories = categories?.map((cat) => {
      const catObj = cat.toObject();

      return {
        ...catObj,
        parentCategory: catObj.parentCategory?.name || null, // ✅ Only the name as a string
      };
    });
    return Response.json({ status: "SUCCESS", simplifiedBlogsCategories });
  } catch (err) {
    console.log("blogs categories error: ", err);
    
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
