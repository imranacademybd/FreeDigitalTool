import BlogsCard from "@/components/BlogsCard";
import { axiosClient } from "@/lib/apiClient";

import Link from "next/link";
import React, { cache } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const getAuthorBlogs = cache(async (authorName) => {
  const authorBlogsRes = await axiosClient.get(
    `/api/blogs/author/${authorName}`
  );
  const authorsBlogs = authorBlogsRes?.data?.data || [];
  return authorsBlogs;
});
export async function generateMetadata({ params }) {
  const { authorName: kebabAuthor } = params;

  // convert “hamza-aryan-sapnil” → “hamza aryan sapnil”
  const authorName = kebabAuthor.replace(/-/g, " ");
  const authorsBlogs = await getAuthorBlogs(authorName); 
  const {
    authorImage,
    authorName: displayName,
    authorProfession,
    authorBio,
  } = authorsBlogs[0];
  return {
    title: `${displayName}`,
    description: authorBio ? authorBio : "Author Bio",
    openGraph: {
      title: `${displayName}`,
      description: authorBio ? authorBio : "Author Bio",
      url: `/blogs/author/${authorName}`,
      images: [
        {
          url: authorImage,
          width: 800,
          height: 600,
        },
      ],
    },
   
  };
}
const AuthorPage = async ({ params }) => {
  const { authorName: kebabAuthor } = params;

  // convert “hamza-aryan-sapnil” → “hamza aryan sapnil”
  const authorName = kebabAuthor.replace(/-/g, " ");

  // const res = await axiosClient.get(
  //   `/api/blogs/author/${authorName}`
  // );
  // const authorsBlogs = res?.data?.data || [];
  const authorsBlogs = await getAuthorBlogs(authorName);

  // if no blogs, you could return a 404 or a fallback UI
  if (authorsBlogs.length === 0) {
    return <p>No posts by {authorName}</p>;
  }

  // grab author info from the first blog
  const {
    authorImage,
    authorName: displayName,
    authorProfession,
    authorBio,
  } = authorsBlogs[0];

  return (
    <section className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
      {/* SIDEBAR */}
      <aside className="border rounded-lg p-6">
        {authorImage && (
          <img
            src={authorImage}
            alt={displayName}
            className="w-32 h-32 rounded-full object-cover mb-4 mx-auto"
          />
        )}
        <h2 className="text-2xl font-bold text-center mb-2">{displayName}</h2>
        <p className="text-center italic mb-4">
          {authorProfession ? authorProfession : "Author"}
        </p>

        <p className="text-sm leading-relaxed whitespace-pre-line">
          {authorBio}
        </p>
        {/* social links */}
        <div className="flex justify-center space-x-4 mt-4">
          {authorsBlogs[0].authorFacebook && (
            <Link
              href={authorsBlogs[0].authorFacebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook size={20} />
            </Link>
          )}
          {authorsBlogs[0].authorLinkedin && (
            <Link
              href={authorsBlogs[0].authorLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin size={20} />
            </Link>
          )}
          {authorsBlogs[0].authorYoutube && (
            <Link
              href={authorsBlogs[0].authorYoutube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-red-600 hover:text-red-800"
            >
              <FaYoutube size={20} />
            </Link>
          )}
          {authorsBlogs[0].authorTwitterX && (
            <Link
              href={authorsBlogs[0].authorTwitterX}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={20} />
            </Link>
          )}
          {authorsBlogs[0].authorInstagram && (
            <Link
              href={authorsBlogs[0].authorInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:text-pink-700 "
            >
              <FaInstagram size={20} />
            </Link>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT: BLOG CARDS */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {authorsBlogs.map((blog) => (
          <BlogsCard key={blog._id} item={blog} />
        ))}
      </div>
    </section>
  );
};

export default AuthorPage;
