// components/historial-tabs/DatosTab.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PacienteHistorial } from "lib/types/historial";

export function DatosPaciente({ paciente }: { paciente: PacienteHistorial }) {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label className="text-md">Apellidos:</Label>
            <Input type="text" defaultValue={paciente.apel_pac} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Nombre:</Label>
            <Input type="text" defaultValue={paciente.nomb_pac} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="flex flex-col gap-1">
              <Label className="text-md">F. de Nac:</Label>
              <Input type="text" defaultValue={paciente.fena_pac} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-md">Edad:</Label>
              <Input type="text" defaultValue={paciente.edad_pac} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-md">DNI:</Label>
              <Input type="text" defaultValue={paciente.dni_pac} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Direccion:</Label>
            <Input type="text" defaultValue={paciente.dire_pac} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label className="text-md">Genero:</Label>
            <Input type="text" defaultValue={paciente.sexo} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Ocupacion:</Label>
            <Input type="text" defaultValue={paciente.ocupacion} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Estudio:</Label>
            <Input type="text" defaultValue={paciente.estudios_pac} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label className="text-md">Estado civil:</Label>
            <Input type="text" defaultValue={paciente.civi_pac} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Email:</Label>
            <Input type="text" defaultValue={paciente.emai_pac} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label className="text-md">Pais:</Label>
            <Input type="text" defaultValue={paciente.pais_id} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Departamento:</Label>
            <Input type="text" defaultValue={paciente.departamento_id} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Distrito:</Label>
            <Input type="text" defaultValue={paciente.distrito_id} />
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <Label className="text-md">Clinica:</Label>
          <Input type="text" defaultValue={paciente.clinica} />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-md">Observaciones:</Label>
          <Textarea defaultValue={paciente.observacion} />
        </div>
      </div>
    </>
  );
}
