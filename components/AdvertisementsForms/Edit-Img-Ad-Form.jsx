"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { imageAdvertisementFormSchema } from "@/schemas/image-advertisement-form-schema";
import { updateAdvertisement } from "@/lib/actions/advertisements/adUpdate";
import { useState } from "react";

const EditImageAdvertisementForm = ({ ad }) => {
  const [loading, setloading] = useState(false);
  const form = useForm({
    resolver: zodResolver(imageAdvertisementFormSchema),
    defaultValues: {
      name: ad.name,
      title: ad.title,
      targetUrl: ad.targetUrl || "",
      image: null,
      type: ad.type,
    },
  });

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
      return response?.data?.data?.url || null;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const onSubmit = async (values) => {
    try {
      setloading(true);
      const imgUrl = await uploadImageToImgbb(values.image);
      if (!imgUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
      const updatedValues = {
        ...values,
        image: imgUrl,
      };
      const response = await updateAdvertisement(ad._id, updatedValues);
      if (response.status === "SUCCESS") {
        toast.success("Advertisement updated successfully");
      }
      setloading(false);
    } catch (error) {
      console.log("Error updating advertisement:", error);
      toast.error(error.message || "Failed to update advertisement");
      setloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertisement Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Display Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="targetUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            "Update Advertisement"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditImageAdvertisementForm;
