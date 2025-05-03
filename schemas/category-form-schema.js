"use client";
import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(100),
  title: z.string().min(3).max(100),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and hyphen-separated"
    ),
  description: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(20000, "Content must be at most 20,000 characters"),
  metaTitle: z.string().min(3).max(100),
  metaDescription: z.string().max(160).optional(),
  parentCategory: z.string().optional(),
});
