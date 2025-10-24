import { imagenAccess } from "@/src/assets";
import Image from "next/image";

export default function AccesoDenegadoPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 bg-[#ecf0f5]">
      <div className="flex flex-col items-center justify-center  bg-white p-10 gap-8 rounded-2xl shadow-sm ">
        <div className=" flex items-center gap-3">
          <div className="">
            <Image
              src={imagenAccess}
              alt="logo adso"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <div className="text-center">
            <h2 className="text-8xl font-bold text-red-600">Acceso</h2>
            <h2 className="text-8xl font-bold text-red-600">Denegado</h2>
          </div>
        </div>
        <p className="text-[#285e8e] text-lg font-medium tracking-tight">
          No tienes permisos para acceder a esta página.
        </p>
      </div>
    </div>
  );
}
