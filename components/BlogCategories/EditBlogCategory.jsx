"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogCategoryFormSchema } from "@/schemas/blog-category-form-schema";
import { updateBlogCategoryAction } from "@/lib/actions/blogs/blog-categories/updateBlogCategory";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateSlug } from "../tools-categories-form";
import { Loader2 } from "lucide-react";

const EditBlogCategoryForm = ({ initialData, parentCategories }) => {
  const [loading, setLoading] = useState(false);
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(blogCategoryFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      parentCategory: initialData?.parentCategory?._id || "",
    },
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (!isSlugManuallyModified && nameValue) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, isSlugManuallyModified, form]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await updateBlogCategoryAction(initialData._id, values);
      if (res?.status === "SUCCESS") {
        toast.success(res?.message ?? "Category updated!");
        router.refresh(); // optional: reloads data on current route
      } else {
        toast.error(res?.message ?? "Update failed!");
      }
    } catch (error) {
      console.log("Blog category update error: ", error);

      toast.error(error.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setIsSlugManuallyModified(true);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Title */}
        <FormField
          name="metaTitle"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Description */}
        <FormField
          name="metaDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Category */}
        <FormField
          name="parentCategory"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parentCategories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"  /> : "Update Category"}
        </Button>
      </form>
    </Form>
  );
};

export default EditBlogCategoryForm;
