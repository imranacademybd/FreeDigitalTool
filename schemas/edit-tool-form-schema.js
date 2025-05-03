import { z } from "zod";

const isValidImageUrl = (val) =>
  val.startsWith("http") && /\.(jpeg|jpg|png|gif|webp)$/.test(val);

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export const editToolFormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  order: z.number().min(0, "Order must be positive"),
  category: z.string().min(1, "Category is required"),
  iconType: z.enum(["file", "class"]),
  iconClass: z.string().optional(),
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
 
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  image: z
    .union([
      z.instanceof(File).refine(
        (file) => {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        },
        {
          message:
            "Invalid image type. Only .jpg, .jpeg, .png, .webp formats are supported",
        }
      ),
      z.string().url().refine(isValidImageUrl, {
        message: "Invalid image URL",
      }),
    ])
    .nullable()
    .optional(),
    views: z.number().optional(),
});
