"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import { blogFormSchema } from "@/schemas/blog-form-schema";
import { updateBlogServerAction } from "@/lib/actions/blogs/updateBlog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
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
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditBlogForm({ initialData, categories }) {
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(
    initialData.coverImage || null
  );
  const [authorPreview, setAuthorPreview] = useState(
    initialData.authorImage || null
  );

  const defaultCategory =
    initialData?.category?._id ?? initialData.category ?? "";

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData.title,
      slug: initialData.slug,
      excerpt: initialData.excerpt,
      content: initialData.content,
      coverImage: initialData.coverImage,
      category: defaultCategory,
      authorName: initialData.authorName,
      authorProfession: initialData.authorProfession || "",
      authorBio: initialData.authorBio,
      authorFacebook: initialData.authorFacebook || "",
      authorLinkedin: initialData.authorLinkedin || "",
      authorYoutube: initialData.authorYoutube || "",
      authorTwitterX: initialData.authorTwitterX || "",
      authorInstagram: initialData.authorInstagram || "",
      authorImage: initialData.authorImage || null,
      metaTitle: initialData.metaTitle || "",
      metaDescription: initialData.metaDescription || "",
      ogTitle: initialData.ogTitle || "",
      ogDescription: initialData.ogDescription || "",
      featured: initialData.featured || false,
      views: initialData.views || 0,
    },
  });

  useEffect(() => {
    const resetCategory =
      initialData?.category?._id ?? initialData.category ?? "";
    form.reset({ ...initialData, category: resetCategory });
    setCoverPreview(initialData.coverImage || null);
    setAuthorPreview(initialData.authorImage || null);
  }, [initialData, form]);

  const uploadImageToImgbb = async (file) => {
    try {
      const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgBBApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(imgBBApiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { key: imgBBApiKey },
      });

      if (!response?.data?.data?.url) {
        toast.error("Image upload failed");
        return null;
      }
      return response.data.data.url;
    } catch (err) {
      toast.error(err.message || "Image upload failed");
      console.log(err);
      
      return null;
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      // Cover image
      if (values.coverImage instanceof File) {
        const url = await uploadImageToImgbb(values.coverImage);
        if (!url) return setLoading(false);
        values.coverImage = url;
      }
      // Author image
      if (values.authorImage instanceof File) {
        const url = await uploadImageToImgbb(values.authorImage);
        if (!url) return setLoading(false);
        values.authorImage = url;
      }

      const res = await updateBlogServerAction(initialData._id, values);
      if (res?.status === "SUCCESS")
        toast.success(res.message || "Blog updated");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Excerpt */}
        <FormField
          name="excerpt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image */}
        <div className="space-y-2">
          <FormLabel>Cover Image</FormLabel>
          <div className="border-dashed border-2 border-gray-500 h-56 flex items-center justify-center">
            {coverPreview && (
              <Image
                src={coverPreview ?? null}
                alt="Blog Image"
                width={2048}
                height={1080}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <FormField
            name="coverImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                      setCoverPreview(
                        file
                          ? URL.createObjectURL(file)
                          : initialData.coverImage
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category */}
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta & OG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="metaTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="ogTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="ogDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Author Info */}
        <h3 className="text-xl font-semibold">Author Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="authorName"
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
            name="authorProfession"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="authorBio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Social Links **/}
          {["Facebook", "Linkedin", "Youtube", "TwitterX", "Instagram"].map(
            (plat) => (
              <FormField
                key={plat}
                name={`author${plat}`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{plat} URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          )}

          {/* Author Image */}
          <div className="space-y-2">
            <FormLabel>Author Image</FormLabel>
            <div className="border-dashed border-2 border-gray-500 h-56 flex items-center justify-center">
              {authorPreview && (
                <Image
                  src={authorPreview ?? null}
                  alt="Blog Image"
                  width={2048}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <FormField
              name="authorImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        setAuthorPreview(
                          file
                            ? URL.createObjectURL(file)
                            : initialData.authorImage
                        );
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Featured & Submit */}
        <FormField
          name="featured"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Update Blog"
          )}
        </Button>
      </form>
    </Form>
  );
}
