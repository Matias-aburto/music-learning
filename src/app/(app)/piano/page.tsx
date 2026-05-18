import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { PianoPanel } from "@/modules/piano/components/piano-panel";

export const metadata: Metadata = {
  title: "Piano",
};

export default function PianoPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: siteConfig.name, href: "/" },
        { label: "Piano" },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <PianoPanel />
      </div>
    </AppShell>
  );
}
