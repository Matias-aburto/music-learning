"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TimeSignature } from "../types";

type TimeSignaturePickerProps = {
  signatures: TimeSignature[];
  value: string;
  onChange: (signatureId: string) => void;
};

export function TimeSignaturePicker({
  signatures,
  value,
  onChange,
}: TimeSignaturePickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Compás"
      className="flex w-full gap-2"
    >
      {signatures.map((signature) => {
        const isActive = signature.id === value;

        return (
          <Button
            key={signature.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "h-11 flex-1 text-base tabular-nums",
              !isActive && "text-muted-foreground",
            )}
            onClick={() => onChange(signature.id)}
          >
            {signature.label}
          </Button>
        );
      })}
    </div>
  );
}
