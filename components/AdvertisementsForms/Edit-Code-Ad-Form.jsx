"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { codeAdvertisementFormSchema } from "@/schemas/code-advertisement-form-schema";
import { updateAdvertisement } from "@/lib/actions/advertisements/adUpdate";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const EditCodeAdvertisementForm = ({ ad }) => {
  const [loading, setloading] = useState(false);
  const form = useForm({
    resolver: zodResolver(codeAdvertisementFormSchema),
    defaultValues: {
      name: ad.name,
      title: ad.title,
      content: ad.content || "",
      type: ad.type,
    },
  });

  const onSubmit = async (values) => {
    try {
      setloading(true);
      const result = await updateAdvertisement(ad._id, values);
      if (result.status === "SUCCESS") {
        toast.success(
          result.message || "Code Advertisement updated successfully!"
        );
      }
      setloading(false);
    } catch (error) {
      console.log("Code Advertisement update error:", error);

      toast.error(error?.message || "Error updating code advertisement");
      setloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
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
                  height={300}
                  preview="edit"
                />
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
          {loading ?<Loader2 className="mr-2 h-4 w-4 animate-spin" />: "Update Code Advertisement"}
        </Button>
      </form>
    </Form>
  );
};

export default EditCodeAdvertisementForm;
