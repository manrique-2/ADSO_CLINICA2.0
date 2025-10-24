import { Ban, FileX2, Search } from "lucide-react";

interface EmptyStateProps {
  type: "no-filters" | "no-results";
}

export function EmptyState({ type }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
      {type === "no-results" ? (
        <>
          <FileX2 className="w-12 h-12" />
          <p>
            No se encontraron citas con los filtros aplicados en esta fecha.
          </p>
        </>
      ) : (
        <>
          <Search className="w-12 h-12" />
          <p>
            Aún no has aplicado ningún filtro. Usa los campos de búsqueda para
            comenzar.
          </p>
        </>
      )}
    </div>
  );
}
// export function EmptyStateError() {
//   return (
//     <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
//       <Ban className="w-12 h-12" />
//       <p>Ocurrió un error al cargar los datos. Por favor, inténtalo de nuevo.</p>
//     </div>
//   );
// }
// export function EmptyStateNoData() {
//   return (
//     <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
//       <FileX2 className="w-12 h-12" />
//       <p>No hay citas registradas por el momento.</p>
//     </div>
//   );
// }
