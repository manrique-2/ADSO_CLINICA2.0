"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { adsoLogo } from "@/src/assets";
import {
  Settings,
  SquarePen,
  CalendarDays,
  BriefcaseMedical,
  FileText,
  ChartColumn,
  Hospital,
  Wrench,
  Package,
  Users,
  House,
  ClipboardPlus,
  HandCoins,
  Archive,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { rolePermissions, filterNavByRole } from "@/lib/permissions";
// import { getUsuario } from "@/lib/server/usuario";

// This is sample data.

export function AppSidebar({
  usuario,
  ...props
}: React.ComponentProps<typeof Sidebar> & { usuario: any }) {
  const [collapsed, setCollapsed] = useState(true); // inicia cerrado
  // const [role, setRole] = useState<string | null>(null);
  const role = usuario?.rol?.toLowerCase();

  const data = {
    user: {
      name: usuario?.name || "Invitado",
      ocupation: usuario?.rol || "Sin rol",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Inicio",
        url: "#",
        icon: House,
        // isActive: true,
        items: [
          {
            title: "Cuenta",
            url: "/dashboard",
          },
        ],
      },
      {
        title: "Registro",
        url: "#",
        icon: SquarePen,
        // isActive: true,

        items: [
          {
            title: "Paciente",
            url: "/dashboard/registro/paciente",
          },
          {
            title: "Odontologo",
            url: "/dashboard/registro/odontologo",
          },
        ],
      },
      {
        title: "Citas",
        url: "#",
        icon: CalendarDays,
        items: [
          {
            title: "Agenda",
            url: "/dashboard/citas/agenda",
          },
          {
            title: "Registrar",
            url: "/dashboard/citas/registrar",
          },
        ],
      },
      {
        title: "Tratamiento",
        url: "#",
        icon: BriefcaseMedical,
        items: [
          {
            title: "Registrar",
            url: "/dashboard/tratamiento/registro",
          },
          // {
          //   title: "Comprobantes",
          //   url: "/dashboard/tratamiento/comprobantes",
          // },
        ],
      },
      {
        title: "Tratamiento Paciente",
        url: "#",
        icon: ClipboardPlus,
        items: [
          {
            title: "Registro",
            url: "/dashboard/tratamiento-paciente/registro",
          },
          // {
          //   title: "Comprobantes",
          //   url: "/dashboard/tratamiento/comprobantes",
          // },
        ],
      },
      {
        title: "Historia clinica",
        url: "#",
        icon: FileText,
        items: [
          {
            title: "Movimiento",
            url: "/dashboard/historia-clinica/movimiento",
          },
        ],
      },
      {
        title: "Transacciones",
        url: "#",
        icon: HandCoins,
        items: [
          {
            title: "Pago tratamiento paciente",
            url: "/dashboard/ingresos/pago-tratamientoPaciente",
          },
          {
            title: "Registrar Egresos",
            url: "/dashboard/egresos/",
          }
        ],
      },
      {
        title: "Cierre de caja",
        url: "#",
        icon: Archive,
        items: [
          {
            title: "Caja",
            url: "/dashboard/cierre-caja/caja",
          },
        ],
      },
      {
        title: "Reportes",
        url: "#",
        icon: ChartColumn,
        items: [
          {
            title: "Tratamientos cobrados",
            url: "/dashboard/reportes/tratam cobrados",
          },
        ],
      },
      {
        title: "Procedimiento",
        url: "#",
        icon: Hospital,
        items: [
          {
            title: "Tarifario",
            url: "/dashboard/procedimiento/tarifario",
          },
          {
            title: "Diagnostico",
            url: "/dashboard/procedimiento/diagnostico",
          },
        ],
      },
      // {
      //   title: "Mantenimiento",
      //   url: "#",
      //   icon: Wrench,
      //   items: [
      //     {
      //       title: "Tipo pago",
      //       url: "/dashboard/mantenimiento/tipo pago",
      //     },
      //     {
      //       title: "Moneda",
      //       url: "/dashboard/mantenimiento/moneda",
      //     },
      //     {
      //       title: "Banco",
      //       url: "/dashboard/mantenimiento/banco",
      //     },
      //     {
      //       title: "Tipo tarjeta",
      //       url: "/dashboard/mantenimiento/tipo tarjeta",
      //     },
      //   ],
      // },
      // {
      //   title: "Catalogo",
      //   url: "#",
      //   icon: Package,
      //   items: [
      //     {
      //       title: "Unidad Medida",
      //       url: "/dashboard/catalogo/unidad medida",
      //     },
      //     {
      //       title: "Tipo concepto",
      //       url: "#",
      //     },
      //     {
      //       title: "Categoria",
      //       url: "/dashboard/catalogo/categoria",
      //     },
      //     {
      //       title: "Especialidad",
      //       url: "/dashboard/catalogo/especialidad",
      //     },
      //     {
      //       title: "Tipo Citado",
      //       url: "/dashboard/catalogo/tipo citado",
      //     },
      //     {
      //       title: "Alergia",
      //       url: "/dashboard/catalogo/alergia",
      //     },
      //   ],
      // },
      {
        title: "Gestion Usuarios",
        url: "#",
        icon: Users,
        items: [
          {
            title: "Usuarios",
            url: "/dashboard/gestion-usuarios/usuarios",
          },
          // {
          //   title: "Roles",
          //   url: "/dashboard/gestion-usuarios/roles",
          // },
          // {
          //   title: "Permisos",
          //   url: "/dashboard/gestion-usuarios/permisos",
          // },
        ],
      },
      // {
      //   title: "Configuracion",
      //   url: "#",
      //   icon: Settings,
      //   items: [
      //     {
      //       title: "Mi Clinica",
      //       url: "/dashboard/configuracion/mi clinica",
      //     },
      //     {
      //       title: "Tipo Documento",
      //       url: "/dashboard/configuracion/tipo documento",
      //     },
      //   ],
      // },
    ],
    // projects: [
    //   {
    //     name: "Design Engineering",
    //     url: "#",
    //     icon: Frame,
    //   },
    //   {
    //     name: "Sales & Marketing",
    //     url: "#",
    //     icon: PieChart,
    //   },
    //   {
    //     name: "Travel",
    //     url: "#",
    //     icon: Map,
    //   },
    // ],
  };

  // // ⚡ Traer el usuario real al montar
  // if (!role) return null;

  // 🔹 Aquí pones el rol real del usuario logueado
  // Podrías obtenerlo desde un contexto, un hook o cookies
  // const role = data.user.ocupation.toLowerCase(); // ejemplo: "odontologo"

  // 🔹 Filtrar el menú según el rol
  const filteredNav = filterNavByRole(data.navMain, role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#3c8dbc] text-white">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Image
                  src={adsoLogo}
                  alt="logo adso"
                  style={{ width: "30px", height: "auto" }}
                />
                <span className="text-xl font-semibold">ADSO Peru</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent
        className="bg-[#222d32] text-white "
        // className="bg-white"
      >
        <div className="mt-3">
          <NavMain items={filteredNav} collapsed={collapsed} />
        </div>
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter className="bg-[#222d32] text-white">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
