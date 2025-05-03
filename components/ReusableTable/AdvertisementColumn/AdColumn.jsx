"use client";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Trash,
  Edit3,
  Eye,
  EyeIcon,
  DeleteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { DataTableColumnHeader } from "../tableColumnHeader";

export const adColumns = [
  // 1. Selection checkbox column for row selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    ),
  },

  // 2. Advertisement Name column
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },

  // 3. Advertisement Title column
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
  },

  // 4. Advertisement Type column (used for filtering via dropdown)
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("type")}</span>
    ),
  },



  // 6. CreatedAt date column (formatted date string)
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.original.createdAt;
      // Format the date to a readable format (e.g., Jan 5, 2025)
      const formatted = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
      return <span>{formatted}</span>;
    },
  },

  // 7. Action column with Edit/Delete dropdown
  {
    id: "actions",
    accessorKey: "action",
    header: "Action",
    cell: ({ row, table }) => {
      const ad = row.original;
      // Handler to delete a single advertisement (calls the meta actions provided by DataTable)
     

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-28">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex justify-center gap-2">
              {/* Edit action */}
              <DropdownMenuItem asChild>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/dashboard/advertisements/${ad._id}`}>
                        <Edit className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit this advertisement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuItem>
              {/* Delete action */}
              <DropdownMenuItem asChild>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        // onClick={() => handleDelete(ad._id)} 
                        onClick={() => {
                          if (table?.options.meta?.handleSingleDelete) {
                            table.options.meta.handleSingleDelete(ad._id);
                          }
                        }}
                        className="text-red-600"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete this advertisement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
