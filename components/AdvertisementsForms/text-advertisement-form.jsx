"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import { textAdvertisementFormSchema } from "@/schemas/text-advertisement-schema";
import { useState } from "react";
import axios from "axios";
import { createAdvertisement } from "@/lib/actions/advertisements/adCreate";
import { Loader, Loader2 } from "lucide-react";

const TextAdvertisementForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(textAdvertisementFormSchema),
    defaultValues: {
      name: "",
      title: "",
      targetUrl: "",
      content: "",
      image: null,
      type: "text",
    },
  });

  const uploadImageToImgbb = async (file) => {
    try {
      const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // use NEXT_PUBLIC_ so it's exposed to client
      const imgBBApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(imgBBApiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          key: imgBBApiKey,
        },
      });

      if (!response?.data?.data?.url) {
        throw new Error("Image upload failed");
      }

      return response?.data?.data?.url || null;
    } catch (error) {
      toast.error(error?.message || "Image upload failed");
    }
  };

 async function onSubmit(values) {
  
    try {
      setLoading(true);
      const imgUrl = await uploadImageToImgbb(values.image);
   
      

      values.image = imgUrl;
      const textAd = { ...values, type: "text" };

      

      const result = await createAdvertisement({
        ...textAd,
      });
      console.log(result);
      
      if (result.status === "SUCCESS") {
        
        toast.success( result?.message || "Text Advertisement created successfully!");
      }
      else if (result.status === "ERROR") {
        toast.error( result?.error || "Error creating text advertisement");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error creating text advertisement:", error);
      
      toast.error( error || "Error creating text advertisement");
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto my-10  flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold text-center mb-10">
        {" "}
        Text Advertisement
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            // Handle validation errors
            Object.values(errors).forEach((error) => {
              if (error.message) {
                toast.error(error.message);
              }
            });
          })}
          className="space-y-6 w-full"
        >
          {/* name field and title field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advertisement Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Campaign name"
                      {...field}
                      className="text-lg font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Advertisement title"
                      {...field}
                      className="text-lg font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advertisement Image (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Optional)</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Target URL */}
          <FormField
            control={form.control}
            name="targetUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type"
                    {...field}
                    className="text-lg font-medium"
                    value="text"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Advertisement"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TextAdvertisementForm;
