import Image from "next/image";
import { adsoLogo2 } from "@/src/assets/";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getUsuario } from "@/lib/server/usuario";
import ModalBuscarAgenda from "@/src/components/inicio/ModalBuscarAgenda";

export default async function InicioPage() {
  const usuario = await getUsuario();
  return (
    <>
      <div className="grid grid-cols-1 auto-rows-min gap-6 md:grid-cols-3 ">
        <div className="bg-white p-5 rounded-lg space-y-4 shadow-sm">
          <h1 className="text-lg text-[#337ab7] font-medium">
            Datos de la cuenta
          </h1>
          <Separator className="bg-[#337ab7] h-[2px]" />
          <div className="flex gap-2 flex-col mb-6 items-center justify-center text-white bg-[#337ab7] aspect-video rounded-md p-6">
            <div className="bg-blue-500 w-[120px] h-[120px] rounded-full outline-4 outline-white "></div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">{usuario?.name ?? "Nombre"}</p>
              <p className="text-sm">{usuario?.rol ?? "Rol"}</p>
            </div>
          </div>
          <Separator className="bg-[#337ab7] h-[2px]" />
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex gap-2">
              <p className="font-semibold">Direccion:</p>
              <p>{usuario?.direccion ?? "---------"}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Clinica: </p>
              <p className="tex">Asociacion de Seguros Odontologicos - ADSO</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Telefono:</p>
              <p> {usuario?.telefono ?? "00000000"} </p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Correo:</p>
              <p> {usuario?.email ?? "example@example.com"} </p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Usuario sesion:</p>
              <p> {usuario?.rol ?? "rol"} </p>
            </div>
            <Separator className="bg-[#337ab7] h-[2px]" />
            <div>
              {/* <Button className="w-full bg-[#337ab7] hover:bg-[#285e8e]">
                Cambiar contraseña
              </Button> */}
              <div className="bg-[#337ab7] w-full h-9 rounded-md">
                <div className="flex justify-center items-center h-full text-white">
                  Clinica ADSO -
                  {usuario.clinica == 1 ? " Iquitos" : " Yurimaguas"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg col-span-2 h-fit gap-6 grid grid-cols-2">
          <div className="bg-white rounded-lg col-span-2 h-fit p-5 shadow-sm">
            <div className="flex flex-col gap-4">
              <p className="text-[#337ab7] font-semibold text-lg">
                Sistema Web Odontologico - ADSO Peru
              </p>
              <Separator className="bg-[#337ab7] h-[2px]" />
              <p className="text-sm text-gray-500">
                Bienvenido al Sistema Web Odontologico ADSO Peru desarrollado
                para clínicas y consultorios odontológicos con el objetivo de
                sistematizar sus procesos en registro de citas, pagos de
                tratamientos, historia clínica y odontograma virtual.
              </p>
            </div>
          </div>
          <ModalBuscarAgenda />

          {/* <div className="col-span-2 grid place-items-center">
            <Image
              src={adsoLogo2}
              alt="logo"
              style={{ width: "400px", height: "auto" }}
            ></Image>
          </div> */}
          {/* <div>
            Clinica ADSO
            {usuario.clinica == 1 ? " Iquitos" : " Yurimaguas"}
          </div> */}
        </div>
      </div>
    </>
  );
}
