"use client";

import { cn } from "@/lib/utils";
import { DifficultyPicker } from "@/modules/note-game/components/difficulty-picker";
import { GameControls } from "@/modules/note-game/components/game-controls";
import { GameFinishedSummary } from "@/modules/note-game/components/game-finished-summary";
import { RoundTimer } from "@/modules/note-game/components/round-timer";
import { ClefPicker } from "./clef-picker";
import { StaffDisplay } from "./staff-display";
import { useStaffTrainer } from "../hooks/use-staff-trainer";

export function StaffTrainerPanel() {
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
    clefMode,
    displayClef,
    displayMidi,
    playedMidi,
    playedNoteName,
    setDifficulty,
    setClefMode,
    start,
    resetToIdle,
  } = useStaffTrainer();

  const isCountdown = phase === "countdown";
  const isFinished = phase === "finished";

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

            {isCountdown ? (
              <p
                className="absolute text-[clamp(5rem,20vw,10rem)] font-semibold leading-none text-muted-foreground"
                aria-live="polite"
              >
                {countdownValue}
              </p>
            ) : (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-200",
                  phase === "idle" && "opacity-40",
                )}
                aria-live="polite"
              >
                <StaffDisplay
                  midiNote={displayMidi}
                  noteName={targetNote}
                  clef={displayClef}
                  result={roundResult}
                  playedMidi={playedMidi}
                  playedNoteName={playedNoteName}
                />
              </div>
            )}
          </div>
        )}

        {roundResult === "wrong" ? (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span>Esperada: {targetNote}</span>
            {playedNoteName ? (
              <span className="text-destructive">Tocaste: {playedNoteName}</span>
            ) : null}
          </div>
        ) : null}

        {phase === "playing" && roundResult !== "wrong" ? (
          <div className="flex flex-col items-center gap-1 text-sm tabular-nums text-muted-foreground">
            <span>
              {score} aciertos
              {streak > 1 ? ` · ${streak} seguidas` : ""}
            </span>
            <span className="text-xs">
              {displayClef === "treble" ? "Llave de Sol" : "Llave de Fa"}
            </span>
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-4 pb-6">
        <DifficultyPicker
          value={difficultyId}
          onChange={setDifficulty}
          disabled={isActive}
        />

        <ClefPicker
          value={clefMode}
          onChange={setClefMode}
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
