import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMinorKey } from "../lib/format-key";
import type { KeySignatureEntry, KeySignatureKind } from "../types";
import { KeySignatureStaff } from "./key-signature-staff";

type KeySignatureCardProps = {
  entry: KeySignatureEntry;
  kind: KeySignatureKind;
};

function formatAccidentalList(
  accidentals: readonly string[],
  kind: KeySignatureKind,
) {
  if (accidentals.length === 0) {
    return kind === "sharp" ? "Sin sostenidos" : "Sin bemoles";
  }
  return accidentals.join(", ");
}

export function KeySignatureCard({ entry, kind }: KeySignatureCardProps) {
  const accidentalLabel = kind === "sharp" ? "Sostenidos" : "Bemoles";
  const minorLabel = formatMinorKey(entry.minorKey);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 pb-3 pt-6">
        <CardTitle className="text-center text-lg font-semibold">
          {entry.majorKey} mayor / {minorLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-6 pb-8">
        <KeySignatureStaff accidentals={entry.accidentals} />

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-base">
          <div>
            <dt className="text-sm text-muted-foreground">Tonalidad mayor</dt>
            <dd className="font-medium">{entry.majorKey}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Tonalidad menor</dt>
            <dd className="font-medium">{minorLabel}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm text-muted-foreground">{accidentalLabel}</dt>
            <dd className="font-medium tabular-nums">
              {formatAccidentalList(entry.accidentals, kind)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
