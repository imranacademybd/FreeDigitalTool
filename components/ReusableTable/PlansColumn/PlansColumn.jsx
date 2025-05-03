"use client";

import { MoreHorizontal, Edit, Trash } from "lucide-react";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
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
import { DataTableColumnHeader } from "../tableColumnHeader";

export const planColumns = [
  // Row selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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

  // Plan name
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan Name" />
    ),
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },

  // Monthly Price
  {
    accessorKey: "monthlyPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("monthlyPrice");
      return <span>${price}</span>;
    },
  },

  // Yearly Price
  {
    accessorKey: "yearlyPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yearly Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("yearlyPrice");
      return <span>${price}</span>;
    },
  },

  // Created At
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formatted = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
      return <span>{formatted}</span>;
    },
  },

  // Action column (Edit/Delete)
  {
    id: "actions",
    header: "Action",
    cell: ({ row, table }) => {
      const plan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-28">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex justify-center gap-2">
              {/* Edit */}
              <DropdownMenuItem asChild>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/dashboard/plans/all-plans/${plan._id}`}>
                        <Edit className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit this plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuItem>

              {/* Delete */}
              <DropdownMenuItem asChild>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          table?.options.meta?.handleSingleDelete?.(plan._id)
                        }
                        className="text-red-600"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete this plan</p>
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
