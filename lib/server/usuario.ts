// lib/server/usuario.ts
import { cookies } from "next/headers";
import { BASE_API } from "@/lib/config";

function parseJwt(token: string): { user_id: number } {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
  return JSON.parse(payload);
  
}

export async function getUsuario(): Promise<any | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    console.log("Token no encontrado");
    return null;
  }

  const decoded = parseJwt(token);
  // console.log("Payload decodificado:", decoded);

  const { user_id } = decoded;

  const res = await fetch(`${BASE_API}/api/users/${user_id}/`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
});

if (!res.ok) return null;
return await res.json();
}
