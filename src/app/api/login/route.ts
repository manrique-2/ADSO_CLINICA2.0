import { NextRequest, NextResponse } from "next/server"
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies"
import { BASE_API } from "@/lib/config";



export async function POST(request: NextRequest) { 
    const { email, password } = await request.json();
    console.log("🟢 Enviando a backend:", { email, password });

    const res = await fetch(`${BASE_API}/api/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // ✅ el backend espera "email" y "password"
    });

    console.log("🔴 Código de respuesta:", res.status);

    if (!res.ok) {
        return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const data = await res.json();

    const response = NextResponse.json({ success: true });
    
    // Guarda cookies usando las funciones nuevas
    await setAccessToken(data.access);
    await setRefreshToken(data.refresh);

    return response;
}
