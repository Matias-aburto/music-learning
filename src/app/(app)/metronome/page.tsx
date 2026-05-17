import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { MetronomePanel } from "@/modules/metronome/components/metronome-panel";

export const metadata: Metadata = {
  title: "Metrónomo",
};

export default function MetronomePage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: siteConfig.name, href: "/" },
        { label: "Metrónomo" },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <MetronomePanel />
      </div>
    </AppShell>
  );
}
