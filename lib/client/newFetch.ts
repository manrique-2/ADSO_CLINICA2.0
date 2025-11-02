"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BASE_API, SITE_URL } from "@/lib/config";

export function useNewFetchWithAuthRedirect() {
  const router = useRouter();

  const fetchWithAuthRedirect = useCallback(
    async (url: string, options?: RequestInit) => {
      // ✅ Ensure full URL
      let fullUrl: string;
      if (!BASE_API) {
        let NEW_BASE_API = "https://api.adso-peru.org/";
        fullUrl = url.startsWith("http")
          ? url
          : `${NEW_BASE_API}${url}`;
      } else {
        fullUrl = url.startsWith("http")
          ? url
          : `${BASE_API}${url}`;
      }
      const res = await fetch(fullUrl, {
        ...options,
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/login");
        throw new Error("Sesión expirada. Redirigiendo al login...");
      }

      return res;
    },
    [router]
  );

  return fetchWithAuthRedirect;
}
