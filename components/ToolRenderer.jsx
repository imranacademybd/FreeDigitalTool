// components/ToolRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom renderer to add IDs and classes to headings
import { marked } from "marked";

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
      return `<h${text?.depth} id="${text.id}" class="blog-heading blog-h${text.depth}">${text.text}</h${text.depth}>`;
    },
  },
});
const renderContent = (content) => {
  return marked.parse(content);
};

const ToolRenderer = ({ toolSlug, toolDetails }) => {
  const [titles, setTitles] = useState([]);
  const shareUrl = "https://seostudio.tools/";
  const title = "Check out this awesome SEO tool!";
  const ToolComponent = dynamic(() => import(`@/tools/${toolSlug}`), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
  });

  console.log("Tool Component Loaded:", toolDetails);

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
  }, [toolDetails?.content]);

  try {
    return (
      <div className="min-h-[550px] flex flex-col justify-center items-center w-full  p-4">
        {" "}
        <ToolComponent />{" "}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 p-4 border rounded-lg bg-red-50">
        Error loading tool. Please try again later.
      </div>
    );
  }
};

export default ToolRenderer;
