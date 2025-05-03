import BlogDetails from "@/components/BlogDetails";
import { axiosClient } from "@/lib/apiClient";

import {cache} from 'react'

export const revalidate = 10; // Optional: Set revalidation for dynamic content
const getBlogDetails = cache(async (id) => {
  const blogResponse = await axiosClient.get(`/api/blogs/${id}`);
  const blog = blogResponse?.data?.simplifiedBlogs;
  return blog;
});
export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlogDetails(id); // Fetch the blog details using the ID
  return {
    title: `${blog?.title}`,
    description: blog?.excerpt ? blog?.excerpt : "Read our latest blog post",
    openGraph: {
      title: `${blog?.title}`,
      description: blog?.excerpt ? blog?.excerpt : "Read our latest blog post",
      url: `/blogs/${id}`,
      images: [
        {
          url: blog?.coverImage ,
          width: 800,
          height: 600,
        },
      ],
    },  
  };
}

const BlogDetailsPage = async ({ params }) => {
  const { id } = await params; // Dynamic blog ID from URL

  // Fetch the single blog details
  const blogResponse = await axiosClient.get(`/api/blogs/${id}`);
  const blog = blogResponse?.data?.simplifiedBlogs;

  const response = await axiosClient.get(
    `/api/blogs?recent=true`
  );
  const blogs = response?.data?.simplifiedBlogs || [];

  // Fetch blog categories for the sidebar
  const categoriesResponse = await axiosClient.get(
    "/api/blogs/blog-categories"
  );
  const categories = categoriesResponse?.data?.simplifiedBlogsCategories;

  // Fetch tool categories for the sidebar
  const toolCategoriesResponse = await axiosClient.get(
    "/api/admin/getCategory"
  );
  const toolCategories = toolCategoriesResponse?.data?.data;

  //  const recentPosts = [];

  // Pass all data to the BlogDetails component
  return (
    <BlogDetails
      blog={blog}
      categories={categories}
      // recentPosts={recentPosts}
      toolCategories={toolCategories}
      recentPosts={blogs}
    />
  );
};

export default BlogDetailsPage;
