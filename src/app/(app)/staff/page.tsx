import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { StaffTrainerPanel } from "@/modules/staff-trainer/components/staff-trainer-panel";

export const metadata: Metadata = {
  title: "Pentagrama",
};

export default function StaffPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: siteConfig.name, href: "/" },
        { label: "Pentagrama" },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <StaffTrainerPanel />
      </div>
    </AppShell>
  );
}
