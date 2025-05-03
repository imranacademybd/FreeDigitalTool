"use client";

import { useState } from "react";

export default function YouTubeTagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);

  const handleGenerateClick = () => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword === "") {
      alert("Please enter a keyword!");
      return;
    }

    // Base tags provided.
    const baseTags = [
      
    ];

    // Variations of the keyword.
    const keywordTags = [
      trimmedKeyword,
      `${trimmedKeyword} tutorial`,
      `how to ${trimmedKeyword}`,
      `${trimmedKeyword} tips`,
      `${trimmedKeyword} tricks`,
      `${trimmedKeyword} 2025`,
      `${trimmedKeyword} guide`,
      `best ${trimmedKeyword}`,
      `${trimmedKeyword} review`,
      `top ${trimmedKeyword}`,
      `${trimmedKeyword} strategy`,
    ];

    // Merge and remove duplicate tags.
    const uniqueTags = Array.from(new Set([...baseTags, ...keywordTags]));
    setTags(uniqueTags);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white p-5 rounded shadow-md w-11/12  text-center">
        <h1 className="text-2xl text-gray-800 mb-4">YouTube Tag Generator</h1>
        <input
          type="text"
          id="keywordInput"
          placeholder="Enter your keyword"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          id="generateButton"
          onClick={handleGenerateClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Tags
        </button>
        <div id="tagsContainer" className="mt-4 text-left">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 py-1 px-2 m-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
