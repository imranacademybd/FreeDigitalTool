"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogCategoryFormSchema } from "@/schemas/blog-category-form-schema";
import { createBlogCategoryAction } from "@/lib/actions/blogs/blog-categories/createBlogCategory";

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

const CreateBlogCategoryForm = ({ parentCategories }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);

  const form = useForm({
    resolver: zodResolver(blogCategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      parentCategory: "",
    },
  });

  // Watch name and slug fields
  const nameValue = form.watch("name");

  useEffect(() => {
    if (!isSlugManuallyModified && nameValue) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, form, isSlugManuallyModified]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await createBlogCategoryAction(values);

      if (res?.status === "SUCCESS") {
        toast.success(res?.message ?? "Category created!");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message ?? "Error creating category!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => {
                    field.onChange(e);
                    setIsSlugManuallyModified(true);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          name="metaDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateBlogCategoryForm;
