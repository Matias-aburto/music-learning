"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MetronomeEngine } from "../lib/metronome-engine";
import {
  BPM_DEFAULT,
  BPM_MAX,
  BPM_MIN,
  BPM_STEP,
  TIME_SIGNATURES,
  VOLUME_STEP,
  type MetronomeState,
} from "../types";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

const TAP_RESET_MS = 2000;
const TAP_SAMPLES = 4;
const TAP_FLASH_MS = 160;

export function useMetronome() {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: BPM_DEFAULT,
    beatsPerMeasure: 4,
    currentBeat: 0,
    volume: 0.8,
  });

  const [isTapActive, setIsTapActive] = useState(false);

  const stateRef = useRef(state);
  const engineRef = useRef<MetronomeEngine | null>(null);
  const tapTimesRef = useRef<number[]>([]);
  const tapFlashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const adjustVolume = useCallback((delta: number) => {
    setState((prev) => {
      const percent = Math.round(prev.volume * 100);
      const next = Math.min(100, Math.max(0, percent + delta));
      const snapped = Math.round(next / (VOLUME_STEP * 100)) * (VOLUME_STEP * 100);
      return { ...prev, volume: snapped / 100 };
    });
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

  const triggerTapFlash = useCallback(() => {
    setIsTapActive(true);
    if (tapFlashTimeoutRef.current) {
      clearTimeout(tapFlashTimeoutRef.current);
    }
    tapFlashTimeoutRef.current = setTimeout(() => {
      setIsTapActive(false);
      tapFlashTimeoutRef.current = null;
    }, TAP_FLASH_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (tapFlashTimeoutRef.current) {
        clearTimeout(tapFlashTimeoutRef.current);
      }
    };
  }, []);

  const tapTempo = useCallback(() => {
    triggerTapFlash();

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
  }, [setBpm, triggerTapFlash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          adjustVolume(VOLUME_STEP * 100);
          break;
        case "ArrowDown":
          event.preventDefault();
          adjustVolume(-(VOLUME_STEP * 100));
          break;
        case "ArrowRight":
          event.preventDefault();
          adjustBpm(BPM_STEP);
          break;
        case "ArrowLeft":
          event.preventDefault();
          adjustBpm(-BPM_STEP);
          break;
        case "t":
        case "T":
          if (event.repeat) break;
          event.preventDefault();
          tapTempo();
          break;
        case " ":
          if (event.repeat) break;
          event.preventDefault();
          event.stopPropagation();
          void toggle();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [adjustBpm, adjustVolume, tapTempo, toggle]);

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
    isTapActive,
  };
}
