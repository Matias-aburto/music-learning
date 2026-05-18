import { lineY } from "../lib/staff-layout";
import {
  STAFF_BARLINE_WIDTH,
  STAFF_LINE_STROKE_WIDTH,
} from "../lib/staff-metrics";
import { STAFF_LEFT } from "./single-staff-display";

type StaffStartBarlineProps = {
  bottomLineY: number;
};

/** Línea vertical al inicio de un pentagrama simple. */
export function StaffStartBarline({ bottomLineY }: StaffStartBarlineProps) {
  return (
    <line
      x1={STAFF_LEFT}
      x2={STAFF_LEFT}
      y1={lineY(4, bottomLineY)}
      y2={lineY(0, bottomLineY)}
      stroke="currentColor"
      strokeWidth={STAFF_BARLINE_WIDTH}
      className="text-foreground/90"
    />
  );
}

type StaffSystemBarlineProps = {
  trebleBottomLineY: number;
  bassBottomLineY: number;
};

/** Línea vertical al inicio del gran pentagrama (Sol + Fa). */
export function StaffSystemBarline({
  trebleBottomLineY,
  bassBottomLineY,
}: StaffSystemBarlineProps) {
  return (
    <line
      x1={STAFF_LEFT}
      x2={STAFF_LEFT}
      y1={lineY(4, trebleBottomLineY)}
      y2={lineY(0, bassBottomLineY)}
      stroke="currentColor"
      strokeWidth={STAFF_LINE_STROKE_WIDTH}
      className="text-foreground/90"
    />
  );
}
