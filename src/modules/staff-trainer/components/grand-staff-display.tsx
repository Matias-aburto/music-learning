import { cn } from "@/lib/utils";
import {
  BASS_STAFF_BOTTOM_LINE_Y,
  GRAND_STAFF_VIEW_HEIGHT,
  GRAND_STAFF_VIEW_WIDTH,
  TREBLE_STAFF_BOTTOM_LINE_Y,
} from "../lib/staff-metrics";
import { StaffSystemBarline } from "./staff-barline";
import { SingleStaffDisplay } from "./single-staff-display";

const MIDDLE_C_MIDI = 60;

type GrandStaffDisplayProps = {
  activeNotes: ReadonlySet<number> | number[];
  className?: string;
};

export function GrandStaffDisplay({
  activeNotes,
  className,
}: GrandStaffDisplayProps) {
  const notes = [...activeNotes].sort((a, b) => a - b);
  const trebleNotes = notes.filter((midi) => midi >= MIDDLE_C_MIDI);
  const bassNotes = notes.filter((midi) => midi < MIDDLE_C_MIDI);

  return (
    <svg
      viewBox={`0 0 ${GRAND_STAFF_VIEW_WIDTH} ${GRAND_STAFF_VIEW_HEIGHT}`}
      className={cn(
        "h-auto w-full max-w-[min(100%,22rem)] text-foreground",
        className,
      )}
      aria-hidden
    >
      <SingleStaffDisplay
        clef="treble"
        midiNotes={trebleNotes}
        bottomLineY={TREBLE_STAFF_BOTTOM_LINE_Y}
      />
      <SingleStaffDisplay
        clef="bass"
        midiNotes={bassNotes}
        bottomLineY={BASS_STAFF_BOTTOM_LINE_Y}
      />
      <StaffSystemBarline
        trebleBottomLineY={TREBLE_STAFF_BOTTOM_LINE_Y}
        bassBottomLineY={BASS_STAFF_BOTTOM_LINE_Y}
      />
    </svg>
  );
}
