"use server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export const deleteBlogServerAction = async (id) => {
  try {
    await dbConnect();
    await Blog.findByIdAndDelete(id);

    return { status: "SUCCESS" };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
