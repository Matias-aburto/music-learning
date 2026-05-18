"use client";

import { cn } from "@/lib/utils";
import { StaffSystemBarline } from "@/modules/staff-trainer/components/staff-barline";
import {
  KEY_SIGNATURE_ACCIDENTAL_X_START,
  MUSIC_CLEF_FONT,
  SingleStaffDisplay,
} from "@/modules/staff-trainer/components/single-staff-display";
import {
  BASS_STAFF_BOTTOM_LINE_Y,
  TREBLE_STAFF_BOTTOM_LINE_Y,
} from "@/modules/staff-trainer/lib/staff-metrics";
import {
  accidentalSymbol,
  getAccidentalTextY,
} from "../lib/accidental-positions";
import type { AccidentalName } from "../types";

const VIEW_WIDTH = 440;
const VIEW_HEIGHT = 300;
const ACCIDENTAL_X_GAP = 8;
const STAFF_SCALE = 1.45;
const STAFF_ORIGIN_X = 20;
const STAFF_ORIGIN_Y = 10;
const ACCIDENTAL_FONT_SIZE = 30;

type KeySignatureStaffProps = {
  accidentals: readonly AccidentalName[];
  className?: string;
};

export function KeySignatureStaff({
  accidentals,
  className,
}: KeySignatureStaffProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={cn(
        "mx-auto h-auto w-full max-w-[32rem] text-foreground",
        className,
      )}
      aria-hidden
    >
      <g
        transform={`translate(${STAFF_ORIGIN_X} ${STAFF_ORIGIN_Y}) scale(${STAFF_SCALE})`}
      >
        <SingleStaffDisplay
          clef="treble"
          midiNotes={[]}
          bottomLineY={TREBLE_STAFF_BOTTOM_LINE_Y}
        />
        <SingleStaffDisplay
          clef="bass"
          midiNotes={[]}
          bottomLineY={BASS_STAFF_BOTTOM_LINE_Y}
        />

        <StaffSystemBarline
          trebleBottomLineY={TREBLE_STAFF_BOTTOM_LINE_Y}
          bassBottomLineY={BASS_STAFF_BOTTOM_LINE_Y}
        />

        {accidentals.map((name, index) => {
          const x =
            KEY_SIGNATURE_ACCIDENTAL_X_START + index * ACCIDENTAL_X_GAP;
          const symbol = accidentalSymbol(name);
          const trebleY = getAccidentalTextY(
            "treble",
            name,
            TREBLE_STAFF_BOTTOM_LINE_Y,
          );
          const bassY = getAccidentalTextY(
            "bass",
            name,
            BASS_STAFF_BOTTOM_LINE_Y,
          );

          return (
            <g key={`${name}-${index}`}>
              <text
                x={x}
                y={trebleY}
                dominantBaseline="middle"
                fontSize={ACCIDENTAL_FONT_SIZE}
                fontFamily={MUSIC_CLEF_FONT}
                className="fill-foreground"
              >
                {symbol}
              </text>
              <text
                x={x}
                y={bassY}
                dominantBaseline="middle"
                fontSize={ACCIDENTAL_FONT_SIZE}
                fontFamily={MUSIC_CLEF_FONT}
                className="fill-foreground"
              >
                {symbol}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
