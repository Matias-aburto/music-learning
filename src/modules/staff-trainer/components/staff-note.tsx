import { cn } from "@/lib/utils";
import type { NoteName } from "@/modules/note-game/types";
import { hasAccidental } from "@/modules/note-game/types";
import {
  getLedgerLineYs,
  getNoteY,
  lineY,
  stemGoesDown,
} from "../lib/staff-layout";
import type { StaffClef } from "../types";
import { MUSIC_CLEF_FONT } from "./single-staff-display";

function accidentalSymbol(noteName: NoteName) {
  if (noteName.includes("#")) return "♯";
  if (noteName.includes("b")) return "♭";
  return null;
}

export type StaffNoteTone = "default" | "muted" | "wrong" | "active";

type StaffNoteProps = {
  midiNote: number;
  noteName: NoteName;
  clef: StaffClef;
  x: number;
  bottomLineY: number;
  tone?: StaffNoteTone;
};

export function StaffNote({
  midiNote,
  noteName,
  clef,
  x,
  bottomLineY,
  tone = "default",
}: StaffNoteProps) {
  const topLineY = lineY(4, bottomLineY);
  const noteY = getNoteY(midiNote, clef, bottomLineY, noteName);
  const ledgerYs = getLedgerLineYs(noteY, topLineY, bottomLineY);
  const stemDown = stemGoesDown(noteY, clef, bottomLineY);
  const accidental = hasAccidental(noteName)
    ? accidentalSymbol(noteName)
    : null;
  const stemX = stemDown ? x + 7 : x - 7;
  const stemY2 = stemDown ? noteY + 36 : noteY - 36;

  const headClass = cn(
    "transition-colors duration-150",
    tone === "default" && "fill-foreground",
    tone === "muted" && "fill-foreground/45",
    tone === "wrong" && "fill-destructive",
    tone === "active" && "fill-primary",
  );

  const stemClass = cn(
    "transition-colors duration-150",
    tone === "default" && "stroke-foreground",
    tone === "muted" && "stroke-foreground/45",
    tone === "wrong" && "stroke-destructive",
    tone === "active" && "stroke-primary",
  );

  return (
    <g>
      {ledgerYs.map((y) => (
        <line
          key={`${midiNote}-${y}`}
          x1={x - 11}
          x2={x + 11}
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
          y={noteY}
          dominantBaseline="middle"
          fontSize={20}
          fontFamily={MUSIC_CLEF_FONT}
          className={cn(
            tone === "muted" && "fill-foreground/45",
            tone === "wrong" && "fill-destructive",
            tone === "active" && "fill-primary",
            tone !== "muted" && tone !== "wrong" && tone !== "active" && "fill-foreground",
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
