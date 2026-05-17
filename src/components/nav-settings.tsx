"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { settingsNav } from "@/config/settings";

export function NavSettings() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ajustes</SidebarGroupLabel>
      <SidebarMenu>
        {settingsNav.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.title}
              render={<Link href={item.href} />}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
