import type { Difficulty } from "./types";
import { CHROMATIC_NOTES_WITH_FLATS, NATURAL_NOTES } from "./types";

export const START_COUNTDOWN_SEC = 3;
export const START_COUNTDOWN_STEP_MS = 1000;

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "easy",
    label: "Fácil",
    bars: 1,
    roundDurationMs: 5000,
    notes: NATURAL_NOTES,
  },
  {
    id: "intermediate",
    label: "Intermedio",
    bars: 2,
    roundDurationMs: 5000,
    notes: CHROMATIC_NOTES_WITH_FLATS,
  },
  {
    id: "hard",
    label: "Difícil",
    bars: 3,
    roundDurationMs: 3000,
    notes: CHROMATIC_NOTES_WITH_FLATS,
  },
];

export function getDifficultyById(id: string) {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) ?? DIFFICULTIES[0];
}
