import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// // Define rutas protegidas
// const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const isAuth = !!token?.value; // Verificar si hay un token
  const isLoginPage = request.nextUrl.pathname === "/login"; // Verificar si es la página de login

  if (!isAuth && !isLoginPage) { 
    // Si no está autenticado y no es la página de login, redirigir a la página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && isLoginPage) {
    // Si está autenticado y está en la página de login, redirigir al dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next(); // Continuar normalmente
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}

// middleware.ts
// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const token = request.cookies.get("token")?.value;
//   const isLoginPage = request.nextUrl.pathname === "/login";

//   if (!token && !isLoginPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (token && isLoginPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (token) {
//     try {
//       const { payload } = await jwtVerify(token, SECRET);
//       const rol = (payload["rol"] as string)?.toLowerCase();

//       // Accesos por rol
//       const roleAccess: Record<string, string[]> = {
//         admin: ["/dashboard/:path*"],
//         medico: [
//           "/dashboard",
//           "/dashboard/tratamiento/:path*",
//           "/dashboard/historia-clinica/:path*",
//           "/dashboard/procedimiento/:path*",
//           "/dashboard/registro/paciente", // solo paciente
//         ],
//         odontologo: [
//           "/dashboard",
//           "/dashboard/citas/:path*",
//           "/dashboard/tratamiento/:path*",
//           "/dashboard/historia-clinica/:path*",
//           "/dashboard/procedimiento/:path*",
//         ],
//         recepcionista: [
//           "/dashboard",
//           "/dashboard/registro/paciente",
//           "/dashboard/citas/:path*",
//         ],
//       };

//       const allowedRoutes = roleAccess[rol] || [];

//       const canAccess = allowedRoutes.some((r) => {
//         if (r.endsWith(":path*")) {
//           const prefix = r.replace("/:path*", "");
//           return request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(prefix + "/");
//         } else {
//           return request.nextUrl.pathname === r;
//         }
//       });

//       if (!canAccess) {
//         url.pathname = "/dashboard/acceso-denegado";
//         return NextResponse.redirect(url);
//       }
//     } catch (e) {
//       console.error("JWT inválido o error:", e);
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login"],
// };
