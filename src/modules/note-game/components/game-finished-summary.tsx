import type { FailReason } from "../types";

const FAIL_MESSAGES = {
  timeout: "Se acabó el tiempo",
  wrong: "Nota incorrecta",
} as const;

type GameFinishedSummaryProps = {
  score: number;
  bestStreak: number;
  failReason: FailReason | null;
};

export function GameFinishedSummary({
  score,
  bestStreak,
  failReason,
}: GameFinishedSummaryProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Fin de la partida
      </p>
      <p className="text-[clamp(4rem,18vw,8rem)] font-semibold leading-none tabular-nums">
        {score}
      </p>
      <p className="text-lg text-muted-foreground">
        {score === 1 ? "acierto" : "aciertos"}
      </p>
      {failReason ? (
        <p className="text-sm text-destructive">{FAIL_MESSAGES[failReason]}</p>
      ) : null}
      {bestStreak > 1 ? (
        <p className="text-sm text-muted-foreground">
          Mejor racha: {bestStreak} seguidas
        </p>
      ) : null}
    </div>
  );
}
