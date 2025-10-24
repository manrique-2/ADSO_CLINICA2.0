"use client";

import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: { title: string; url: string }[];
  }[];
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [openIndex, setOpenIndex] = useState(() =>
    items.findIndex((item) =>
      item.items?.some((sub) => pathname.startsWith(sub.url))
    )
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          const isSectionActive = index === openIndex;
          const itemContent = (
            <>
              <div className="ml-">
                {item.icon && <item.icon size={17.5} />}
              </div>
              <span className="text-[15px] ml-1">{item.title}</span>
              {!collapsed && item.items && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </>
          );

          if (collapsed && item.items?.length) {
            return (
              <SidebarMenuItem key={item.title} className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="mb-1">
                      {itemContent}
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="p-2 w-52 bg-[#222d32] border-[#222d32] te shadow-lg rounded-md"
                  >
                    <p className="text-sm font- text-white px-2 pb-2 border-b">
                      {item.title}
                    </p>
                    <SidebarMenuSub className="bg-gray-600">
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="text-gray-300"
                          >
                            <Link href={sub.url}>
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isSectionActive}
              onOpenChange={(open) => setOpenIndex(open ? index : -1)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} className="mb-1">
                    {itemContent}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                  <SidebarMenuSub className="bg-gray-600">
                    {item.items?.map((sub) => {
                      const isActive = pathname === sub.url;
                      return (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={
                              isActive ? "text font- bg-white" : "text-gray-300"
                            }
                          >
                            <Link href={sub.url}>
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
