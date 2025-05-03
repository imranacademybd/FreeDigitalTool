import { z } from "zod";

export const blogCategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  parentCategory: z.string().optional(), // can be null or an ObjectId string
});
