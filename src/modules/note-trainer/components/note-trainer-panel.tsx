"use client";

import { cn } from "@/lib/utils";
import { DifficultyPicker } from "@/modules/note-game/components/difficulty-picker";
import { GameControls } from "@/modules/note-game/components/game-controls";
import { GameFinishedSummary } from "@/modules/note-game/components/game-finished-summary";
import { RoundTimer } from "@/modules/note-game/components/round-timer";
import { hasAccidental } from "@/modules/note-game/types";
import { useNoteTrainer } from "../hooks/use-note-trainer";

export function NoteTrainerPanel() {
  const {
    midiStatus,
    phase,
    difficultyId,
    countdownValue,
    targetNote,
    progress,
    roundResult,
    failReason,
    score,
    streak,
    bestStreak,
    isActive,
    setDifficulty,
    start,
    resetToIdle,
  } = useNoteTrainer();

  const isCountdown = phase === "countdown";
  const isFinished = phase === "finished";
  const isAccidental = hasAccidental(targetNote);

  if (midiStatus === "unsupported") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Tu navegador no soporta MIDI. Usa Chrome o Edge.
      </p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-4">
        {isFinished ? (
          <GameFinishedSummary
            score={score}
            bestStreak={bestStreak}
            failReason={failReason}
          />
        ) : (
          <div className="relative flex size-[clamp(16rem,44vw,22rem)] items-center justify-center">
            {!isCountdown ? (
              <RoundTimer progress={progress} result={roundResult} />
            ) : null}

            <p
              className={cn(
                "absolute text-center font-semibold leading-none transition-colors duration-200",
                isCountdown &&
                  "text-[clamp(5rem,20vw,10rem)] text-muted-foreground",
                !isCountdown && isAccidental && "text-[clamp(3rem,14vw,7rem)]",
                !isCountdown &&
                  !isAccidental &&
                  "text-[clamp(4rem,18vw,9rem)]",
                !isCountdown && roundResult === "correct" && "text-primary",
                !isCountdown &&
                  (roundResult === "timeout" || roundResult === "wrong") &&
                  "text-destructive",
              )}
              aria-live="polite"
            >
              {isCountdown ? countdownValue : targetNote}
            </p>
          </div>
        )}

        {phase === "playing" ? (
          <div className="flex gap-6 text-sm tabular-nums text-muted-foreground">
            <span>{score} aciertos</span>
            {streak > 1 ? <span>{streak} seguidas</span> : null}
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 px-4 pb-6">
        <DifficultyPicker
          value={difficultyId}
          onChange={setDifficulty}
          disabled={isActive}
        />

        <GameControls
          phase={phase}
          midiStatus={midiStatus}
          isActive={isActive}
          onStart={() => void start()}
          onReset={resetToIdle}
        />
      </div>
    </div>
  );
}
