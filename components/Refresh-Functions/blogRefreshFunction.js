"use client";
import axios from "axios";

export const refreshBlogs = async () => {
  const res = await axios("http://localhost:3000/api/blogs");
  const blog = res?.data?.simplifiedBlogs || [];
  return blog;
};
