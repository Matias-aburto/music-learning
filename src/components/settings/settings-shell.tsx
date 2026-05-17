"use client";

import { usePathname } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import type { BreadcrumbEntry } from "@/components/layout/page-header";
import { SettingsNav } from "@/components/settings/settings-nav";
import { siteConfig } from "@/config/site";

const settingsTitles: Record<string, string> = {
  "/settings/midi": "MIDI",
};

type SettingsShellProps = {
  children: React.ReactNode;
};

export function SettingsShell({ children }: SettingsShellProps) {
  const pathname = usePathname();

  const breadcrumbs: BreadcrumbEntry[] = [
    { label: siteConfig.name, href: "/" },
    { label: "Ajustes", href: "/settings/midi" },
  ];

  const sectionTitle = settingsTitles[pathname];
  if (sectionTitle) {
    breadcrumbs.push({ label: sectionTitle });
  }

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 md:flex-row md:gap-10">
        <SettingsNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </AppShell>
  );
}
