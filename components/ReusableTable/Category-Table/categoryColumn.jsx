"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, Edit, Eye } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "../tableColumnHeader";

export const categoryColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "homepage",
    header: "Homepage",
    cell: ({ row, table }) => {
      const category = row.original;
      const homepage = row.getValue("homepage");



      const handleClick = () => {
        console.log("category", category._id, category.homepage);
        
        if (table?.options?.meta?.handleHomepageToggle) {
          table?.options?.meta.handleHomepageToggle(
            category._id,
            category.homepage
          );
        }
      };

      return (
        <div
          onClick={handleClick}
          className="text-center font-medium cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
        >
          {homepage === true ? (
            <span className="text-sm text-green-600 font-semibold">
              Yes
            </span>
          ) : (
            <span className="text-sm text-red-600 font-semibold">No</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "toolsCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tools"
        className="text-center justify-center items-center"
      />
    ),
    cell: ({ row }) => {
      const count = row.getValue("toolsCount");
      return (
        <div className="text-center font-medium">
          {count}
          <span className="text-sm text-gray-500 ml-1">
            {count === 1 ? "tool" : "tools"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category._id)}
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/tools/tools-categories/${category.slug}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/category/${category.slug}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (table.options.meta?.handleSingleDelete) {
                  table.options.meta.handleSingleDelete(category._id);
                }
              }}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
