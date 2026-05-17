"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useMetronome } from "../hooks/use-metronome";
import { BPM_MAX, BPM_MIN } from "../types";
import { BeatIndicator } from "./beat-indicator";

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
  } = useMetronome();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Metrónomo</CardTitle>
          <CardDescription>
            Tempo preciso con Web Audio API. Ajusta BPM, compás y volumen.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-6">
            <p
              className="font-mono text-7xl font-semibold tabular-nums tracking-tight"
              aria-live="polite"
            >
              {state.bpm}
              <span className="ml-2 text-2xl font-normal text-muted-foreground">
                BPM
              </span>
            </p>

            <BeatIndicator
              beatsPerMeasure={state.beatsPerMeasure}
              currentBeat={state.currentBeat}
              isPlaying={state.isPlaying}
            />

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                size="lg"
                variant={state.isPlaying ? "secondary" : "default"}
                onClick={() => void toggle()}
                className="min-w-32"
              >
                {state.isPlaying ? "Detener" : "Iniciar"}
              </Button>
              <Button size="lg" variant="outline" onClick={tapTempo}>
                Tap tempo
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustBpm(-1)}
              aria-label="Bajar BPM"
            >
              <MinusIcon />
            </Button>
            <Slider
              className="w-full max-w-xs"
              min={BPM_MIN}
              max={BPM_MAX}
              step={1}
              value={[state.bpm]}
              onValueChange={(value) => setBpm(sliderValue(value) ?? state.bpm)}
              aria-label="BPM"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustBpm(1)}
              aria-label="Subir BPM"
            >
              <PlusIcon />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="time-signature">Compás</Label>
              <Select
                value={activeSignature.id}
                onValueChange={setTimeSignature}
              >
                <SelectTrigger id="time-signature" className="w-full">
                  <SelectValue placeholder="Compás" />
                </SelectTrigger>
                <SelectContent>
                  {timeSignatures.map((signature) => (
                    <SelectItem key={signature.id} value={signature.id}>
                      {signature.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="volume">
                Volumen{" "}
                <span className="text-muted-foreground">
                  {Math.round(state.volume * 100)}%
                </span>
              </Label>
              <Slider
                id="volume"
                min={0}
                max={1}
                step={0.01}
                value={[state.volume]}
                onValueChange={(value) =>
                  setVolume(sliderValue(value) ?? state.volume)
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[60, 80, 100, 120, 140].map((preset) => (
              <Button
                key={preset}
                variant="ghost"
                size="sm"
                onClick={() => setBpm(preset)}
              >
                {preset}
              </Button>
            ))}
            <Badge variant="secondary" className="ml-auto self-center">
              {activeSignature.label}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
