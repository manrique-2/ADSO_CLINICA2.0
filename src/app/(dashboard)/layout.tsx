// "use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUsuario } from "@/lib/server/usuario";
import DynamicBreadcrumb from "@/src/components/dynamic-breadcrumb";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await getUsuario();
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar usuario={usuario} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12  bg-[#3c8dbc]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-[#ecf0f5]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
