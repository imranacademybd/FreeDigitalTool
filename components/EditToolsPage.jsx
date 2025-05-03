"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";

import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calculator,
  Ruler,
  Pencil,
  File,
  Bookmark,
  ImageIcon,
  Trash,
  Plus,
  Hash,
  CircleAlert,
  Loader2,
  Loader,
} from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { editToolFormSchema } from "@/schemas/edit-tool-form-schema";
import { updateToolServerAction } from "@/lib/actions/updateTool";
import { useState } from "react";
import { IconRenderer } from "./IconRenderer";

const EditToolForm = ({ tool, categories }) => {
  const [fileImage, setFileImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  

  const form = useForm({
    resolver: zodResolver(editToolFormSchema),
    defaultValues: {
      name: tool?.name,
      slug: tool?.slug,
      excerpt: tool?.excerpt,
      content: tool?.content ? tool?.content : "",
      order: tool?.order ? tool?.order : 0,
      category: tool?.category ? tool?.category : "conversion",
      iconType: tool?.iconType ? tool?.iconType : "class",
      iconClass: tool?.iconClass ? tool?.iconClass : "age-calculator",
      fields: tool?.fields
        ? tool?.fields
        : [
            {
              name: "",
              label: "",
              type: "text", // Default type
              description: "",
              defaultValue: "",
            },
          ],

     
      metaTitle: tool?.metaTitle ? tool?.metaTitle : "",
      metaDescription: tool?.metaDescription ? tool?.metaDescription : "",
      ogTitle: tool?.ogTitle ? tool?.ogTitle : "",
      ogDescription: tool?.ogDescription ? tool?.ogDescription : "",
      views: tool?.views ? tool?.views : 0,
      image: null,
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

  const iconOptions = [
    { name: "age-calculator", component: <Calculator className="h-6 w-6" /> },
    { name: "area-converter", component: <Ruler className="h-6 w-6" /> },
    { name: "articles-rewriter", component: <Pencil className="h-6 w-6" /> },
    { name: "bookmark-manager", component: <Bookmark className="h-6 w-6" /> },
    { name: "md5-generator", component: <Hash className="h-6 w-6" /> },
    { name: "seo-tool", component: <CircleAlert className="h-6 w-6" /> },
  ];

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
      setUpdateLoading(true);

      const formValue = { ...values, _id: tool?._id };

      const imgUrl = await uploadImageToImgbb(formValue.image);

      formValue.image = imgUrl;

      const res = await updateToolServerAction(formValue);
      if (res?.status === "SUCCESS") {
        toast.success(res?.message || "Tool updated successfully");
      }

      setUpdateLoading(false);
    } catch (error) {
      console.log("Update error: ",error);
      
      toast.error(error?.message || "Something went wrong");
      setUpdateLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          Object.values(errors).forEach((error) => {
            if (error.message) toast.error(error.message);
          });
        })}
        className="space-y-8"
      >
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 space-y-8">
          {/* Edit Tool Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Edit Tool</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="tool-slug" {...field} />
                  </FormControl>
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
                    <Textarea
                      placeholder="Short description"
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MDEditor
                      data-color-mode="light"
                      value={field.value}
                      onChange={field.onChange}
                      height={400}
                      preview="edit"
                      className="min-h-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Settings Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
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
                            <SelectItem
                              key={category._id}
                              value={category.name}
                            >
                              {category.name} ({category.toolsCount})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem
                            value={"no categories to show"}
                            disabled
                          >
                            {" "}
                            {"no categories to show"}{" "}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Icon Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Icon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="iconType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="file">File</SelectItem>
                        <SelectItem value="class">CSS Class</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="iconClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter icon class" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2  md:grid-cols-4 gap-4">
              {iconOptions.map((icon) => (
                <div
                  key={icon.name}
                  onClick={() => form.setValue("iconClass", icon.name)}
                  className={`p-4 border rounded-lg cursor-pointer  ${
                    form.watch("iconClass") === icon.name
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <IconRenderer iconClass={icon?.name} />

                  <p className="mt-2 text-sm text-center capitalize">
                    {icon.name.replace("-", " ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Properties Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Properties</h3>
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
                  <div
                    key={field.id}
                    className="border p-4 rounded-lg space-y-4"
                  >
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
                                      {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
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
                              <Input
                                placeholder="Field description"
                                {...field}
                              />
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
                            <h4 className="text-sm font-medium">
                              Select Options
                            </h4>
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
                                form.formState.errors.fields?.[index]
                                  ?.options?.[optionIndex]?.value;
                              const labelError =
                                form.formState.errors.fields?.[index]
                                  ?.options?.[optionIndex]?.label;
                              const hasError = valueError || labelError;
                              return (
                                <div
                                  key={optionIndex}
                                  className={cn(
                                    "flex gap-2 items-start p-2 rounded-lg",
                                    hasError &&
                                      "bg-red-50 border border-red-200"
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
                              {
                                form.formState.errors.fields[index].options
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        

          {/* SEO Settings */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">SEO Settings</h3>
            <FormField
              control={form.control}
              name="metaTitle"
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
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* OG Settings */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">OG Settings</h3>
            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* views field */}
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Views</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
                src={
                  fileImage
                    ? fileImage
                    : tool?.image
                    ? tool.image
                    : "https://i.ibb.co/JFQ02mkQ/futuristic-half-robot-tiger.jpg"
                }
                alt="Tool Image"
                width={2048}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
            <FormField
              control={form.control}
              name="image"
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

          <Button type="submit" className="w-full">
            {updateLoading ? (
              <Loader className="animate-spin h-7 w-7" />
            ) : (
              "Update Tool"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditToolForm;
