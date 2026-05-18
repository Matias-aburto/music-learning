import { midiToNoteName } from "@/modules/midi/lib/note-utils";
import { lineY } from "../lib/staff-layout";
import { STAFF_LINE_STROKE_WIDTH } from "../lib/staff-metrics";
import type { StaffClef } from "../types";
import { StaffNote, type StaffNoteTone } from "./staff-note";

/** Inicio de las líneas: incluye la zona de la clave (la clave queda sobre el pentagrama). */
const STAFF_LEFT = 10;
const STAFF_RIGHT = 268;
const TREBLE_CLEF_X = 12;
const TREBLE_CLEF_FONT_SIZE = 40;
const TREBLE_CLEF_Y_OFFSET = 10;
/** Clave de Sol (bloque Musical Symbols, Noto Music). */
const TREBLE_CLEF_GLYPH = "\u{1D11E}";
const BASS_CLEF_X = 14;
const BASS_CLEF_FONT_SIZE = 42;
const BASS_CLEF_Y_OFFSET = 28;
/** Clave de Fa (bloque Musical Symbols, Noto Music). */
const BASS_CLEF_GLYPH = "\u{1D122}";
export const MUSIC_CLEF_FONT = "var(--font-music)";

/** Ancho visual aproximado del glifo de clave (fracción del fontSize). */
const CLEF_GLYPH_WIDTH_RATIO = 0.72;
const CLEF_TO_ACCIDENTAL_GAP = 4;

function clefVisualRight(x: number, fontSize: number) {
  return x + fontSize * CLEF_GLYPH_WIDTH_RATIO;
}

/** X del primer accidental de armadura, justo después de la clave más ancha. */
export const KEY_SIGNATURE_ACCIDENTAL_X_START =
  Math.max(
    clefVisualRight(TREBLE_CLEF_X, TREBLE_CLEF_FONT_SIZE),
    clefVisualRight(BASS_CLEF_X, BASS_CLEF_FONT_SIZE),
  ) + CLEF_TO_ACCIDENTAL_GAP;

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
          strokeWidth={STAFF_LINE_STROKE_WIDTH}
          className="text-foreground/90"
        />
      ))}

      {clef === "treble" ? (
        <text
          x={TREBLE_CLEF_X}
          y={lineY(1, bottomLineY) + TREBLE_CLEF_Y_OFFSET}
          fontSize={TREBLE_CLEF_FONT_SIZE}
          fontFamily={MUSIC_CLEF_FONT}
          className="fill-foreground"
        >
          {TREBLE_CLEF_GLYPH}
        </text>
      ) : (
        <text
          x={BASS_CLEF_X}
          y={lineY(3, bottomLineY) + BASS_CLEF_Y_OFFSET}
          fontSize={BASS_CLEF_FONT_SIZE}
          fontFamily={MUSIC_CLEF_FONT}
          className="fill-foreground"
        >
          {BASS_CLEF_GLYPH}
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
