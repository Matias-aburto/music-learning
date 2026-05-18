"use client";

import { cn } from "@/lib/utils";
import type { NoteName, RoundResult } from "@/modules/note-game/types";
import type { StaffClef } from "../types";
import { StaffNote } from "./staff-note";
import { SingleStaffDisplay } from "./single-staff-display";

type StaffDisplayProps = {
  midiNote: number;
  noteName: NoteName;
  clef: StaffClef;
  result?: RoundResult;
  playedMidi?: number | null;
  playedNoteName?: NoteName | null;
  className?: string;
};

const VIEW_WIDTH = 300;
const VIEW_HEIGHT = 120;
const BOTTOM_LINE_Y = 92;
const TARGET_NOTE_X = 148;
const PLAYED_NOTE_X = 208;

export function StaffDisplay({
  midiNote,
  noteName,
  clef,
  result,
  playedMidi,
  playedNoteName,
  className,
}: StaffDisplayProps) {
  const played =
    result === "wrong" && playedMidi != null && playedNoteName != null
      ? { midi: playedMidi, name: playedNoteName }
      : null;

  const targetTone = played
    ? "muted"
    : result === "correct"
      ? "default"
      : result === "wrong" || result === "timeout"
        ? "wrong"
        : "default";

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={cn(
        "h-auto w-full max-w-[min(100%,20rem)] text-foreground",
        className,
      )}
      aria-hidden
    >
      <SingleStaffDisplay
        clef={clef}
        midiNotes={[]}
        bottomLineY={BOTTOM_LINE_Y}
      />

      <StaffNote
        midiNote={midiNote}
        noteName={noteName}
        clef={clef}
        x={played ? TARGET_NOTE_X : 168}
        bottomLineY={BOTTOM_LINE_Y}
        tone={targetTone}
      />

      {played ? (
        <StaffNote
          midiNote={played.midi}
          noteName={played.name}
          clef={clef}
          x={PLAYED_NOTE_X}
          bottomLineY={BOTTOM_LINE_Y}
          tone="wrong"
        />
      ) : null}
    </svg>
  );
}
