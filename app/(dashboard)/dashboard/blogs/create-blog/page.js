export const dynamic = "force-dynamic";
import CreateBlogForm from "@/components/CreateBlogForm";
import axios from "axios";
import React from "react";

const page = async () => {
  const blogCatRes = await axios(
    "http://localhost:3000/api/blogs/blog-categories"
  );
  const categories = await blogCatRes?.data?.simplifiedBlogsCategories;

  return (
    <div className="max-w-7xl mx-auto p-4 font-roboto">
      <h1 className="text-2xl font-bold my-10 text-center font-playfair-display">
        Create Blog
      </h1>
      <CreateBlogForm categories={categories} />
    </div>
  );
};

export default page;
