"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DIFFICULTIES } from "../constants";
import type { DifficultyId } from "../types";
import { DifficultyBars } from "./difficulty-bars";

type DifficultyPickerProps = {
  value: DifficultyId;
  onChange: (id: DifficultyId) => void;
  disabled?: boolean;
};

export function DifficultyPicker({
  value,
  onChange,
  disabled,
}: DifficultyPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Dificultad"
      className="flex w-full max-w-md gap-2"
    >
      {DIFFICULTIES.map((difficulty) => {
        const isActive = difficulty.id === value;

        return (
          <Button
            key={difficulty.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "h-11 flex-1 text-sm",
              !isActive && "text-muted-foreground",
            )}
            onClick={() => onChange(difficulty.id)}
          >
            <span className="flex items-center justify-center gap-2">
              <DifficultyBars filled={difficulty.bars} active={isActive} />
              {difficulty.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
