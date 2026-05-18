"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FLAT_KEY_SIGNATURES, SHARP_KEY_SIGNATURES } from "../constants";
import type { KeySignatureKind } from "../types";
import { KeySignatureCard } from "./key-signature-card";

const TABS: { id: KeySignatureKind; label: string }[] = [
  { id: "sharp", label: "Sostenidos" },
  { id: "flat", label: "Bemoles" },
];

export function KeySignaturesPanel() {
  const [activeTab, setActiveTab] = useState<KeySignatureKind>("sharp");
  const entries =
    activeTab === "sharp" ? SHARP_KEY_SIGNATURES : FLAT_KEY_SIGNATURES;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6">
      <header className="space-y-1 text-center">
        <h1 className="text-lg font-semibold">Armaduras de clave</h1>
        <p className="text-sm text-muted-foreground">
          Referencia de tonalidades mayores y menores con sus alteraciones en el
          pentagrama.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Tipo de armadura"
        className="mx-auto flex w-full max-w-md gap-2"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "h-12 flex-1 text-base",
                !isActive && "text-muted-foreground",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
      >
        {entries.map((entry) => (
          <KeySignatureCard
            key={`${activeTab}-${entry.majorKey}-${entry.minorKey}`}
            entry={entry}
            kind={activeTab}
          />
        ))}
      </div>
    </div>
  );
}
