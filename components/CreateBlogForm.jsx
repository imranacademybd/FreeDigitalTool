"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import { blogFormSchema } from "@/schemas/blog-form-schema";
import { createBlogServerAction } from "@/lib/actions/blogs/createBlog";

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
import { toast } from "sonner";

import Image from "next/image";
import { generateSlug } from "./tools-categories-form";
import { Loader2 } from "lucide-react";
import { axiosClient } from "@/lib/apiClient";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const CreateBlogForm = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [slugManuallyModified, setSlugManuallyModified] = useState(false);
  const [authorImage, setAuthorImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      views: 0,
      authorName: "",
      authorProfession: "",
      authorBio: "",
      authorFacebook: "",
      authorLinkedin: "",
      authorYoutube: "",
      authorTwitterX: "",
      authorInstagram: "",
      authorImage: "",
      featured: false,
    },
  });

  const titleValue = form.watch("title");

  useEffect(() => {
    if (!slugManuallyModified && titleValue) {
      const generatedSlug = generateSlug(titleValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [titleValue, slugManuallyModified, form]);

  // Update uploadImageToImgbb function in CreateBlogForm.jsx using axiosClient
  const uploadImageToImgbb = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosClient.post(
        "/api/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.url) {
        return response.data.url;
      } else {
        toast.error("Image upload failed");

        return null;
      }
    } catch (error) {
      toast.error(error?.message || "Image upload failed");
      console.log(error);

      return null;
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
  

      const imgUrl = await uploadImageToImgbb(values?.coverImage);
      values.coverImage = imgUrl;
      if (authorImage) {
        const authorImgUrl = await uploadImageToImgbb(authorImage);
        values.authorImage = authorImgUrl; // Add the author's image URL
      }

  

      const result = await createBlogServerAction(values);

      if (result?.status === "SUCCESS") {
        toast.success("Blog created successfully");
        form.reset();
      }

      setLoading(false);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.message, "Error creating blog. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    value={field.value ?? ""}
                  />
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
                      setSlugManuallyModified(true);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        {/* Image Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Image</h3>
          <div className="border-dashed border-2 border-gray-500 h-56 flex items-center justify-center">
            <Image
              src={fileImage ?? null}
              alt="Blog Image"
              width={2048}
              height={1080}
              className="w-full h-full object-cover"
            />
          </div>
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                      setFileImage(URL.createObjectURL(file));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        categories ? "Select a category" : "No categories"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name ? cat.name : "No category"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="metaTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
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
                  <Input {...field} value={field.value ?? ""} />
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

        <FormField
          name="views"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Views</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  readOnly
                  className={"max-w-sm"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Author Information */}
        <h3 className="text-xl font-semibold">Author Information</h3>
        <div className=" grid grid-cols-1 xl:grid-cols-2 gap-6  ">
          <FormField
            name="authorName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author's Name</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                  />
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
                <FormLabel>Author's Profession</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authorBio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author's Bio</FormLabel>
                <FormControl>
                  <Textarea
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Media Links */}

          <FormField
            name="authorFacebook"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author's Facebook Page Or Profile Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    type={"url"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authorLinkedin"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auhor's Linkedin Profile Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    type={"url"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authorYoutube"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auhor's Youtube Channel Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    type={"url"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authorTwitterX"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auhor's Twitter Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    type={"url"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authorInstagram"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auhor's Instagram Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    type={"url"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Image */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Image</h3>
            <div className="border-dashed border-2 border-gray-500 h-56 flex items-center justify-center">
              <Image
                src={authorImage ?? null}
                alt="Author's Image"
                width={2048}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
            <FormField
              control={form.control}
              name="authorImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        setAuthorImage(URL.createObjectURL(file));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
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

        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create Blog"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateBlogForm;
