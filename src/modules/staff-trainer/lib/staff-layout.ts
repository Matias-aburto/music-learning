import type { NoteName } from "@/modules/note-game/types";
import type { StaffClef } from "../types";

export const STAFF_LINE_SPACING = 10;

/** G4 — 2ª línea en clave de Sol */
const TREBLE_REFERENCE_MIDI = 67;
const TREBLE_REFERENCE_LINE = 1;

/** F3 — 4ª línea en clave de Fa */
const BASS_REFERENCE_MIDI = 53;
const BASS_REFERENCE_LINE = 3;

const LETTER_INDEX: Record<string, number> = {
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
  A: 5,
  B: 6,
};

const SEMITONE_TO_LETTER = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];

export function midiToOctave(midi: number) {
  return Math.floor(midi / 12) - 1;
}

/** Índice diatónico a partir del MIDI (sin alteración explícita). */
export function midiToDiatonicIndex(midi: number) {
  const octave = midiToOctave(midi);
  return octave * 7 + SEMITONE_TO_LETTER[midi % 12];
}

/** Índice diatónico usando la escritura (C, Db, F#, …) y la octava del MIDI. */
export function noteToDiatonicIndex(noteName: NoteName, midi: number) {
  const letter = LETTER_INDEX[noteName[0]];
  return midiToOctave(midi) * 7 + letter;
}

export function lineY(lineIndex: number, bottomLineY: number) {
  return bottomLineY - lineIndex * STAFF_LINE_SPACING;
}

export function getNoteY(
  midi: number,
  clef: StaffClef,
  bottomLineY: number,
  noteName?: NoteName,
) {
  const refMidi =
    clef === "treble" ? TREBLE_REFERENCE_MIDI : BASS_REFERENCE_MIDI;
  const refLine =
    clef === "treble" ? TREBLE_REFERENCE_LINE : BASS_REFERENCE_LINE;
  const refY = lineY(refLine, bottomLineY);

  const refDiatonic = midiToDiatonicIndex(refMidi);
  const noteDiatonic = noteName
    ? noteToDiatonicIndex(noteName, midi)
    : midiToDiatonicIndex(midi);

  const stepsFromRef = refDiatonic - noteDiatonic;

  // En SVG, Y mayor = más abajo en el pentagrama (pitch más grave).
  return refY + stepsFromRef * (STAFF_LINE_SPACING / 2);
}

export function getLedgerLineYs(
  noteY: number,
  topLineY: number,
  bottomLineY: number,
) {
  const ledgerYs: number[] = [];

  if (noteY < topLineY - 0.5) {
    for (
      let y = topLineY - STAFF_LINE_SPACING;
      y >= noteY - 0.5;
      y -= STAFF_LINE_SPACING
    ) {
      ledgerYs.push(y);
    }
  } else if (noteY > bottomLineY + 0.5) {
    for (
      let y = bottomLineY + STAFF_LINE_SPACING;
      y <= noteY + 0.5;
      y += STAFF_LINE_SPACING
    ) {
      ledgerYs.push(y);
    }
  }

  return ledgerYs;
}

export function stemGoesDown(
  noteY: number,
  clef: StaffClef,
  bottomLineY: number,
) {
  const middleLine = 2;
  const middleY = lineY(middleLine, bottomLineY);
  return noteY < middleY;
}
