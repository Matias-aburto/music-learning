"use client";

import { cn } from "@/lib/utils";
import type { NoteName, RoundResult } from "@/modules/note-game/types";
import {
  BASS_STAFF_BOTTOM_LINE_Y,
  SINGLE_STAFF_VIEW_HEIGHT_BASS,
  SINGLE_STAFF_VIEW_HEIGHT_TREBLE,
  SINGLE_STAFF_VIEW_WIDTH,
  TREBLE_STAFF_BOTTOM_LINE_Y,
} from "../lib/staff-metrics";
import type { StaffClef } from "../types";
import { StaffStartBarline } from "./staff-barline";
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
  const bottomLineY =
    clef === "treble" ? TREBLE_STAFF_BOTTOM_LINE_Y : BASS_STAFF_BOTTOM_LINE_Y;
  const viewHeight =
    clef === "treble"
      ? SINGLE_STAFF_VIEW_HEIGHT_TREBLE
      : SINGLE_STAFF_VIEW_HEIGHT_BASS;

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
      viewBox={`0 0 ${SINGLE_STAFF_VIEW_WIDTH} ${viewHeight}`}
      className={cn(
        "h-auto w-full max-w-[min(100%,20rem)] text-foreground",
        className,
      )}
      aria-hidden
    >
      <SingleStaffDisplay
        clef={clef}
        midiNotes={[]}
        bottomLineY={bottomLineY}
      />
      <StaffStartBarline bottomLineY={bottomLineY} />

      <StaffNote
        midiNote={midiNote}
        noteName={noteName}
        clef={clef}
        x={played ? TARGET_NOTE_X : 168}
        bottomLineY={bottomLineY}
        tone={targetTone}
      />

      {played ? (
        <StaffNote
          midiNote={played.midi}
          noteName={played.name}
          clef={clef}
          x={PLAYED_NOTE_X}
          bottomLineY={bottomLineY}
          tone="wrong"
        />
      ) : null}
    </svg>
  );
}
