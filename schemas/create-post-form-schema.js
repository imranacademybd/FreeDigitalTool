import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .refine((val) => {
      // Strip Markdown formatting but keep image alt texts
      const plainText = val
        .replace(/#{1,6}\s?/g, "") // Remove headers
        .replace(/\*{1,2}(.*?)\*{1,2}/g, "$1") // Remove bold/italic
        .replace(/!?\[(.*?)\]\(.*?\)/g, "$1") // Keep alt text for images, remove links
        .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // Remove code markers
        .replace(/-{3,}/g, "") // Remove HRs
        .trim();

      return plainText.length >= 20 && plainText.length <= 10000;
    }, "Content must have 20-10,000 characters of actual text (excluding Markdown formatting). Note: Image alt text counts toward this limit."),

  excerpt: z.string().min(1, "Excerpt is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  // categories: z.array(z.string()).min(1, "Select at least one category"),
  category: z.string().min(1, "Select at least one category"),
  // tags: z.array(z.string()).optional(),
  tags: z.string()
  .optional()
  .transform(val => {
    if (!val) return [];
    const tags = val.split(',').map(tag => tag.trim()).filter(Boolean);
    return Array.from(new Set(tags)); // Remove duplicates
  })
  .pipe(
    z.array(z.string())
      .refine(tags => new Set(tags).size === tags.length, {
        message: "Duplicate tags are not allowed"
      })
      .optional()
  ),
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"), // Check if it's a File object and starts with "image/"
      { message: "You must upload a valid image file." }
    )
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ), // Check specific image types
      { message: "Only JPEG, JPG, PNG, or WebP images are allowed." }
    ),
});
