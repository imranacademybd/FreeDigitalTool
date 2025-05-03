"use client";
import { axiosClient } from "@/lib/apiClient";


export const refreshBlogs = async () => {
  const res = await axiosClient(`/api/blogs`);
  const blog = res?.data?.simplifiedBlogs || [];
  return blog;
};
