import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function DataTablePagination({
  page,
  totalPages,
  setPage,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="text-muted-foreground flex-1 text-sm">
        Página {page} de {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          // className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          className="cursor-pointer"
          variant="outline"
          size="icon"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <ChevronsLeft />
        </Button>
        <Button
          // className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          className="cursor-pointer"
          variant="outline"
          size="default"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft />
          Atras
        </Button>
        <Button
          // className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          className="cursor-pointer"
          variant="outline"
          // size="icon"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
          <ChevronRight />
        </Button>
        <Button
          // className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          className="cursor-pointer"
          variant="outline"
          size="icon"
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
