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
      {/* <div className="flex items-center py-4"> */}
      {/* <Input
          placeholder="Filtrar paciente..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
      {/* <div className="ml-auto flex gap-4">
          <Link
            href="/dashboard/registro/paciente/registrarpaciente"
            className="cursor-pointer"
          >
            <Button className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer">
              <UserRoundPlus />
              Nuevo
            </Button>
          </Link>
        </div> */}
      {/* </div> */}
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
                  className={
                    (row.original as any).paciente
                      ? "bg-red-50 hover:bg-red-50" // evita que el hover lo cambie
                      : "hover:bg-muted"
                  }
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
      {/* <DataTablePagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      /> */}
    </div>
  );
}
