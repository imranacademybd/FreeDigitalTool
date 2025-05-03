import { TOOLS_CONFIG } from "@/data/toolConfig";
import { axiosClient } from "./apiClient";


export function getToolsByCategory() {
  // Group tools by category with count
  const categories = TOOLS_CONFIG.reduce((acc, tool) => {
    const category = acc.find((c) => c.slug === tool.category);
    if (category) {
      category.tools.push(tool);
      category.totalTools++;
    } else {
      acc.push({
        slug: tool.category,
        name: `${tool.category.replace(/-/g, " ")} Tools`,
        tools: [tool],
        totalTools: 1,
      });
    }
    return acc;
  }, []);

  // Sort categories by tool count
  return categories.sort((a, b) => b.totalTools - a.totalTools);
}


export async function getToolData(slug) {
    const response = await axiosClient.get(
      `/api/admin/tools/${slug}`
    );
  const tool = response.data; 
  if (!tool) {
    throw new Error(`Tool with slug ${slug} not found`);
  }
  return tool;
}