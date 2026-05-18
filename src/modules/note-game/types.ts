export const NATURAL_NOTES = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
] as const;

export const SHARP_NOTES = ["C#", "D#", "F#", "G#", "A#"] as const;

export const FLAT_NOTES = ["Db", "Eb", "Gb", "Ab", "Bb"] as const;

export const CHROMATIC_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const CHROMATIC_NOTES_WITH_FLATS = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
] as const;

export type NoteName =
  | (typeof NATURAL_NOTES)[number]
  | (typeof SHARP_NOTES)[number]
  | (typeof FLAT_NOTES)[number];

export function hasAccidental(note: NoteName) {
  return note.includes("#") || note.includes("b");
}

export type DifficultyId = "easy" | "intermediate" | "hard";

export type Difficulty = {
  id: DifficultyId;
  label: string;
  /** Barras de nivel pintadas (1–3 de 3). */
  bars: 1 | 2 | 3;
  roundDurationMs: number;
  notes: readonly NoteName[];
};

export type RoundResult = "correct" | "timeout" | "wrong" | null;

export type FailReason = "timeout" | "wrong";

export type GamePhase = "idle" | "countdown" | "playing" | "finished";
