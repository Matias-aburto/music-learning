import { cn } from "@/lib/utils";
import { SingleStaffDisplay } from "./single-staff-display";

const VIEW_WIDTH = 300;
const VIEW_HEIGHT = 200;
const TREBLE_BOTTOM_LINE_Y = 58;
const BASS_BOTTOM_LINE_Y = 148;
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
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={cn(
        "h-auto w-full max-w-[min(100%,22rem)] text-foreground",
        className,
      )}
      aria-hidden
    >
      <SingleStaffDisplay
        clef="treble"
        midiNotes={trebleNotes}
        bottomLineY={TREBLE_BOTTOM_LINE_Y}
      />
      <SingleStaffDisplay
        clef="bass"
        midiNotes={bassNotes}
        bottomLineY={BASS_BOTTOM_LINE_Y}
      />
    </svg>
  );
}
