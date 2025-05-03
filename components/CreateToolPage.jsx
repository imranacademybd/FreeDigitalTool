// components/admin/ToolsForm.jsx
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toolFormSchema } from "@/schemas/toolFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  CheckCircle2,
  Loader,
  Loader2,
  Plus,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  checkSlugServerAction,
  createToolServerAction,
} from "@/lib/actions/updateTool";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from both ends
};

export default function CreateToolsForm({ categories }) {
  const [toolCreating, setToolCreating] = useState(false);

  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isSlugUnique, setIsSlugUnique] = useState(true);
  const [slugMessage, setSlugMessage] = useState("");
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      category: "",
      excerpt: "",
      fields: [
        {
          name: "",
          label: "",
          type: "text", // Default type
          description: "",
          defaultValue: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
    rules: {
      minLength: { value: 1, message: "At least one field is required" },
    },
  });
  const getFieldType = (index) => {
    return form.watch(`fields.${index}.type`) || "text";
  };

  // Watch name and slug fields
  const nameValue = form.watch("name");
  const slugValue = form.watch("slug");

  // Options management functions
  const handleAddOption = (fieldIndex) => {
    const currentFields = form.getValues("fields");
    const currentOptions = currentFields[fieldIndex].options || [];
    form.setValue(`fields.${fieldIndex}.options`, [
      ...currentOptions,
      { value: "", label: "" },
    ]);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const currentFields = form.getValues("fields");
    const currentOptions = currentFields[fieldIndex].options || [];
    currentOptions.splice(optionIndex, 1);
    form.setValue(`fields.${fieldIndex}.options`, currentOptions);
  };

  useEffect(() => {
    if (!isSlugManuallyModified && nameValue) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, form, isSlugManuallyModified]);

  // Check slug uniqueness

  // Trigger slug check when slug changes
  useEffect(() => {
    if (slugValue) {
      setIsCheckingSlug(true);

      const checkSlugUniqueness = async () => {
        if (!slugValue) {
          setIsSlugUnique(true);
          setIsCheckingSlug(false);
          setSlugMessage("");
          return;
        }
        try {
          setIsCheckingSlug(true);
          setSlugMessage("");
          

          const slugUniqueResponse = await checkSlugServerAction(slugValue);

          setIsSlugUnique(slugUniqueResponse?.isUnique);
          setSlugMessage(slugUniqueResponse?.message);

          if (slugUniqueResponse?.isUnique === false) {
            setIsSlugUnique(false);

            form.setError("slug", { message: "Slug must be unique" });
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

  const onSubmit = async (data) => {
    if (isSlugUnique === false) {
      form.setError("slug", { message: "Slug must be unique" });
      return;
    }

    try {
      setToolCreating(true);


      const response = await createToolServerAction(data);


      if (response.status === "SUCCESS") {
        // Redirect to the tool page
        router.push(`/dashboard/tools/all-tools`);
        toast.success(response?.message || "Tool created successfully");
      }
      setToolCreating(false);
    } catch (error) {
      console.error("Submission error:", error);
      setToolCreating(false);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 w-full"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1  gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tool Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tool Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Slug
                  {isCheckingSlug && (
                    <span className="text-sm text-seo-secondary flex justify-center items-center">
                      Checking... <Loader className="animate-spin w-4 h-4" />
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="tool-slug"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsSlugManuallyModified(true);
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {isCheckingSlug && <Loader2 className="animate-spin" />}
                  {!isCheckingSlug && slugMessage && (
                    <span
                      className={`text-sm ${
                        slugMessage === "Slug is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {slugMessage}
                    </span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories ? (
                      categories?.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name} ({category.toolsCount})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value={"no categories to show"} disabled>
                        no categories to show
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tool excerpt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Configurable Fields */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Configuration Fields</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  name: "",
                  label: "",
                  type: "text",
                  description: "",
                  defaultValue: "",
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add Field
            </Button>
          </div>

          {fields.map((field, index) => {
            if (!field) {
              return null;
            }
            return (
              <div key={field.id} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`fields.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Name</FormLabel>
                        <FormControl>
                          <Input placeholder="dailyUsage" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Label</FormLabel>
                        <FormControl>
                          <Input placeholder="Daily Usage" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["text", "number", "boolean", "select"].map(
                              (type) => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Field description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {getFieldType(index) !== "select" && (
                    <FormField
                      control={form.control}
                      name={`fields.${index}.defaultValue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Value (Optional)</FormLabel>
                          <FormControl>
                            {getFieldType(index) === "boolean" ? (
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            ) : getFieldType(index) === "number" ? (
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                value={field.value || ""}
                              />
                            ) : (
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="Optional default value"
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch(`fields.${index}.type`) === "select" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Select Options</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddOption(index)}
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add Option
                        </Button>
                      </div>

                      {(form.watch(`fields.${index}.options`) || []).map(
                        (option, optionIndex) => {
                          const valueError =
                            form.formState.errors.fields?.[index]?.options?.[
                              optionIndex
                            ]?.value;
                          const labelError =
                            form.formState.errors.fields?.[index]?.options?.[
                              optionIndex
                            ]?.label;
                          const hasError = valueError || labelError;
                          return (
                            <div
                              key={optionIndex}
                              className={cn(
                                "flex gap-2 items-start p-2 rounded-lg",
                                hasError && "bg-red-50 border border-red-200"
                              )}
                            >
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Input
                                    placeholder="Option value"
                                    value={option.value}
                                    className={cn(
                                      valueError &&
                                        "border-red-500 focus-visible:ring-red-500"
                                    )}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...form.getValues(
                                          `fields.${index}.options`
                                        ),
                                      ];
                                      newOptions[optionIndex].value =
                                        e.target.value;
                                      form.setValue(
                                        `fields.${index}.options`,
                                        newOptions
                                      );
                                    }}
                                  />
                                  {valueError && (
                                    <p className="text-xs text-red-500">
                                      {valueError.message}
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <Input
                                    placeholder="Option label"
                                    value={option.label}
                                    className={cn(
                                      labelError &&
                                        "border-red-500 focus-visible:ring-red-500"
                                    )}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...form.getValues(
                                          `fields.${index}.options`
                                        ),
                                      ];
                                      newOptions[optionIndex].label =
                                        e.target.value;
                                      form.setValue(
                                        `fields.${index}.options`,
                                        newOptions
                                      );
                                    }}
                                  />
                                  {labelError && (
                                    <p className="text-xs text-red-500">
                                      {labelError.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className={"mt-1"}
                                onClick={() =>
                                  handleRemoveOption(index, optionIndex)
                                }
                              >
                                <Trash className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          );
                        }
                      )}

                      {form.formState.errors.fields?.[index]?.options && (
                        <p className="text-sm font-medium text-destructive mt-2">
                          {form.formState.errors.fields[index].options.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button type="submit" className="w-full">
          {toolCreating ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            "Create Tool"
          )}
        </Button>
      </form>
    </Form>
  );
}
