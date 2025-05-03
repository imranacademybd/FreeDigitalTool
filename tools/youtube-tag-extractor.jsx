"use client";
import { useState } from "react";

export default function YouTubeTagExtractor() {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const extractTags = async () => {
    if (!url) {
      alert("Please enter a YouTube video URL.");
      return;
    }

    setLoading(true);
    setTags([]);
    setVideoTitle("");
    setError("");

    try {
      const response = await fetch(`/api/tags?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.tags) {
        setTags(data.tags);
        setVideoTitle(data.title);
      } else {
        setError("No tags found.");
      }
    } catch (err) {
      setError("Failed to fetch tags.");
    } finally {
      setLoading(false);
    }
  };

  const copyTags = () => {
    const tagsToCopy = selectedTags.length > 0 ? selectedTags : tags;
    const tagsText = tagsToCopy.join(", ");
    navigator.clipboard.writeText(tagsText).then(() => {
      alert("Tags copied to clipboard");
    });
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">YouTube Tag Extractor</h2>
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        onClick={extractTags}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Extract Tags
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {videoTitle && (
        <h3 className="font-semibold mt-4">Video Title: {videoTitle}</h3>
      )}

      {tags.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Tags Found:</h3>
          <ul className="list-disc list-inside">
            {tags.map((tag, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => toggleTagSelection(tag)}
                  checked={selectedTags.includes(tag)}
                />
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <button
              onClick={copyTags}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Copy {selectedTags.length > 0 ? "Selected Tags" : "All Tags"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
