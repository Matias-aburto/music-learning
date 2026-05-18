"use client";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { midiToLabel } from "@/modules/midi/lib/note-utils";
import { GrandStaffDisplay } from "@/modules/staff-trainer/components/grand-staff-display";
import { PIANO_END_MIDI, PIANO_START_MIDI } from "../lib/piano-layout";
import { usePiano } from "../hooks/use-piano";
import { VirtualPiano } from "./virtual-piano";

export function PianoPanel() {
  const { midiStatus, activeLabels, activeNotes, pressNote, releaseNote } =
    usePiano();

  if (midiStatus === "unsupported") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Tu navegador no soporta MIDI. Usa Chrome o Edge para conectar tu teclado.
      </p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-4 py-4">
        <div className="flex min-h-[4.5rem] flex-col items-center justify-center text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nota
          </p>
          <p
            className={cn(
              "mt-1 text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-none tabular-nums transition-colors",
              activeLabels.length > 0
                ? "text-primary"
                : "text-muted-foreground/50",
            )}
            aria-live="polite"
          >
            {activeLabels.length > 0 ? activeLabels.join(" · ") : "—"}
          </p>
        </div>

        <GrandStaffDisplay activeNotes={activeNotes} />

        <VirtualPiano
          activeNotes={activeNotes}
          onPress={(midi) => pressNote(midi)}
          onRelease={releaseNote}
        />

        <p className="max-w-md text-center text-xs text-muted-foreground">
          Tocá el piano en pantalla o conectá tu teclado MIDI (
          {midiToLabel(PIANO_START_MIDI)}–{midiToLabel(PIANO_END_MIDI)}).
          {midiStatus === "denied" ? (
            <>
              {" "}
              <ButtonLink
                href="/settings/midi"
                variant="link"
                className="h-auto p-0 text-xs"
              >
                Configurar MIDI
              </ButtonLink>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
