import {
  STAFF_LINE_SPACING,
  lineY,
} from "@/modules/staff-trainer/lib/staff-layout";

/** Línea del pentagrama (0 = línea inferior). */
export type StaffLineIndex = 0 | 1 | 2 | 3 | 4;

/** Espacio entre líneas n y n+1 dentro del pentagrama. */
export type StaffSpaceIndex = 0 | 1 | 2 | 3;

/** Espacio por encima de la quinta línea (0 = primer espacio superior). */
export type StaffSpaceAboveIndex = 0;

/** Espacio por debajo de la primera línea (0 = primer espacio inferior). */
export type StaffSpaceBelowIndex = 0;

export type StaffStep =
  | { kind: "line"; index: StaffLineIndex }
  | { kind: "space"; index: StaffSpaceIndex }
  | { kind: "space-above"; index: StaffSpaceAboveIndex }
  | { kind: "space-below"; index: StaffSpaceBelowIndex };

export function spaceBetweenLinesY(
  lowerLineIndex: number,
  bottomLineY: number,
): number {
  return (
    (lineY(lowerLineIndex, bottomLineY) +
      lineY(lowerLineIndex + 1, bottomLineY)) /
    2
  );
}

export function staffStepY(step: StaffStep, bottomLineY: number): number {
  if (step.kind === "line") {
    return lineY(step.index, bottomLineY);
  }

  if (step.kind === "space") {
    return spaceBetweenLinesY(step.index, bottomLineY);
  }

  if (step.kind === "space-above") {
    return spaceBetweenLinesY(4 + step.index, bottomLineY);
  }

  return spaceBetweenLinesY(-1 - step.index, bottomLineY);
}

/**
 * Clave de Sol — posiciones fijas (convención estándar de grabado).
 * @see https://www.guitarland.com/Music10/MusFund/Maj_Key_Sig/MajKeySig.html
 */
export const TREBLE_KEY_SIGNATURE_STEPS = {
  "F#": { kind: "line", index: 4 },
  "C#": { kind: "space", index: 2 },
  "G#": { kind: "space-above", index: 0 },
  "D#": { kind: "line", index: 3 },
  "A#": { kind: "space", index: 1 },
  "E#": { kind: "space", index: 3 },
  "B#": { kind: "line", index: 2 },
  Bb: { kind: "line", index: 2 },
  Eb: { kind: "space", index: 3 },
  Ab: { kind: "space", index: 1 },
  Db: { kind: "line", index: 3 },
  Gb: { kind: "line", index: 1 },
  Cb: { kind: "space", index: 2 },
  Fb: { kind: "space", index: 0 },
} as const satisfies Record<string, StaffStep>;

/**
 * Clave de Fa — posiciones fijas (convención estándar de grabado).
 * @see https://www.guitarland.com/Music10/MusFund/Maj_Key_Sig/MajKeySig.html
 */
export const BASS_KEY_SIGNATURE_STEPS = {
  "F#": { kind: "line", index: 3 },
  "C#": { kind: "space", index: 1 },
  "G#": { kind: "space", index: 3 },
  "D#": { kind: "line", index: 2 },
  "A#": { kind: "space", index: 0 },
  "E#": { kind: "space", index: 2 },
  "B#": { kind: "line", index: 1 },
  Bb: { kind: "line", index: 1 },
  Eb: { kind: "space", index: 2 },
  Ab: { kind: "space", index: 0 },
  Db: { kind: "line", index: 2 },
  Gb: { kind: "line", index: 0 },
  Cb: { kind: "space", index: 1 },
  Fb: { kind: "space-below", index: 0 },
} as const satisfies Record<string, StaffStep>;

/** @deprecated Usar TREBLE_KEY_SIGNATURE_STEPS */
export const KEY_SIGNATURE_ACCIDENTAL_STEPS = TREBLE_KEY_SIGNATURE_STEPS;

/** @deprecated Usar TREBLE_KEY_SIGNATURE_STEPS */
export const TREBLE_ACCIDENTAL_STEPS = TREBLE_KEY_SIGNATURE_STEPS;

/** @deprecated Usar BASS_KEY_SIGNATURE_STEPS */
export const BASS_ACCIDENTAL_STEPS = BASS_KEY_SIGNATURE_STEPS;

export { STAFF_LINE_SPACING };
