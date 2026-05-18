"use client";

import { cn } from "@/lib/utils";
import {
  BLACK_KEY_HEIGHT,
  BLACK_KEY_WIDTH,
  PIANO_BLACK_KEYS,
  PIANO_WHITE_KEYS,
  PIANO_WIDTH,
  WHITE_KEY_HEIGHT,
  WHITE_KEY_WIDTH,
} from "../lib/piano-layout";

type VirtualPianoProps = {
  activeNotes: ReadonlySet<number>;
  onPress: (midi: number) => void;
  onRelease: (midi: number) => void;
  className?: string;
};

export function VirtualPiano({
  activeNotes,
  onPress,
  onRelease,
  className,
}: VirtualPianoProps) {
  const handlePointerDown = (midi: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    onPress(midi);
  };

  const handlePointerUp = (midi: number) => () => {
    onRelease(midi);
  };

  return (
    <div
      className={cn("w-full overflow-x-auto px-2 pb-2", className)}
      style={{ touchAction: "pan-x" }}
    >
      <div
        className="relative mx-auto"
        style={{ width: PIANO_WIDTH, height: WHITE_KEY_HEIGHT }}
      >
        {PIANO_WHITE_KEYS.map((key) => {
          const isActive = activeNotes.has(key.midi);

          return (
            <button
              key={key.midi}
              type="button"
              className={cn(
                "absolute top-0 rounded-b-md border border-border/80 bg-gradient-to-b from-card to-muted shadow-sm transition-colors",
                "active:from-primary/20 active:to-primary/35",
                isActive && "from-primary/25 to-primary/45 ring-2 ring-primary/60",
              )}
              style={{
                left: key.x,
                width: WHITE_KEY_WIDTH,
                height: WHITE_KEY_HEIGHT,
              }}
              onPointerDown={handlePointerDown(key.midi)}
              onPointerUp={handlePointerUp(key.midi)}
              onPointerCancel={handlePointerUp(key.midi)}
              aria-label={`Tecla ${key.midi}`}
            />
          );
        })}

        {PIANO_BLACK_KEYS.map((key) => {
          const isActive = activeNotes.has(key.midi);

          return (
            <button
              key={key.midi}
              type="button"
              className={cn(
                "absolute top-0 z-10 rounded-b-md border border-black/40 bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-md transition-colors",
                "active:from-primary active:to-primary/80",
                isActive && "from-primary to-primary/85 ring-2 ring-primary-foreground/50",
              )}
              style={{
                left: key.x,
                width: BLACK_KEY_WIDTH,
                height: BLACK_KEY_HEIGHT,
              }}
              onPointerDown={handlePointerDown(key.midi)}
              onPointerUp={handlePointerUp(key.midi)}
              onPointerCancel={handlePointerUp(key.midi)}
              aria-label={`Tecla ${key.midi}`}
            />
          );
        })}
      </div>
    </div>
  );
}
