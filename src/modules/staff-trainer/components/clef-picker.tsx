"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CLEF_MODES } from "../constants";
import type { ClefMode } from "../types";

type ClefPickerProps = {
  value: ClefMode;
  onChange: (mode: ClefMode) => void;
  disabled?: boolean;
};

export function ClefPicker({ value, onChange, disabled }: ClefPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Clave"
      className="flex w-full max-w-lg gap-2"
    >
      {CLEF_MODES.map((mode) => {
        const isActive = mode.id === value;

        return (
          <Button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "h-11 flex-1 px-2 text-xs sm:text-sm",
              !isActive && "text-muted-foreground",
            )}
            onClick={() => onChange(mode.id)}
          >
            {mode.label}
          </Button>
        );
      })}
    </div>
  );
}
