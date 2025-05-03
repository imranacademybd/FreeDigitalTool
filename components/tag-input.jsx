// TagsInput Component (create a new file)
"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

export const TagsInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(value || []);
//   const [containerHeight, setContainerHeight] = useState("auto");

  useEffect(() => {
    onChange(tags);
    const rowCount = Math.ceil((tags.length * 90) / 300); // Approximate rows
    // setContainerHeight(`${Math.max(3, rowCount + 1)}rem`);
  }, [tags]);

  const addTag = (e) => {
    e.preventDefault();
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 ">
      <div className="border rounded-md p-2 min-h-[44px] bg-background transition-all">
        <div
          className="flex flex-wrap gap-2 "
        //   style={{ height: containerHeight }}
        >
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-black text-white px-3 py-1 rounded-full text-sm shadow-sm hover:bg-black/90 transition-colors"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 hover:text-gray-300 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/,/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "," || e.key === "Enter") {
                addTag(e);
              }
              if (e.key === "Backspace" && inputValue === "") {
                setTags(tags.slice(0, -1));
              }
            }}
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm px-2 py-1"
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Separate tags with commas</p>
    </div>
  );
};
