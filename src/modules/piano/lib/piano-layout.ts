/** C2 */
export const PIANO_START_MIDI = 36;
export const PIANO_OCTAVES = 5;
export const PIANO_END_MIDI = PIANO_START_MIDI + PIANO_OCTAVES * 12 - 1;
export const WHITE_KEY_WIDTH = 38;
export const WHITE_KEY_HEIGHT = 148;
export const BLACK_KEY_WIDTH = 24;
export const BLACK_KEY_HEIGHT = 92;

const OCTAVE_WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const OCTAVE_BLACK_SEMITONES = [
  { semitone: 1, afterWhiteIndex: 0 },
  { semitone: 3, afterWhiteIndex: 1 },
  { semitone: 6, afterWhiteIndex: 3 },
  { semitone: 8, afterWhiteIndex: 4 },
  { semitone: 10, afterWhiteIndex: 5 },
];

export type PianoKeyLayout = {
  midi: number;
  isBlack: boolean;
  x: number;
};

function buildLayout() {
  const keys: PianoKeyLayout[] = [];
  let whiteX = 0;

  for (let octave = 0; octave < PIANO_OCTAVES; octave += 1) {
    const root = PIANO_START_MIDI + octave * 12;

    for (const semitone of OCTAVE_WHITE_SEMITONES) {
      keys.push({ midi: root + semitone, isBlack: false, x: whiteX });
      whiteX += WHITE_KEY_WIDTH;
    }

    for (const black of OCTAVE_BLACK_SEMITONES) {
      const globalWhiteIndex =
        octave * OCTAVE_WHITE_SEMITONES.length + black.afterWhiteIndex;
      keys.push({
        midi: root + black.semitone,
        isBlack: true,
        x: (globalWhiteIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,
      });
    }
  }

  return keys;
}

export const PIANO_KEYS = buildLayout();
export const PIANO_WHITE_KEYS = PIANO_KEYS.filter((key) => !key.isBlack);
export const PIANO_BLACK_KEYS = PIANO_KEYS.filter((key) => key.isBlack);
export const PIANO_WIDTH = PIANO_WHITE_KEYS.length * WHITE_KEY_WIDTH;

export function isMidiInPianoRange(midi: number) {
  const min = PIANO_START_MIDI;
  const max = PIANO_START_MIDI + PIANO_OCTAVES * 12 - 1;
  return midi >= min && midi <= max;
}
