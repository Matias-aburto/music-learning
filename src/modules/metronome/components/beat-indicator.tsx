"use client";

import { cn } from "@/lib/utils";

type BeatIndicatorProps = {
  beatsPerMeasure: number;
  currentBeat: number;
  isPlaying: boolean;
  size?: "default" | "lg";
};

export function BeatIndicator({
  beatsPerMeasure,
  currentBeat,
  isPlaying,
  size = "default",
}: BeatIndicatorProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        isLarge ? "gap-4" : "gap-3",
      )}
    >
      {Array.from({ length: beatsPerMeasure }, (_, index) => {
        const isActive = isPlaying && currentBeat === index;
        const isDownbeat = index === 0;

        return (
          <span
            key={index}
            className={cn(
              "rounded-full border-2 transition-all duration-150",
              isLarge
                ? isDownbeat
                  ? "size-7"
                  : "size-5"
                : isDownbeat
                  ? "size-5"
                  : "size-4",
              isActive
                ? isDownbeat
                  ? "scale-125 border-primary bg-primary shadow-[0_0_24px] shadow-primary/40"
                  : "scale-110 border-foreground bg-foreground"
                : "border-muted-foreground/30 bg-muted/40",
            )}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
