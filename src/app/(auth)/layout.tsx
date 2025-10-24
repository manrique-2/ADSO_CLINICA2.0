import { ReactNode } from "react";
import { Facebook, Instagram } from "lucide-react";
import { imagelogin } from "@/src/assets/";
import Image from "next/image";
import { adsoLogo } from "@/src/assets/";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Panel izquierdo con imagen de fondo */}
      <div className="relative order-1 w-full h-screen flex-1 ">
        {/* Imagen de fondo */}
        <Image
          src={imagelogin}
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover "
        />

        {/* Capa oscura opcional */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Contenido encima de la imagen */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          {/* <Image
            src={adsoLogo}
            alt="logo adso"
            style={{ width: "60px", height: "auto" }}
          /> */}
          <p className="text-5xl font-bold ">
            Asociación de Seguros Odontológicos
          </p>
          <hr className="w-[300px] h-[3px] mt-4 bg-gray-300 " />
          <p className="text-4xl font-bold mt-3">ADSO</p>
        </div>
      </div>

      {/* Panel derecho: formulario o contenido */}
      <div className="flex order-2 p-12 bg-white h-screen items-center justify-center w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}
