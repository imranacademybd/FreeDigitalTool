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
import Link from "next/link";
import { iconMapping } from "@/lib/iconMapping";
import { deleteToolServerAction } from "@/lib/actions/updateTool";
import { toast } from "sonner";







export const columns = [
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
    accessorKey: "iconClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ row }) => {
      const iconClass = row.original.iconClass;
      return (
        <div className="flex items-center">
          {iconMapping[iconClass] || <span>No Icon</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },

  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader
        className={"justify-center font-bold"}
        column={column}
        title="Views"
      />
    ),
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("amount"));
    //   const formattedAmount = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "BDT",
    //   }).format(amount);

    //   return <div className="text-right font-medium"> {formattedAmount} </div>;
    // },
    cell: ({ row }) => {
      const views = row?.getValue("views");
      return <div className="text-center font-bold"> {views}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row?.original?.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      return <div> {date} </div>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({ row, column }) => {
      const data = row.original;
      const handleDelete = async (id, column) => {
  try {
    console.log("Delete ID:", id);
      const { handleSingleDelete, refreshData } = column.columnDef.meta || {};
     if (handleSingleDelete) {
       await handleSingleDelete(id);
       if (refreshData) refreshData();
     } else {
       console.error("Delete handler not found");
     }
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

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
              onClick={() => navigator.clipboard.writeText(data._id)}
            >
              Copy Pages ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex gap-2 justify-center items-center">
              <DropdownMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/tools/${data?.slug}`}
                      >
                        {" "}
                        <Edit className="h-5 w-5" />
                      </Link>{" "}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> Edit this item </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Link href={`http://localhost:3000`}>
                        {" "}
                        <ViewIcon className="h-5 w-5" />
                      </Link>{" "}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> View this item </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p onClick={()=> handleDelete(data._id, column)} >
                        {" "}
                        <DeleteIcon className="text-red-900" />{" "}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> Delete this item </p>
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
