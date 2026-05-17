import { noteNameToPitchClass } from "@/modules/midi/lib/note-utils";
import type { NoteName } from "@/modules/note-game/types";
import { CLEF_MIDI_RANGES } from "../constants";
import type { ClefMode, StaffClef } from "../types";

export function resolveRoundClef(mode: ClefMode): StaffClef {
  if (mode === "both") {
    return Math.random() < 0.5 ? "treble" : "bass";
  }
  return mode;
}

export function pickMidiForNote(note: NoteName, clef: StaffClef): number {
  const pitchClass = noteNameToPitchClass(note);
  const { min, max } = CLEF_MIDI_RANGES[clef];
  const candidates: number[] = [];

  for (let midi = min; midi <= max; midi++) {
    if (midi % 12 === pitchClass) {
      candidates.push(midi);
    }
  }

  if (candidates.length === 0) {
    for (let midi = 36; midi <= 84; midi++) {
      if (midi % 12 === pitchClass) {
        candidates.push(midi);
      }
    }
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  const preferred = preferredMidiForClef(note, clef);
  if (candidates.includes(preferred)) {
    return preferred;
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index] ?? preferred;
}

/** Octava típica de lectura para cada clave (p. ej. C4 en Sol, C3 en Fa). */
function preferredMidiForClef(note: NoteName, clef: StaffClef): number {
  const pitchClass = noteNameToPitchClass(note);
  const octave = clef === "treble" ? 4 : 3;
  return (octave + 1) * 12 + pitchClass;
}
