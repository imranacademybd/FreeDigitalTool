"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planFormSchema } from "@/schemas/planFormSchema";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
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
import { updatePlanServerAction } from "@/lib/actions/plans/updatePlan";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function normalizePlanWithTools(plan, toolsConfig) {
  const normalizedTools = toolsConfig.reduce((acc, tool) => {
    const existingToolData = plan.tools?.[tool.slug] || {};
    acc[tool.slug] = tool.fields.reduce((fieldAcc, field) => {
      const value =
        typeof existingToolData[field.name] !== "undefined"
          ? existingToolData[field.name]
          : field.defaultValue;
      fieldAcc[field.name] = value;
      return fieldAcc;
    }, {});
    return acc;
  }, {});

  return { ...plan, tools: normalizedTools };
}

const EditPlanForm = ({ plan, tools }) => {
  const router = useRouter();

  const [selectedTools, setSelectedTools] = useState(
    Object.keys(plan.tools || {})
  );

  const toggleTool = (slug) => {
    setSelectedTools((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const normalized = normalizePlanWithTools(plan, tools);

  const form = useForm({
    resolver: zodResolver(planFormSchema),
    defaultValues: normalized,
  });

  useEffect(() => {
    form.reset(normalizePlanWithTools(plan, tools));
  }, [plan, tools]);

  const onSubmit = async (values) => {
     const fullValues = form.getValues();
     console.log("fullValues", fullValues);
     
    const updated = {
      ...values,
      tools: selectedTools.reduce((acc, slug) => {
        acc[slug] = fullValues?.tools?.[slug] || {};
        return acc;
      }, {}),
    };

    const res = await updatePlanServerAction(plan._id, updated);

    if (res?.status === "SUCCESS") {
      toast.success("Plan updated successfully");
      router.push("/dashboard/plans/all-plans");
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Edit Plan</h2>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Plan Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="yearlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="allow_api"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allow API</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_ads"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Ads</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="xl:hidden block my-4" />

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
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TOOLS */}
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
                    {tool.fields.map((field) => (
                      <FormField
                        key={`${tool.slug}.${field.name}`}
                        control={form.control}
                        name={`tools.${tool.slug}.${field.name}`}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                              {field.type === "number" ? (
                                <Input
                                  type="number"
                                  {...formField}
                                  onChange={(e) =>
                                    formField.onChange(Number(e.target.value))
                                  }
                                />
                              ) : field.type === "text" ? (
                                <Input {...formField} />
                              ) : field.type === "select" ? (
                                <Select
                                  defaultValue={formField.value}
                                  onValueChange={formField.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={`Select ${field.label}`}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                field.type === "boolean" && (
                                  <Switch
                                    checked={formField.value}
                                    onCheckedChange={formField.onChange}
                                  />
                                )
                              )}
                            </FormControl>
                            <FormDescription>
                              {field.description}
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

        <Button type="submit">Update Plan</Button>
      </form>
    </Form>
  );
};

export default EditPlanForm;
