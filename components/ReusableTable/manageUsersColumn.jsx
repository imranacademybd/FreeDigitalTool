"use client";
import {
  Edit,
  Edit2,
  Edit3,
  Edit3Icon,
  Ghost,
  MoreHorizontal,
  Trash,
  View,
  ViewIcon,
  ArrowUpDown,
  DeleteIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./tableColumnHeader";

const dropdownItems = [
  {
    managePagesDropdownItems: [
      {
        icon: <Edit className="h-5 w-5" />,
        label: "Edit",
        details: "Edit this item",
      },
      {
        icon: <ViewIcon className="h-5 w-5" />,
        label: "View",
        details: "View this item",
      },
      {
        icon: <DeleteIcon className="text-red-900" />,
        label: "Delete",
        details: "Delete this item",
      },
    ],
  },
];

const managePagesDropdownItems = dropdownItems[0].managePagesDropdownItems;

export const manageUsersColumns = [
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
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        className={"justify-end font-bold"}
        column={column}
        title="Amount"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(amount);

      return <div className="text-right font-medium"> {formattedAmount} </div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex flex-col items-center"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy Pages ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Make Admin</DropdownMenuItem>
            <DropdownMenuItem>Make User</DropdownMenuItem>
            <DropdownMenuItem>Make Host/Moderator</DropdownMenuItem>

            <DropdownMenuSeparator />
            <div className="flex gap-2 justify-center items-center">
              {managePagesDropdownItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{item.icon}</TooltipTrigger>
                      <TooltipContent>
                        <p> {item.details} </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
