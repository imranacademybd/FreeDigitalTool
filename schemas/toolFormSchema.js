import { z } from "zod";

export const toolFormSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  category: z.string().min(3),
  excerpt: z.string().min(10),

  fields: z.array(
    z.object({
      name: z.string().min(2),
      label: z.string().min(2),
      type: z.enum(["text", "number", "boolean", "select"]),
      description: z.string().optional(),
      defaultValue: z.any().optional(),
      options: z
        .array(
          z.object({
            value: z.string().min(1, "Option value required"),
            label: z.string().min(1, "Option label required"),
          })
        )
        .optional()
        .superRefine((options, ctx) => {
          const fieldType = ctx?.parent?.type ?? null;
          if (fieldType === "select") {
            if (!options || options.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one option is required for select fields",
              });
            }

            // Check for duplicate values
            const values = options?.map((o) => o.value) || [];
            const uniqueValues = new Set(values);
            if (uniqueValues.size !== values.length) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option values must be unique",
              });
            }
          }
          return true;
        }),
    })
  ),
});
