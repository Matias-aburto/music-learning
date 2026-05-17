export type TimeSignature = {
  id: string;
  label: string;
  beatsPerMeasure: number;
};

export const TIME_SIGNATURES: TimeSignature[] = [
  { id: "2/4", label: "2/4", beatsPerMeasure: 2 },
  { id: "3/4", label: "3/4", beatsPerMeasure: 3 },
  { id: "4/4", label: "4/4", beatsPerMeasure: 4 },
  { id: "6/8", label: "6/8", beatsPerMeasure: 6 },
];

export const BPM_MIN = 40;
export const BPM_MAX = 240;
export const BPM_DEFAULT = 120;

export type MetronomeState = {
  isPlaying: boolean;
  bpm: number;
  beatsPerMeasure: number;
  currentBeat: number;
  volume: number;
};

export type BeatCallback = (beat: number, isAccent: boolean) => void;
