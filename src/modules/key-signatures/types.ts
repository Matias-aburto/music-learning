export type SharpAccidental = "F#" | "C#" | "G#" | "D#" | "A#" | "E#" | "B#";

export type FlatAccidental = "Bb" | "Eb" | "Ab" | "Db" | "Gb" | "Cb" | "Fb";

export type AccidentalName = SharpAccidental | FlatAccidental;

export type KeySignatureKind = "sharp" | "flat";

export type KeySignatureEntry = {
  majorKey: string;
  minorKey: string;
  accidentals: readonly AccidentalName[];
};
