"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMidiAccess } from "@/modules/midi/hooks/use-midi-access";
import { useMidiNoteInput } from "@/modules/midi/hooks/use-midi-note-input";
import { playMidiNote } from "@/modules/midi/lib/midi-note-synth";
import { noteMatches } from "@/modules/midi/lib/note-utils";
import {
  DIFFICULTIES,
  getDifficultyById,
  START_COUNTDOWN_SEC,
  START_COUNTDOWN_STEP_MS,
} from "../constants";
import { playCountdownBeep, playLoseSound } from "../lib/countdown-beep";
import { pickRandomNote } from "../lib/pick-random-note";
import type {
  Difficulty,
  DifficultyId,
  FailReason,
  GamePhase,
  NoteName,
  RoundResult,
} from "../types";

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type UseNoteGameOptions = {
  onWrongNote?: (midiNote: number, velocity: number) => void;
};

export function useNoteGame(options?: UseNoteGameOptions) {
  const onWrongNoteRef = useRef(options?.onWrongNote);
  onWrongNoteRef.current = options?.onWrongNote;
  const { status: midiStatus, requestAccess } = useMidiAccess();

  const [difficultyId, setDifficultyId] = useState<DifficultyId>("easy");
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [targetNote, setTargetNote] = useState<NoteName>("C");
  const [timeLeftMs, setTimeLeftMs] = useState(
    () => getDifficultyById("easy").roundDurationMs,
  );
  const [roundResult, setRoundResult] = useState<RoundResult>(null);
  const [failReason, setFailReason] = useState<FailReason | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);

  const difficulty = getDifficultyById(difficultyId);

  const targetRef = useRef(targetNote);
  const phaseRef = useRef(phase);
  const difficultyRef = useRef<Difficulty>(difficulty);
  const roundLockedRef = useRef(false);
  const countdownRunRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const roundStartRef = useRef(0);

  useEffect(() => {
    targetRef.current = targetNote;
  }, [targetNote]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const endGameRef = useRef<(reason: FailReason) => void>(() => {});

  const scheduleRoundTimer = useCallback(() => {
    const duration = difficultyRef.current.roundDurationMs;
    roundStartRef.current = performance.now();
    setTimeLeftMs(duration);

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - roundStartRef.current;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeftMs(remaining);

      if (remaining <= 0 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (phaseRef.current === "playing" && !roundLockedRef.current) {
        endGameRef.current("timeout");
      }
    }, duration);
  }, []);

  const endGame = useCallback(
    (reason: FailReason) => {
      if (phaseRef.current !== "playing" || roundLockedRef.current) return;

      roundLockedRef.current = true;
      clearTimers();
      void playLoseSound();
      setRoundResult(reason === "wrong" ? "wrong" : "timeout");
      setFailReason(reason);

      timeoutRef.current = setTimeout(() => {
        setPhase("finished");
        roundLockedRef.current = false;
      }, 700);
    },
    [clearTimers],
  );

  endGameRef.current = endGame;

  const advanceAfterCorrect = useCallback(() => {
    const { notes } = difficultyRef.current;
    const next = pickRandomNote(notes, targetRef.current);
    setTargetNote(next);
    setRoundResult(null);
    roundLockedRef.current = false;
    scheduleRoundTimer();
  }, [scheduleRoundTimer]);

  const handleCorrect = useCallback(() => {
    if (phaseRef.current !== "playing" || roundLockedRef.current) return;

    roundLockedRef.current = true;
    clearTimers();
    setRoundResult("correct");

    setScore((value) => value + 1);
    setStreak((value) => {
      const next = value + 1;
      setBestStreak((best) => Math.max(best, next));
      return next;
    });

    timeoutRef.current = setTimeout(() => {
      if (phaseRef.current !== "playing") {
        roundLockedRef.current = false;
        return;
      }
      advanceAfterCorrect();
    }, 400);
  }, [advanceAfterCorrect, clearTimers]);

  const beginPlaying = useCallback(() => {
    const { notes } = difficultyRef.current;
    setCountdownValue(null);
    setPhase("playing");
    setFailReason(null);
    roundLockedRef.current = false;

    const note = pickRandomNote(notes);
    setTargetNote(note);
    setRoundResult(null);
    scheduleRoundTimer();
  }, [scheduleRoundTimer]);

  const runStartCountdown = useCallback(
    async (access: MIDIAccess) => {
      const runId = ++countdownRunRef.current;

      setMidiAccess(access);
      setPhase("countdown");
      setScore(0);
      setStreak(0);
      setBestStreak(0);
      setFailReason(null);
      setRoundResult(null);

      for (let step = START_COUNTDOWN_SEC; step >= 1; step -= 1) {
        if (runId !== countdownRunRef.current) return;

        setCountdownValue(step);
        await playCountdownBeep(false);

        if (step > 1) {
          await sleep(START_COUNTDOWN_STEP_MS);
        }
      }

      if (runId !== countdownRunRef.current) return;

      await sleep(START_COUNTDOWN_STEP_MS);
      if (runId !== countdownRunRef.current) return;

      await playCountdownBeep(true);
      beginPlaying();
    },
    [beginPlaying],
  );

  const start = useCallback(async () => {
    const access = await requestAccess();
    if (!access) return;

    clearTimers();
    countdownRunRef.current += 1;
    void runStartCountdown(access);
  }, [clearTimers, requestAccess, runStartCountdown]);

  const resetToIdle = useCallback(() => {
    countdownRunRef.current += 1;
    clearTimers();
    roundLockedRef.current = false;
    setPhase("idle");
    setCountdownValue(null);
    setRoundResult(null);
    setFailReason(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeftMs(difficultyRef.current.roundDurationMs);
  }, [clearTimers]);

  const setDifficulty = useCallback((id: DifficultyId) => {
    if (phaseRef.current !== "idle" && phaseRef.current !== "finished") return;
    setDifficultyId(id);
    setTimeLeftMs(getDifficultyById(id).roundDurationMs);
  }, []);

  const handleNoteOn = useCallback(
    (midiNote: number, velocity: number) => {
      void playMidiNote(midiNote, velocity);

      if (phaseRef.current !== "playing" || roundLockedRef.current) return;

      if (noteMatches(midiNote, targetRef.current)) {
        handleCorrect();
      } else {
        onWrongNoteRef.current?.(midiNote, velocity);
        endGame("wrong");
      }
    },
    [endGame, handleCorrect],
  );

  useMidiNoteInput(midiAccess, phase === "playing", handleNoteOn);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const progress = 1 - timeLeftMs / difficulty.roundDurationMs;
  const isActive = phase === "countdown" || phase === "playing";

  return {
    midiStatus,
    phase,
    difficultyId,
    difficulties: DIFFICULTIES,
    difficulty,
    countdownValue,
    targetNote,
    timeLeftMs,
    progress,
    roundResult,
    failReason,
    score,
    streak,
    bestStreak,
    isActive,
    setDifficulty,
    start,
    resetToIdle,
  };
}
