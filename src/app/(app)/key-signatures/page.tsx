import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { KeySignaturesPanel } from "@/modules/key-signatures/components/key-signatures-panel";

export const metadata: Metadata = {
  title: "Armaduras",
};

export default function KeySignaturesPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: siteConfig.name, href: "/" },
        { label: "Armaduras" },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <KeySignaturesPanel />
      </div>
    </AppShell>
  );
}
