"use client";

import { PlayIcon, RotateCcwIcon } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import type { GamePhase } from "../types";

type GameControlsProps = {
  phase: GamePhase;
  midiStatus: string;
  isActive: boolean;
  onStart: () => void;
  onReset: () => void;
};

export function GameControls({
  phase,
  midiStatus,
  isActive,
  onStart,
  onReset,
}: GameControlsProps) {
  const isFinished = phase === "finished";

  return (
    <div className="flex justify-center gap-3">
      {isFinished ? (
        <>
          <Button
            size="lg"
            className="h-12 min-w-36 gap-2 text-base"
            onClick={onStart}
            disabled={midiStatus === "requesting"}
          >
            <RotateCcwIcon className="size-5" />
            {midiStatus === "requesting" ? "Conectando…" : "Jugar de nuevo"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 text-base"
            onClick={onReset}
          >
            Cambiar nivel
          </Button>
        </>
      ) : !isActive ? (
        <Button
          size="lg"
          className="h-12 min-w-36 gap-2 text-base"
          onClick={onStart}
          disabled={midiStatus === "requesting"}
        >
          <PlayIcon className="size-5" />
          {midiStatus === "requesting" ? "Conectando…" : "Empezar"}
        </Button>
      ) : (
        <Button
          size="lg"
          variant="secondary"
          className="h-12 min-w-36 gap-2 text-base"
          onClick={onReset}
        >
          Detener
        </Button>
      )}

      {midiStatus === "denied" || midiStatus === "idle" ? (
        <ButtonLink
          href="/settings/midi"
          variant="outline"
          className="h-12 text-base"
        >
          MIDI
        </ButtonLink>
      ) : null}
    </div>
  );
}
