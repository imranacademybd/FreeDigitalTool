// components/IconRenderer.jsx
"use client";
import { iconMapping } from "@/lib/iconMapping";
import { cloneElement } from "react";

export const IconRenderer = ({ iconClass, className = "h-6 w-6" }) => {
  const IconComponent = iconMapping[iconClass];

  return IconComponent ? (
    cloneElement(IconComponent, { className })
  ) : (
    <span>No Icon</span>
  );
};
