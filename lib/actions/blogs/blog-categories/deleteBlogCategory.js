"use server";

import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";


export const deleteBlogCategoryAction = async (id) => {
  try {
    await dbConnect();
    await BlogCategory.findByIdAndDelete(id);
    return { status: "SUCCESS", message: "Blog category deleted successfully" };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
