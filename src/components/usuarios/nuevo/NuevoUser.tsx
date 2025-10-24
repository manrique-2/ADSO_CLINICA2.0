import React from "react";
import UserForm from "./UserForm";

interface Props {
  especialidadesMap: Record<number, string>;
  // enfermedadesMap: Record<number, string>;
  // alergiasMap: Record<number, string>;
}

export default function NuevoUserPage({ especialidadesMap }: Props) {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <UserForm
        especialidadesOptions={Object.entries(especialidadesMap).map(
          ([id, e]) => ({
            id: Number(id),
            nombre: e,
          })
        )}
      />
    </div>
  );
}
