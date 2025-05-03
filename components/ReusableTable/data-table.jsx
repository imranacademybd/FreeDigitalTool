"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { DataTablePagination } from "./tablePagination";
import { DataTableViewOptions } from "./toggleColumnVisibility";
import axios from "axios";
import {
  deleteMultipleToolsServerAction,
  deleteToolServerAction,
} from "@/lib/actions/updateTool";
import { toast } from "sonner";
import { deleteMultipleCategories } from "@/lib/actions/categoryAction";
import { RefreshCcwDot } from "lucide-react";
import { deleteMultipleAdvertisements } from "@/lib/actions/advertisements/adMultipleDelete";
import { deleteMultiplePlansServerAction } from "@/lib/actions/plans/deleteMultiplePlans";
import { deleteManyBlogCategoriesAction } from "@/lib/actions/blogs/blog-categories/deleteManyBlogCategories";
import { deleteManyBlogsAction } from "@/lib/actions/blogs/deleteManyBlogs";
import { deleteMultipleContacts } from "@/lib/actions/ContactUs/contactAction";

export function DataTable({
  columns,
  initialData,
  filterInputPlaceholder,
  filterInputColumn,
  firstSearchInputPlaceholder,
  secondSearchInputPlaceholder,
  thirdSearchInputPlaceholder,
  fourthSearchInputPlaceholder,
  fetchUrl,

  // New props for dynamic filtering
  filterSelectColumn, // Column ID to filter
  filterSelectLabel = "Filter by", // Label for select
  filterSelectPlaceholder = "All items", // Default placeholder
  refreshDataInComponent,
  meta,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    try {
      setLoading(true);
      const refData = await refreshDataInComponent();
      setData(refData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  const enhancedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        meta: {
          ...col.meta,
          handleSingleDelete: async (id) => {
            const prevData = [...data];
            try {
              // Optimistic update
              setData((prev) => prev.filter((item) => item._id !== id));
              const result = await deleteToolServerAction(id);
              if (result.status !== "SUCCESS") throw new Error(result.error);
              toast.success(result.message);
            } catch (error) {
              setData(prevData);
              toast.error(error.message);
            }
          },
          refreshData,
        },
      })),
    [columns, data, refreshData]
  );

  const filterFns = {
    dateBetween: (row, columnId, value) => {
      const date = new Date(row.getValue(columnId));
      const [start, end] = value.split(",");
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      if (startDate && endDate) return date >= startDate && date <= endDate;
      if (startDate) return date >= startDate;
      if (endDate) return date <= endDate;
      return true;
    },
    inNumberRange: (row, columnId, value) => {
      const number = row.getValue(columnId);
      const [min, max] = value.split("-");
      return (!min || number >= +min) && (!max || number <= +max);
    },
  };

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta,

  });

  const selectedRows = table?.getSelectedRowModel()?.rows.map((row) => {
    return row.original;
  });

  // Dynamic select filter component
  const SelectFilter = () => {
    if (!filterSelectColumn) return null;
    const column = table.getColumn(filterSelectColumn);
    if (!column) return null;

    return (
      <Select
        value={column.getFilterValue() || "all"}
        onValueChange={(value) => {
          column?.setFilterValue(value === "all" ? undefined : value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={filterSelectPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{filterSelectPlaceholder}</SelectItem>
          {Array.from(
            new Set(initialData.map((item) => item[filterSelectColumn]))
          )
            .filter((value) => value?.trim())
            .map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    );
  };

  // const handleDeleteRows = async () => {
  //   try {
  //     const selectedIds = table
  //       .getSelectedRowModel()
  //       .rows.map((row) => row.original._id);

  //     if (!selectedIds.length) {
  //       toast.error("No tools selected");
  //       return;
  //     }

  //     const result = await deleteMultipleToolsServerAction(selectedIds);

  //     if (result.status === "SUCCESS") {
  //       toast.success(result.message);
  //       await refreshData();
  //       table.resetRowSelection();
  //     }
  //   } catch (error) {
  //     toast.error("Failed to delete tools");
  //   }
  // };

  // Modify handleDeleteRows function
  const handleDeleteRows = async () => {
    try {
      const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => row.original._id);
        console.log("selectedIds", selectedIds);

        const metaEntity = table.options?.meta
        console.log("metaEntity", metaEntity?.entityType);
                
        

      if (!selectedIds.length) {
        toast.error("No items selected");
        return;
      }

      // Check if we're handling categories
      if (table.options.meta?.entityType === "category") {
        const result = await deleteMultipleCategories(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success("Categories deleted successfully");
          await refreshData();
          table.resetRowSelection();
          
        }
       } else if (table.options.meta?.entityType === "advertisement") {
        // Handle advertisement deletion
        const result = await deleteMultipleAdvertisements(selectedIds);
        if (result?.status === "SUCCESS") {
          toast.success(result?.message);
          await refreshData();
          table.resetRowSelection();
        }
      } else if (table.options.meta?.entityType === "plans") {
        const result = await deleteMultiplePlansServerAction(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success(result.message);
          await refreshData();
          table.resetRowSelection();
        }
      } else if (table.options.meta?.entityType === "blogCategory") {
        const result = await deleteManyBlogCategoriesAction(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success(result.message);
          await refreshData();
          table.resetRowSelection();
        }
      }
      else if (table.options.meta?.entityType === "blogs") {
        const result = await deleteManyBlogsAction(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success(result.message);
          await refreshData();
          table.resetRowSelection();
        }
      }
      else if (table.options.meta?.entityType === "contacts") {
        const result = await deleteMultipleContacts(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success(result.message);
          await refreshData();
          table.resetRowSelection();
        }
      } else {
        // Default to tools deletion
        const result = await deleteMultipleToolsServerAction(selectedIds);
        if (result.status === "SUCCESS") {
          toast.success(result.message);
          await refreshData();
          table.resetRowSelection();
        }
      }
    } catch (error) {
      toast.error(error.message || "Deletion failed");
    }
  };

  return (
    <div>
      {/* <div className="flex items-center py-4">
        <Input
          placeholder={`filter by ${
            firstSearchInputPlaceholder ? firstSearchInputPlaceholder : ""
          } ${
            secondSearchInputPlaceholder ? secondSearchInputPlaceholder : ""
          } ${thirdSearchInputPlaceholder ? thirdSearchInputPlaceholder : ""} ${
            fourthSearchInputPlaceholder ? fourthSearchInputPlaceholder : ""
          } `}
          value={table.getState().globalFilter || ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

       
        <DataTableViewOptions table={table} />
        {selectedRows.length > 0 && (
          <Button
            variant={"destructive"}
            className={"ml-2"}
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
        )}
      </div> */}
      <div className="flex items-center py-4 gap-2 flex-wrap">
        {/* Existing name filter */}
        <Input
          placeholder={`filter by ${
            firstSearchInputPlaceholder ? firstSearchInputPlaceholder : ""
          } ${
            secondSearchInputPlaceholder ? secondSearchInputPlaceholder : ""
          } ${thirdSearchInputPlaceholder ? thirdSearchInputPlaceholder : ""} ${
            fourthSearchInputPlaceholder ? fourthSearchInputPlaceholder : ""
          } `}
          value={table.getState().globalFilter || ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        {/* refresh */}
        <Button
          variant="outline"
          onClick={refreshData}
          disabled={loading}
          className="ml-2"
        >
          Refresh <RefreshCcwDot className="w-4 h-4" />
        </Button>

        {/* Category filter */}

        <div className="flex items-center py-4 gap-2 flex-wrap">
        

          {/* Dynamic select filter */}
          {filterSelectColumn && <SelectFilter />}

          {/* Rest of your existing code (view options, delete button) */}
        </div>

        <DataTableViewOptions table={table} />
        {selectedRows.length > 0 && (
          <Button
            variant={"destructive"}
            className={"ml-2"}
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={enhancedColumns.length} // Use enhancedColumns instead of columns
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      </div>
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      {/* <DataTablePagination/> */}

      <DataTablePagination table={table} />
    </div>
  );
}
