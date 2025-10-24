import React from "react";
import { UsuariosList } from "@/src/components/usuarios/UsuariosList";
import { getUsers } from "@/lib/server/users";

export default async function UsuariosPage() {
  const { results } = await getUsers();
  return (
    <div>
      <h2 className="text-2xl font-semibold ">Usuarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <UsuariosList initialData={results} />
      </div>
    </div>
  );
}
