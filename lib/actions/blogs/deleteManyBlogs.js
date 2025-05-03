"use server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export const deleteManyBlogsAction = async (ids = []) => {
  try {
    await dbConnect();
    await Blog.deleteMany({ _id: { $in: ids } });

    return { status: "SUCCESS" };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
