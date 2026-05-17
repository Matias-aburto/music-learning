import { noteNameToPitchClass } from "@/modules/midi/lib/note-utils";
import type { NoteName } from "../types";

export function pickRandomNote(
  pool: readonly NoteName[],
  exclude?: NoteName,
): NoteName {
  const excludePitchClass =
    exclude === undefined ? undefined : noteNameToPitchClass(exclude);

  const available =
    excludePitchClass === undefined
      ? pool
      : pool.filter(
          (note) => noteNameToPitchClass(note) !== excludePitchClass,
        );

  const index = Math.floor(Math.random() * available.length);
  return available[index] ?? pool[0];
}
