"use server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export const updateBlogServerAction = async (blogId, data) => {
  try {
    await dbConnect();
    console.log("Update Blog Data: ", data);
    
    const updated = await Blog.findByIdAndUpdate(blogId, data, { new: true });

    return { status: "SUCCESS", message: "Blog updated successfully"};
  } catch (err) {
    console.log("Error updating blog", err);
    
    return { status: "ERROR", message: err.message };
  }
};
