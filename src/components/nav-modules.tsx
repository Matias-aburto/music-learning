"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appModules } from "@/config/modules";

export function NavModules() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {appModules.map((module) => {
          const isActive =
            module.href === "/"
              ? pathname === "/"
              : pathname.startsWith(module.href);

          return (
            <SidebarMenuItem key={module.id}>
              {module.enabled ? (
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={module.title}
                  render={<Link href={module.href} />}
                >
                  <module.icon />
                  <span>{module.title}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  disabled
                  tooltip={`${module.title} — ${module.badge}`}
                >
                  <module.icon />
                  <span>{module.title}</span>
                  {module.badge ? (
                    <Badge
                      variant="outline"
                      className="ml-auto text-[10px]"
                    >
                      {module.badge}
                    </Badge>
                  ) : null}
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
