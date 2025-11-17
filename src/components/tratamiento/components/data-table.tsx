import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Printer, UserRoundPlus } from "lucide-react";
import { DataTablePagination } from "@/src/components/paciente/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  loading?: boolean;

  page: number;
  totalPages: number;
  // pageSize: number;
  setPage: (page: number) => void;
  // setPageSize: (size: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No hay datos disponibles.",
  loading = false,
  page,
  totalPages,
  // pageSize,
  setPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: 0,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div>
      <div className=" py-4">
        {/* <Input
          placeholder="Filtrar por apellido..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <div className="flex justify-between ">
          <div>
            {/* <Button className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"> */}
            {/* <Button className="">
              <Printer />
              Imprimir Lista
            </Button> */}
          </div>
          <div>
            <Link
              href="/dashboard/tratamiento/registro/nuevo"
              className="cursor-pointer"
            >
              <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
                {/* <UserRoundPlus /> */}
                <Plus />
                Nuevo Tratamiento
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#337ab7]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-[#337ab7]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              // Mostrar 5 filas de skeleton mientras carga
              [...Array(5)].map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton
                        className={`h-4 ${
                          j % 3 === 0
                            ? "w-1/2"
                            : j % 3 === 1
                            ? "w-3/4"
                            : "w-full"
                        } bg-gray-300 animate-pulse`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
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
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="h-4" />
      <DataTablePagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
