import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      name: body.name,
      password: body.password,
      password_confirmation: body.password_confirmation,
      email: body.email,
      tipo_doc: body.tipo_doc,
      num_doc: body.num_doc,
      rol: body.rol,
      estado: body.estado,
      direccion: body.direccion,
      telefono: body.telefono,
      especialidad: body.especialidad,
      clinica: body.clinica,
    };

    console.log("Payload limpio a enviar:", payload);

    const res = await authFetchWithCookies("/api/register/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 🔍 leer la respuesta sin romper si está vacía
    const raw = await res.text();
    let data: any = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = { message: raw };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error en /api/register:", error);
    return NextResponse.json(
      { error: "Error interno en /api/register" },
      { status: 500 }
    );
  }
}
