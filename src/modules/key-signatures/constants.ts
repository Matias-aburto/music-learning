import type { KeySignatureEntry } from "./types";

/** Orden estándar de sostenidos. */
export const SHARP_ORDER = [
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
  "E#",
  "B#",
] as const;

/** Orden estándar de bemoles. */
export const FLAT_ORDER = [
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
  "Fb",
] as const;

export const SHARP_KEY_SIGNATURES: KeySignatureEntry[] = [
  { majorKey: "C", minorKey: "a", accidentals: [] },
  { majorKey: "G", minorKey: "e", accidentals: ["F#"] },
  { majorKey: "D", minorKey: "b", accidentals: ["F#", "C#"] },
  { majorKey: "A", minorKey: "f#", accidentals: ["F#", "C#", "G#"] },
  { majorKey: "E", minorKey: "c#", accidentals: ["F#", "C#", "G#", "D#"] },
  {
    majorKey: "B",
    minorKey: "g#",
    accidentals: ["F#", "C#", "G#", "D#", "A#"],
  },
  {
    majorKey: "F#",
    minorKey: "d#",
    accidentals: ["F#", "C#", "G#", "D#", "A#", "E#"],
  },
  {
    majorKey: "C#",
    minorKey: "a#",
    accidentals: ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],
  },
];

export const FLAT_KEY_SIGNATURES: KeySignatureEntry[] = [
  { majorKey: "C", minorKey: "a", accidentals: [] },
  { majorKey: "F", minorKey: "d", accidentals: ["Bb"] },
  { majorKey: "Bb", minorKey: "g", accidentals: ["Bb", "Eb"] },
  { majorKey: "Eb", minorKey: "c", accidentals: ["Bb", "Eb", "Ab"] },
  { majorKey: "Ab", minorKey: "f", accidentals: ["Bb", "Eb", "Ab", "Db"] },
  {
    majorKey: "Db",
    minorKey: "bb",
    accidentals: ["Bb", "Eb", "Ab", "Db", "Gb"],
  },
  {
    majorKey: "Gb",
    minorKey: "eb",
    accidentals: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
  },
  {
    majorKey: "Cb",
    minorKey: "ab",
    accidentals: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"],
  },
];
