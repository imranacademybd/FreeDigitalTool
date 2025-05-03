import { z } from "zod";

export const codeAdvertisementFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  type: z.string(),
});
