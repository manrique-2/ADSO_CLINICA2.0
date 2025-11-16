"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook que devuelve una función fetch con redirección automática al login si el token expiró.
 */
export function useFetchWithAuthRedirect() {
  const router = useRouter();
  const fetchWithAuthRedirect = useCallback(
    async (url: string, options?: RequestInit) => {
      const res = await fetch(url, {
        ...options,
        credentials: "include", // importante para mandar cookies
      });

      if (res.status === 401) {
        // 👉 Token expirado y no se pudo refrescar
        router.push("/login");
        throw new Error("Sesión expirada. Redirigiendo al login...");
      }

      return res;
    },
    [router]
  );

  return fetchWithAuthRedirect;
}
