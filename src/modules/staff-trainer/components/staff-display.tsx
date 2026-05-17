"use client";

import { cn } from "@/lib/utils";
import type { NoteName, RoundResult } from "@/modules/note-game/types";
import { hasAccidental } from "@/modules/note-game/types";
import {
  getLedgerLineYs,
  getNoteY,
  lineY,
  stemGoesDown,
} from "../lib/staff-layout";
import type { StaffClef } from "../types";

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
const STAFF_LEFT = 52;
const STAFF_RIGHT = 268;
const TARGET_NOTE_X = 148;
const PLAYED_NOTE_X = 208;
const BOTTOM_LINE_Y = 92;
const LEDGER_WIDTH = 22;

function accidentalSymbol(noteName: NoteName) {
  if (noteName.includes("#")) return "♯";
  if (noteName.includes("b")) return "♭";
  return null;
}

type StaffNoteProps = {
  midiNote: number;
  noteName: NoteName;
  clef: StaffClef;
  x: number;
  topLineY: number;
  tone: "default" | "muted" | "wrong";
};

function StaffNote({
  midiNote,
  noteName,
  clef,
  x,
  topLineY,
  tone,
}: StaffNoteProps) {
  const noteY = getNoteY(midiNote, clef, BOTTOM_LINE_Y, noteName);
  const ledgerYs = getLedgerLineYs(noteY, topLineY, BOTTOM_LINE_Y);
  const stemDown = stemGoesDown(noteY, clef, BOTTOM_LINE_Y);
  const accidental = hasAccidental(noteName)
    ? accidentalSymbol(noteName)
    : null;
  const stemX = stemDown ? x + 7 : x - 7;
  const stemY2 = stemDown ? noteY + 36 : noteY - 36;

  const headClass = cn(
    "transition-colors duration-200",
    tone === "default" && "fill-foreground",
    tone === "muted" && "fill-foreground/45",
    tone === "wrong" && "fill-destructive",
  );

  const stemClass = cn(
    "transition-colors duration-200",
    tone === "default" && "stroke-foreground",
    tone === "muted" && "stroke-foreground/45",
    tone === "wrong" && "stroke-destructive",
  );

  return (
    <g>
      {ledgerYs.map((y) => (
        <line
          key={`${x}-${y}`}
          x1={x - LEDGER_WIDTH / 2}
          x2={x + LEDGER_WIDTH / 2}
          y1={y}
          y2={y}
          stroke="currentColor"
          strokeWidth={1.25}
          className={tone === "muted" ? "text-foreground/45" : undefined}
        />
      ))}

      {accidental ? (
        <text
          x={x - 22}
          y={noteY + 5}
          fontSize={20}
          className={cn(
            "font-serif",
            tone === "muted" ? "fill-foreground/45" : "fill-foreground",
            tone === "wrong" && "fill-destructive",
          )}
        >
          {accidental}
        </text>
      ) : null}

      <ellipse cx={x} cy={noteY} rx={7} ry={5} className={headClass} />

      <line
        x1={stemX}
        y1={noteY}
        x2={stemX}
        y2={stemY2}
        strokeWidth={1.5}
        className={stemClass}
      />
    </g>
  );
}

export function StaffDisplay({
  midiNote,
  noteName,
  clef,
  result,
  playedMidi,
  playedNoteName,
  className,
}: StaffDisplayProps) {
  const topLineY = lineY(4, BOTTOM_LINE_Y);
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
      {Array.from({ length: 5 }, (_, index) => (
        <line
          key={index}
          x1={STAFF_LEFT}
          x2={STAFF_RIGHT}
          y1={lineY(index, BOTTOM_LINE_Y)}
          y2={lineY(index, BOTTOM_LINE_Y)}
          stroke="currentColor"
          strokeWidth={1.25}
          className="text-foreground/90"
        />
      ))}

      {clef === "treble" ? (
        <text
          x={12}
          y={BOTTOM_LINE_Y + 2}
          fontSize={52}
          className="fill-foreground font-serif"
        >
          𝄞
        </text>
      ) : (
        <text
          x={14}
          y={lineY(3, BOTTOM_LINE_Y) + 10}
          fontSize={40}
          className="fill-foreground font-serif"
        >
          𝄢
        </text>
      )}

      <StaffNote
        midiNote={midiNote}
        noteName={noteName}
        clef={clef}
        x={played ? TARGET_NOTE_X : 168}
        topLineY={topLineY}
        tone={targetTone}
      />

      {played ? (
        <StaffNote
          midiNote={played.midi}
          noteName={played.name}
          clef={clef}
          x={PLAYED_NOTE_X}
          topLineY={topLineY}
          tone="wrong"
        />
      ) : null}
    </svg>
  );
}
