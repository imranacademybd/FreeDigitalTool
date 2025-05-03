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
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { createFaqFormSchema } from "@/schemas/create-faq-form-schema";

const CreateFaqForm = () => {
  const form = useForm({
    resolver: zodResolver(createFaqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      showOnPricing: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
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

        <FormField
          control={form.control}
          name="showOnPricing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show this FAQ on Pricing page.</FormLabel>
                <FormDescription>
                  This will show this FAQ on the pricing page. If you don&apos;t
                  want to show this on the pricing page, leave this unchecked.
                  If you want to show this on the pricing page later, You can do
                  this from{" "}
                  <Link href={"/dashboard/plans/faqs"}>
                    <span className="underline text-blue-600 hover:no-underline hover:text-blue-300 ">
                      {" "}
                      Manage Faqs Page
                    </span>
                  </Link>
                  .
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateFaqForm;
