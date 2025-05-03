"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom renderer to add IDs and classes to headings
import { marked } from "marked";
import Link from "next/link";

const headingMap = new Map();
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaReddit,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

marked.use({
  walkTokens(token) {
    if (token.type === "heading") {
      const raw = token.text || "";
      const id = raw
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      token.id = id;
      headingMap.set(raw, id);
    }
  },
  renderer: {
    heading(text) {
      let plainText = "";

      if (typeof text === "string") {
        plainText = text;
      } else if (typeof text === "object" && Array.isArray(text.text)) {
        plainText = text?.text?.join("");
      } else {
        plainText = String(text || "heading");
      }

      const id = text;
      return `<h${text?.depth} id="${text.id}" class="toolDetails-heading toolDetails-h${text.depth}">${text.text}</h${text.depth}>`;
    },
  },
});
const renderContent = (content) => {
  return marked.parse(content);
};

const ToolContent = ({ toolDetails, categories, recentPosts, toolCategories}) => {
     const [scrollPosition, setScrollPosition] = useState(0);
     const [sidebarVisible, setSidebarVisible] = useState(false);
     const [titles, setTitles] = useState([]);
     const shareUrl = "https://seostudio.tools/";
     const title = "Check out this awesome SEO tool!";
     const authorNameLink = toolDetails?.authorName?.replace(/\s+/g, "-");

       useEffect(() => {
         const parseTitles = () => {
           const tempTitles = [];
           const contentElement = document.createElement("div");
           contentElement.innerHTML = renderContent(toolDetails?.content);
     
           const hTags = contentElement.querySelectorAll("h1, h2, h3");
           hTags.forEach((tag) => {
             const id = tag.id || tag.textContent.replace(/\s+/g, "-").toLowerCase();
             tempTitles.push({
               id,
               title: tag.textContent,
               tag: tag.tagName.toLowerCase(),
             });
           });
     
           setTitles(tempTitles);
         };
     
         parseTitles();
       }, [toolDetails.content]);
     
       const handleScroll = () => {
         const scrollY = window.scrollY;
         setScrollPosition(scrollY);
         setSidebarVisible(scrollY > 100); // Just a little scroll
       };
     
       useEffect(() => {
         window.addEventListener("scroll", handleScroll);
         return () => window.removeEventListener("scroll", handleScroll);
       }, []);
     
       const handleLinkClick = (id) => {
         setTimeout(() => {
           const element = document.querySelector(`#${CSS.escape(id)}`);
           if (element) {
             const topPos = element.getBoundingClientRect().top + window.pageYOffset;
             window.scrollTo({
               top: topPos - 80, // offset for sticky header
               behavior: "smooth",
             });
           } else {
             console.warn("Element not found for ID:", id);
           }
         }, 50); // slight delay to ensure DOM is fully rendered
       };
     
       if (!toolDetails) return <div>Blog not found</div>;
  return (
    <section className="min-h-screen bg-seo-sixth-color p-5">
      <div className="w-full  flex justify-center items-center my-10">
        <h1 className="font-bold mb-4   p-4 text-center text-4xl w-1/2">
          {toolDetails.title}
        </h1>
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-x-2 xl:gap-x-6 container mx-auto justify-center items-start">
        {/* TOC Sidebar */}
        <motion.div
          className={`hidden lg:block lg:sticky top-24 col-span-1 lg:max-w-80 transition-opacity duration-700 order-3 lg:order-1  ${
            sidebarVisible ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarVisible ? 1 : 0 }}
        >
          <div className="mb-8 bg-white border shadow-sm ">
            <h3 className="text-xl font-bold mb-4 bg-seo-sixth-color text-start p-6">
              Table Of Content
            </h3>
            <ul className="p-4">
              {titles.length > 0 ? (
                titles?.map((title) => (
                  <li key={title.id} className="mb-2">
                    <Link
                      href={`#${title.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(title.id);
                      }}
                      className="text-seo-forth-color font-bold hover:underline"
                    >
                      {title.title}
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-center font-medium text-seo-primary my-5">
                  No Titles To show
                </p>
              )}
            </ul>
          </div>
        </motion.div>

        {/* Blog Content */}
        <div className="col-span-3 bg-white border shadow-sm order-1 lg:order-2">
          <figure>
            <img
              src={toolDetails?.coverImage}
              alt="toolDetails cover image"
              className="w-full object-cover h-96 p-2"
            />
            <div className="flex gap-x-3 p-4">
              
              <p className="text-seo-forth-color font-bold">
                Category:{" "}
                <span className="text-seo-des-color-second font-normal">
                  {toolDetails?.category}
                </span>
              </p>
            </div>
          </figure>

          <div className="mb-8 p-4">
            <div
              className="toolDetails-content"
              dangerouslySetInnerHTML={{ __html: renderContent(toolDetails?.content) }}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <motion.div
          className={`order-2 lg:order-3  col-span-1 lg:max-w-96 p-4 bg-white border shadow-sm lg:sticky top-24 transition-opacity duration-700 ${
            sidebarVisible ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarVisible ? 1 : 0 }}
        >
         
          {/* Categories */}
          <div className="mb-8 p-2">
            <h3 className="text-xl font-bold mb-4">Tools Categories</h3>
            <ul>
              {toolCategories?.map((category) => (
                <li key={category._id} className="mb-2">
                  <Link
                    href={`/category/${category._id}`}
                    className="text-seo-forth-color font-bold hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>

            {recentPosts?.map((post) => (
              <div
                key={post._id}
                className="flex justify-center items-center  gap-x- mb-4 xl:p-3"
              >
                <div className=" flex-1/3">
                  <img
                    src={post.coverImage ?? ""}
                    alt="post image"
                    className="rounded-full w-10 h-10 xl:w-16 xl:h-16  object-cover"
                  />
                </div>
                <Link
                  href={`/blogs/${post._id}`}
                  className="text-seo-forth-color font-bold hover:underline flex-2/3"
                >
                  <p className="text-wrap break-words break-after-auto xl:text-lg">
                    {post.title.length > 30
                      ? post.title.slice(0, 35) + "..."
                      : post.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="mb-8 p-2">
            <h3 className="text-xl font-bold mb-4">Blogs Categories</h3>
            <ul>
              {categories?.map((category) => (
                <li key={category._id} className="mb-2">
                  <a
                    href={`/category/${category._id}`}
                    className="text-seo-forth-color font-bold hover:underline"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      {/* Social Icons */}
      <div className="flex justify-center gap-4  max-w-sm p-4 mx-auto ">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FaFacebookF className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer" />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl cursor-pointer" />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} title={title}>
          <FaLinkedinIn className="text-blue-700 hover:text-blue-900 text-2xl cursor-pointer" />
        </LinkedinShareButton>

        <RedditShareButton url={shareUrl} title={title}>
          <FaReddit className="text-red-500 hover:text-red-700 text-2xl cursor-pointer" />
        </RedditShareButton>

        <WhatsappShareButton url={shareUrl} title={title}>
          <FaWhatsapp className="text-green-500 hover:text-green-700 text-2xl cursor-pointer" />
        </WhatsappShareButton>
      </div>
    </section>
  );
};

export default ToolContent;
