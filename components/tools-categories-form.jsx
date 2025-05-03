"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { categoryFormSchema } from "@/schemas/category-form-schema";
import { toolsCategoryFormSchema } from "@/schemas/tools-category-form-schema";
import { Loader2 } from "lucide-react";
import {
  checkCategorySlug,
  createCategory,
} from "@/lib/actions/categoryAction";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

export const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from both ends
};

const ToolsCategoryForm = () => {
  const [slugMessage, setSlugMessage] = useState("");
  const [isSlugUnique, setIsSlugUnique] = useState(true);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const form = useForm({
    resolver: zodResolver(toolsCategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      parentCategory: "",
      homepage: false,
    },
  });

  // Watch name and slug fields
  const nameValue = form.watch("name");
  const slugValue = form.watch("slug");

  useEffect(() => {
    if (!isSlugManuallyModified && nameValue) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, form, isSlugManuallyModified]);

  useEffect(() => {
    if (slugValue) {
      setIsCheckingSlug(true);

      const checkSlugUniqueness = async () => {
        if (!slugValue) {
          setIsSlugUnique(true);
          setIsCheckingSlug(false);
          setSlugMessage("");
          form.setError("slug", { message: "" });
          return;
        }
        try {
          setIsCheckingSlug(true);
          setSlugMessage("");

          const slugUniqueResponse = await checkCategorySlug(slugValue);

          setIsSlugUnique(slugUniqueResponse?.isUnique);
          setSlugMessage(slugUniqueResponse?.message);

          if (slugUniqueResponse?.isUnique === false) {
            setIsSlugUnique(false);

            form.setError("slug", { message: "Slug must be unique" });
          }
          if (slugUniqueResponse?.isUnique === true) {
            setIsSlugUnique(true);
            form.clearErrors("slug");
          }

          setIsCheckingSlug(false);
        } catch (error) {
          console.error("Slug check error:", error);
          setIsCheckingSlug(false);
          setSlugMessage(error?.message);
          setIsSlugUnique(false);
        }
      };
      checkSlugUniqueness();
    }
  }, [slugValue]);

  async function onSubmit(values) {
    try {
      const res = await createCategory(values);
      if (res?.status === "SUCCESS") {
        toast.success(res?.message);
 
      }
    } catch (error) {
      console.error("Category form submission error:", error);
      toast.error(error?.message || "Failed to create category");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Slug
                {isCheckingSlug && (
                  <span className="text-sm text-seo-secondary flex justify-center items-center">
                    Checking... <Loader2 className="animate-spin w-4 h-4" />
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="category-slug"
                  onChange={(e) => {
                    field.onChange(e);
                    setIsSlugManuallyModified(true);
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The "slug" is the URL-friendly version of the name. It is
                usually all lowercase and contains only letters, numbers, and
                hyphens.
                {isCheckingSlug && <Loader2 className="animate-spin" />}
                {!isCheckingSlug && slugMessage && (
                  <span
                    className={`text-sm ${
                      slugMessage === "Slug is available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {slugMessage}
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Category title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <MDEditor
                  data-color-mode="light"
                  value={field.value}
                  onChange={field.onChange}
                  height={300}
                  preview="edit"
                  className="min-h-[300px]"
                />
              </FormControl>
              <FormDescription>
                The description is used on front page and, as meta description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* meta title */}
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meta title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* meta description */}
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter meta description"
                  {...field}
                  className="h-32"
                />
              </FormControl>
              <FormDescription>
                The description is used on front page and, as meta description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Homepage Section */}
        <div className="space-y-6 border-b pb-6">
          <h3 className="text-xl font-semibold">Homepage</h3>
          <FormField
            control={form.control}
            name="homepage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Mark as Homepage</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default ToolsCategoryForm;
