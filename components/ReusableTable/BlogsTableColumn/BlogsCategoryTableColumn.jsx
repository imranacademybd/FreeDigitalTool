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

export const blogCategoryColumns = [
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
    accessorKey: "parentCategory",
    header: "Parent Category",
    cell: ({ row }) => {
      const parentCategory = row.getValue("parentCategory");
      return (
        <div className="text-center font-medium">
          {parentCategory ? parentCategory : "No Parent Categories to show"}
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
      const blogCategory = row.original;

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
              onClick={() => navigator.clipboard.writeText(blogCategory._id)}
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/blogs/categories/${blogCategory._id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
           
            <DropdownMenuItem
              onClick={() => {
                if (table.options.meta?.handleSingleDelete) {
                  table.options.meta.handleSingleDelete(blogCategory._id);
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
