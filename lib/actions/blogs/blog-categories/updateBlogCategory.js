"use server";

import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";


export const updateBlogCategoryAction = async (id, data) => {
  try {
    await dbConnect();
    const updated = await BlogCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    return { status: "SUCCESS", message: "Category updated successfully"};
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
