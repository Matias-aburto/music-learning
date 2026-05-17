"use client";

import { cn } from "@/lib/utils";
import type { RoundResult } from "../types";

type RoundTimerProps = {
  progress: number;
  result: RoundResult;
  className?: string;
};

const VIEWBOX = 160;
const CENTER = VIEWBOX / 2;
const RADIUS = 70;
const STROKE = 5;

export function RoundTimer({ progress, result, className }: RoundTimerProps) {
  const circumference = 2 * Math.PI * RADIUS;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div
      className={cn(
        "relative size-[clamp(16rem,44vw,22rem)] shrink-0",
        className,
      )}
      aria-hidden
    >
      <svg
        className="size-full -rotate-90"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-muted/30"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-[stroke-dashoffset] duration-75",
            result === "correct" && "text-primary",
            (result === "timeout" || result === "wrong") && "text-destructive",
            !result && "text-primary",
          )}
        />
      </svg>
    </div>
  );
}
