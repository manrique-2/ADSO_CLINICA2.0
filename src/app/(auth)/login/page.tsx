"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { adsoLogo } from "@/src/assets/";
import { LoginForm } from "@/src/components/login-form";

export default function LoginPage() {
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5 w-svh">
      <div className="space-y-5 ">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Image
              src={adsoLogo}
              alt="logo adso"
              style={{ width: "60px", height: "auto" }}
            />
          </div>
          <h2 className="text-4xl font-bold tracking-tight ">ADSO Perú</h2>
          <p className="text-md text-muted-foreground mt-2 pb-6">
            Inicia sesión para continuar
          </p>
        </div>
        <LoginForm></LoginForm>

        {/* <div className="text-center">
          <Link
            href="/register"
            className="text-sm text-muted-foreground hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </div> */}
      </div>
      <div className="flex gap-8 mt-16 text-lg text-black items-center justify-center">
        <a
          className="flex gap-1 border rounded-lg py-2 px-4 bg-gray-300 hover:bg-gray-400"
          href="https://www.facebook.com/adsodent"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={20} />
          <p className="text-sm">ADSO DENT</p>
        </a>
        <a
          className="flex gap-1 border rounded-lg py-2 px-4 bg-gray-300 hover:bg-gray-400"
          href="https://www.instagram.com/adso.dent/"
        >
          <Instagram size={20} />
          <p className="text-sm">adso.dent</p>
        </a>
      </div>
    </div>
  );
}
