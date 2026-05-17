import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { NoteTrainerPanel } from "@/modules/note-trainer/components/note-trainer-panel";

export const metadata: Metadata = {
  title: "Notas",
};

export default function NotesPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: siteConfig.name, href: "/" },
        { label: "Notas" },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <NoteTrainerPanel />
      </div>
    </AppShell>
  );
}
