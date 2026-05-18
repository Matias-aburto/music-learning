import { midiToNoteName } from "@/modules/midi/lib/note-utils";
import { lineY } from "../lib/staff-layout";
import type { StaffClef } from "../types";
import { StaffNote, type StaffNoteTone } from "./staff-note";

const STAFF_LEFT = 52;
const STAFF_RIGHT = 268;
const NOTE_X_START = 148;
const NOTE_X_GAP = 28;

type SingleStaffDisplayProps = {
  clef: StaffClef;
  midiNotes: number[];
  bottomLineY: number;
  noteTone?: StaffNoteTone;
  className?: string;
};

export function SingleStaffDisplay({
  clef,
  midiNotes,
  bottomLineY,
  noteTone = "active",
  className,
}: SingleStaffDisplayProps) {
  return (
    <g className={className}>
      {Array.from({ length: 5 }, (_, index) => (
        <line
          key={index}
          x1={STAFF_LEFT}
          x2={STAFF_RIGHT}
          y1={lineY(index, bottomLineY)}
          y2={lineY(index, bottomLineY)}
          stroke="currentColor"
          strokeWidth={1.25}
          className="text-foreground/90"
        />
      ))}

      {clef === "treble" ? (
        <text
          x={12}
          y={bottomLineY + 2}
          fontSize={44}
          className="fill-foreground font-serif"
        >
          𝄞
        </text>
      ) : (
        <text
          x={14}
          y={lineY(3, bottomLineY) + 8}
          fontSize={34}
          className="fill-foreground font-serif"
        >
          𝄢
        </text>
      )}

      {midiNotes.map((midi, index) => (
        <StaffNote
          key={midi}
          midiNote={midi}
          noteName={midiToNoteName(midi)}
          clef={clef}
          x={NOTE_X_START + index * NOTE_X_GAP}
          bottomLineY={bottomLineY}
          tone={noteTone}
        />
      ))}
    </g>
  );
}

export { STAFF_LEFT, STAFF_RIGHT };
