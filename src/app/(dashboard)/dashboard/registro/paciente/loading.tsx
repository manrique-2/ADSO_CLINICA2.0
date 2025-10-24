// src/app/(dashboard)/dashboard/pacientes/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-3 text-blue-600 text-lg font-medium">
        Cargando...
      </span>
    </div>
  );
}
