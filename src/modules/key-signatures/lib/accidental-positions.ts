import type { StaffClef } from "@/modules/staff-trainer/types";
import type { AccidentalName } from "../types";
import {
  BASS_KEY_SIGNATURE_STEPS,
  type StaffStep,
  TREBLE_KEY_SIGNATURE_STEPS,
  staffStepY,
} from "./staff-steps";

export function accidentalSymbol(name: AccidentalName) {
  return name.includes("#") ? "♯" : "♭";
}

const STEPS_BY_CLEF = {
  treble: TREBLE_KEY_SIGNATURE_STEPS,
  bass: BASS_KEY_SIGNATURE_STEPS,
} as const;

/** Sostenidos en línea del pentagrama. */
export const SHARP_LINE_NUDGE = -4;

/** Sostenidos en espacio (dentro, arriba o debajo del pentagrama). */
export const SHARP_SPACE_NUDGE = -4;

/** Bemoles en línea del pentagrama. */
export const FLAT_LINE_NUDGE = -4;

/** Bemoles en espacio (dentro, arriba o debajo del pentagrama). */
export const FLAT_SPACE_NUDGE = -4;

function isSharp(name: AccidentalName) {
  return name.includes("#");
}

function sharpNudgeForStep(step: StaffStep): number {
  if (step.kind === "line") {
    return SHARP_LINE_NUDGE;
  }

  return SHARP_SPACE_NUDGE;
}

function flatNudgeForStep(step: StaffStep): number {
  if (step.kind === "line") {
    return FLAT_LINE_NUDGE;
  }

  return FLAT_SPACE_NUDGE;
}

function nudgeForStep(name: AccidentalName, step: StaffStep): number {
  if (isSharp(name)) {
    return sharpNudgeForStep(step);
  }

  return flatNudgeForStep(step);
}

/** Altura del paso (línea o espacio) en el pentagrama. */
export function getAccidentalY(
  clef: StaffClef,
  name: AccidentalName,
  bottomLineY: number,
): number {
  return staffStepY(STEPS_BY_CLEF[clef][name], bottomLineY);
}

/** Posición Y al dibujar: centrado vertical con ajustes finos por tipo. */
export function getAccidentalTextY(
  clef: StaffClef,
  name: AccidentalName,
  bottomLineY: number,
): number {
  const step = STEPS_BY_CLEF[clef][name];
  return staffStepY(step, bottomLineY) + nudgeForStep(name, step);
}
