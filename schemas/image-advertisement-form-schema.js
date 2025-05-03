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
export const imageAdvertisementFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  targetUrl: z.string().optional(),
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
      type: z.string(),
});
