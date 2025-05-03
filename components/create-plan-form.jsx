// ✅ The full corrected code goes here — this version replaces all uncontrolled input issues
// Based on your uploaded file, here is the fully corrected version with value ?? fallback for all inputs

"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { planFormSchema } from "@/schemas/planFormSchema";
import { createPlanServerAction } from "@/lib/actions/plans/createPlan";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const CreatePlanForm = ({ tools }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedTools, setSelectedTools] = useState([]);

  const toggleTool = (slug) => {
    setSelectedTools((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const buildDefaultToolValues = (toolSlugs) => {
    return toolSlugs.reduce((acc, slug) => {
      const tool = tools.find((t) => t.slug === slug);
      if (!tool) return acc;
      acc[slug] = tool.fields.reduce((fieldAcc, field) => {
        fieldAcc[field.name] =
          field.defaultValue ?? (field.type === "boolean" ? false : "");
        return fieldAcc;
      }, {});
      return acc;
    }, {});
  };

  const form = useForm({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      description: "",
      yearlyPrice: 0,
      monthlyPrice: 0,
      allow_api: false,
      no_ads: false,
      dailyUsage: 10,
      wordCount: 100,
      fileSize: 10,
      numberOfImage: 10,
      numberOfDomain: 10,
      tools: {},
    },
  });

  useEffect(() => {
    const updated = {
      ...form.getValues(),
      tools: buildDefaultToolValues(selectedTools),
    };
    form.reset(updated);
  }, [selectedTools]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await createPlanServerAction(values);
      if (response?.status === "SUCCESS") {
        toast.success("Plan created successfully!");
        router.push("/dashboard/plans/all-plans");
      } else {
        toast.error(response?.message || "Failed to create plan");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Create New Plan</h2>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="yearlyPrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="monthlyPrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="allow_api"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allow API</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="no_ads"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Ads</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="xl:hidden my-4" />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Limits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                "dailyUsage",
                "wordCount",
                "fileSize",
                "numberOfImage",
                "numberOfDomain",
              ].map((fieldName) => (
                <FormField
                  key={fieldName}
                  name={fieldName}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-10">
          <h2 className="text-2xl font-semibold">
            Tool Access & Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.slug}>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>{tool.name}</CardTitle>
                  <Checkbox
                    checked={selectedTools.includes(tool.slug)}
                    onCheckedChange={() => toggleTool(tool.slug)}
                  />
                </CardHeader>
                {selectedTools.includes(tool.slug) && (
                  <CardContent className="space-y-4">
                    {tool.fields.map((fieldDef) => (
                      <FormField
                        key={`${tool.slug}.${fieldDef.name}`}
                        control={form.control}
                        name={`tools.${tool.slug}.${fieldDef.name}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fieldDef.label}</FormLabel>
                            <FormControl>
                              {fieldDef.type === "number" ? (
                                <Input
                                  type="number"
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              ) : fieldDef.type === "text" ? (
                                <Input {...field} value={field.value ?? ""} />
                              ) : fieldDef.type === "select" ? (
                                <Select
                                  value={field.value ?? ""}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={`Select ${fieldDef.label}`}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {fieldDef.options?.map((opt) => (
                                      <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                      >
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : fieldDef.type === "boolean" ? (
                                <Switch
                                  checked={field.value ?? false}
                                  onCheckedChange={field.onChange}
                                />
                              ) : null}
                            </FormControl>
                            <FormDescription>
                              {fieldDef.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Button type="submit">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Submit Plan"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePlanForm;
