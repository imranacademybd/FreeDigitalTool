"use server";

import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";


export const deleteManyBlogCategoriesAction = async (ids = []) => {
  try {
    await dbConnect();
    await BlogCategory.deleteMany({ _id: { $in: ids } });
    return { status: "SUCCESS", message: "Categories deleted successfully" };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
