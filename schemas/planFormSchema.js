// import { TOOLS_CONFIG } from "@/data/toolConfig";
// import { z } from "zod";

import { TOOLS_CONFIG } from "@/data/toolConfig";
import { z } from "zod";

export const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  yearlyPrice: z.coerce.number().min(0),
  monthlyPrice: z.coerce.number().min(0),
  allow_api: z.boolean(),
  no_ads: z.boolean(),
  dailyUsage: z.coerce.number().min(0), 
  wordCount: z.coerce.number().min(0),
  fileSize: z.coerce.number().min(0),
  numberOfImage: z.coerce.number().min(0),
  numberOfDomain: z.coerce.number().min(0),

  // Make tools optional
  tools: z
    .record(
      z.string(),
      z.record(
        z.string(),
        z.union([z.coerce.number(), z.boolean(), z.string()])
      )
    )
    .optional(), 
  });
  // tools: z.record(
  //   z.string(),
  //   z
  //     .record(
  //       z.string(),
  //       z.union([
  //         z.coerce.number().min(0),
  //         z.boolean(),
  //         z.string().min(1),
  //       ])
  //     )
  //     .refine((toolsData) => {
  //       const toolConfigs = TOOLS_CONFIG;
  //       return toolConfigs.every((tool) => {
  //         return tool.fields.every((field) => {
  //           const value = toolsData[tool.slug]?.[field.name];

  //           if (value === undefined) {
  //             return false;
  //           }

  //           if (field.type === "select") {
  //             return field.options?.some((opt) => opt.value === value);
  //           }

  //           // Boolean validation
  //           if (field.type === "boolean") {
  //             return typeof value === "boolean";
  //           }

  //           return true;
  //         });
  //       });
  //     }, "Invalid field values detected")
  // ),











// export const planFormSchema = z.object({
//   name: z.string().min(1, "Name is required"),

//   description: z.string().min(1, "Description is required"),
//   yearlyPrice: z.coerce.number().min(0, "Must be a positive number"),
//   monthlyPrice: z.coerce.number().min(0, "Must be a positive number"),
//   allow_api: z.boolean(),
//   no_ads: z.boolean(),
//     dailyUsege: z.coerce.number().min(0, "Must be 0 or higher"),
//     wordCount: z.coerce.number().min(0, "Must be 0 or higher"),
//     fileSize: z.coerce.number().min(0, "Must be 0 or higher"),
//     numberOfImage: z.coerce.number().min(0, "Must be 0 or higher"),
//     numberOfDomain: z.coerce.number().min(0, "Must be 0 or higher"),
//   tools: z
//     .record(
//       z.string(),
//       z.record(
//         z.string(),
//         z.union([z.coerce.number().min(0), z.boolean(), z.string().min(1)])
//       )
//     )
//     .refine((toolsData) => {
//       const existingToolSlugs = Object.keys(toolsData);
//       return existingToolSlugs.every((slug) => {
//         const toolConfig = TOOLS_CONFIG.find((t) => t.slug === slug);
//         if (!toolConfig) return false;

//         return toolConfig.fields.every((field) => {
//           const value = toolsData[slug][field.name];

//           if (value === undefined) return false;
//           if (field.type === "select") {
//             return field.options?.some((opt) => opt.value === value);
//           }
//           if (field.type === "boolean") {
//             return typeof value === "boolean";
//           }
//           return true;
//         });
//       });
//     }, "Invalid tool configurations"),
// });