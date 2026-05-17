"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MetronomeEngine } from "../lib/metronome-engine";
import {
  BPM_DEFAULT,
  BPM_MAX,
  BPM_MIN,
  TIME_SIGNATURES,
  type MetronomeState,
} from "../types";

const TAP_RESET_MS = 2000;
const TAP_SAMPLES = 4;

export function useMetronome() {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: BPM_DEFAULT,
    beatsPerMeasure: 4,
    currentBeat: 0,
    volume: 0.8,
  });

  const stateRef = useRef(state);
  const engineRef = useRef<MetronomeEngine | null>(null);
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const engine = new MetronomeEngine({
      getBpm: () => stateRef.current.bpm,
      getBeatsPerMeasure: () => stateRef.current.beatsPerMeasure,
      getVolume: () => stateRef.current.volume,
      onBeat: (beat) => {
        setState((prev) => ({ ...prev, currentBeat: beat }));
      },
    });

    engineRef.current = engine;
    return () => engine.dispose();
  }, []);

  const setBpm = useCallback((bpm: number) => {
    const clamped = Math.min(BPM_MAX, Math.max(BPM_MIN, Math.round(bpm)));
    setState((prev) => ({ ...prev, bpm: clamped }));
  }, []);

  const adjustBpm = useCallback((delta: number) => {
    setState((prev) => {
      const next = Math.min(BPM_MAX, Math.max(BPM_MIN, prev.bpm + delta));
      return { ...prev, bpm: next };
    });
  }, []);

  const setTimeSignature = useCallback((signatureId: string | null) => {
    if (!signatureId) return;
    const signature = TIME_SIGNATURES.find((item) => item.id === signatureId);
    if (!signature) return;

    setState((prev) => ({
      ...prev,
      beatsPerMeasure: signature.beatsPerMeasure,
      currentBeat: 0,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({
      ...prev,
      volume: Math.min(1, Math.max(0, volume)),
    }));
  }, []);

  const toggle = useCallback(async () => {
    const engine = engineRef.current;
    if (!engine) return;

    if (stateRef.current.isPlaying) {
      engine.stop();
      setState((prev) => ({ ...prev, isPlaying: false, currentBeat: 0 }));
      return;
    }

    await engine.start();
    setState((prev) => ({ ...prev, isPlaying: true, currentBeat: 0 }));
  }, []);

  const tapTempo = useCallback(() => {
    const now = performance.now();
    const recent = tapTimesRef.current.filter(
      (time) => now - time < TAP_RESET_MS,
    );

    recent.push(now);
    tapTimesRef.current = recent.slice(-TAP_SAMPLES);

    if (tapTimesRef.current.length < 2) return;

    const intervals: number[] = [];
    for (let i = 1; i < tapTimesRef.current.length; i += 1) {
      intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
    }

    const averageMs =
      intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
    const bpm = Math.round(60000 / averageMs);
    setBpm(bpm);
  }, [setBpm]);

  const activeSignature =
    TIME_SIGNATURES.find(
      (item) => item.beatsPerMeasure === state.beatsPerMeasure,
    ) ?? TIME_SIGNATURES[2];

  return {
    state,
    activeSignature,
    timeSignatures: TIME_SIGNATURES,
    setBpm,
    adjustBpm,
    setTimeSignature,
    setVolume,
    toggle,
    tapTempo,
  };
}
