import type { ClefMode } from "./types";

export const CLEF_MODES: { id: ClefMode; label: string }[] = [
  { id: "treble", label: "Llave de Sol" },
  { id: "bass", label: "Llave de Fa" },
  { id: "both", label: "Ambas" },
];

export const CLEF_MIDI_RANGES = {
  treble: { min: 55, max: 79 },
  bass: { min: 40, max: 64 },
} as const;
