import { z } from "zod";

export const createFaqFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  showOnPricing: z.boolean().default(false),
});
