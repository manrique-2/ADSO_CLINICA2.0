// src/app/api/medicos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

// export async function GET(req: NextRequest) {
//   try {
//     const url = `/medico_list/`; // Ruta real para obtener médicos
//     const response = await authFetchWithCookies( url);

//     if (!response.ok) {
//       return NextResponse.json({ error: "Error al obtener médicos" }, { status: response.status });
//     }

//     const data = await response.json();

//     // data es un array directamente, sin 'results'
//     // Podemos devolverlo tal cual o procesar si quieres
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error en /api/medico_list:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const nombre = searchParams.get("nombre");

  if (page) {
    query.set("page", page);
  }
  if (nombre) {
    query.set("nombre", nombre);
  }

  const url = `/api/medico_list/?${query.toString()}`;
  console.log("Fetching medico_list from URL:", url);
  
  return await authFetchWithCookies(url);
}

// import { NextRequest, NextResponse } from "next/server";
// import { authFetchWithCookies } from "@/lib/api/authFetch";

// export async function GET(req: NextRequest) {
//   try {
//     const url = `/medico_list/`; 
//     const response = await authFetchWithCookies(url);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Error al obtener médicos" },
//         { status: response.status }
//       );
//     }

//     const data = await response.json(); // <-- esto es un array plano
//     const wrapped = {
//       count: data.length,
//       results: data,
//     };

//     return NextResponse.json(wrapped);
//   } catch (error) {
//     console.error("Error en /api/medicos:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }