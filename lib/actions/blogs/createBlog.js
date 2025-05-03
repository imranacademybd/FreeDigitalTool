"use server";

import Blog from "@/models/Blog";

import dbConnect from "@/lib/db";

export const createBlogServerAction = async (data) => {
  try {
    await dbConnect();

    //? console.log("🏷️  createBlogServerAction received:", data);
    const newBlog = await Blog.create(data);
    console.log("new Blog: ", newBlog);
    

    return { status: "SUCCESS", message: "Blog created successfully" };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
