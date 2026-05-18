import { cn } from "@/lib/utils";

const BAR_HEIGHTS = ["h-1", "h-1.5", "h-2"] as const;
type DifficultyBarsProps = {
  filled: 1 | 2 | 3;
  active?: boolean;
  className?: string;
};

export function DifficultyBars({
  filled,
  active = false,
  className,
}: DifficultyBarsProps) {
  return (
    <span
      className={cn("inline-flex h-2 items-end gap-0.5", className)}
      aria-hidden
    >
      {BAR_HEIGHTS.map((height, index) => {
        const isFilled = index < filled;

        return (
          <span
            key={height}
            className={cn(
              "w-[2.5px] shrink-0 rounded-full transition-colors",
              height,
              isFilled
                ? active
                  ? "bg-primary-foreground"
                  : "bg-foreground"
                : active
                  ? "bg-primary-foreground/25"
                  : "bg-muted-foreground/35",
            )}
          />
        );
      })}
    </span>
  );
}
