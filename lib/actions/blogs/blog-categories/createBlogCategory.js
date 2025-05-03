"use server";

import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";
import { blogCategoryFormSchema } from "@/schemas/blog-category-form-schema";


export const createBlogCategoryAction = async (data) => {
  try {
    await dbConnect();
    const validatedData = blogCategoryFormSchema.parse(data);
   
    const category = await BlogCategory.create(validatedData);
    return { status: "SUCCESS", message: "Category created successfully"};
  } catch (err) {
    console.log("Error creating blog category:", err);
    
    return { status: "ERROR", message: err.message };
  }
};
