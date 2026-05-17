"use client";

import {
  MinusIcon,
  MousePointerClickIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  Volume2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useMetronome } from "../hooks/use-metronome";
import { BPM_MAX, BPM_MIN } from "../types";
import { BeatIndicator } from "./beat-indicator";
import { TimeSignaturePicker } from "./time-signature-picker";

function sliderValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function MetronomePanel() {
  const {
    state,
    activeSignature,
    timeSignatures,
    setBpm,
    adjustBpm,
    setTimeSignature,
    setVolume,
    toggle,
    tapTempo,
    isTapActive,
  } = useMetronome();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 px-4">
        <p
          className="text-center font-semibold leading-none tabular-nums tracking-tight text-[clamp(5rem,22vw,12rem)]"
          aria-live="polite"
        >
          {state.bpm}
          <span className="mt-3 block text-[0.22em] font-normal text-muted-foreground">
            BPM
          </span>
        </p>

        <BeatIndicator
          beatsPerMeasure={state.beatsPerMeasure}
          currentBeat={state.currentBeat}
          isPlaying={state.isPlaying}
          size="lg"
        />
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant={state.isPlaying ? "secondary" : "default"}
            onClick={() => void toggle()}
            className="h-12 min-w-36 gap-2 text-base"
          >
            {state.isPlaying ? (
              <>
                <PauseIcon className="size-5" />
                Detener
              </>
            ) : (
              <>
                <PlayIcon className="size-5" />
                Iniciar
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant={isTapActive ? "default" : "outline"}
            onClick={tapTempo}
            className={cn(
              "h-12 gap-2 text-base transition-all duration-150",
              isTapActive &&
                "scale-[1.03] shadow-lg shadow-primary/30 ring-2 ring-primary/40",
            )}
          >
            <MousePointerClickIcon className="size-5" />
            Tap tempo
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => adjustBpm(-1)}
            aria-label="Bajar BPM"
          >
            <MinusIcon className="size-5" />
          </Button>
          <Slider
            className="flex-1"
            size="lg"
            min={BPM_MIN}
            max={BPM_MAX}
            step={1}
            value={[state.bpm]}
            onValueChange={(value) => setBpm(sliderValue(value) ?? state.bpm)}
            aria-label="BPM"
          />
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => adjustBpm(1)}
            aria-label="Subir BPM"
          >
            <PlusIcon className="size-5" />
          </Button>
        </div>

        <TimeSignaturePicker
          signatures={timeSignatures}
          value={activeSignature.id}
          onChange={setTimeSignature}
        />

        <div className="flex items-center gap-4">
          <Volume2Icon
            className="size-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <Slider
            id="volume"
            className="flex-1"
            size="lg"
            min={0}
            max={1}
            step={0.01}
            value={[state.volume]}
            onValueChange={(value) =>
              setVolume(sliderValue(value) ?? state.volume)
            }
            aria-label="Volumen"
          />
        </div>
      </div>
    </div>
  );
}
