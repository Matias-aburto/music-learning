"use client";

import { useCallback, useEffect, useState } from "react";

import { useNoteGame } from "@/modules/note-game/hooks/use-note-game";
import type { NoteName } from "@/modules/note-game/types";
import { midiToNoteName } from "@/modules/midi/lib/note-utils";
import type { ClefMode, StaffClef } from "../types";
import { pickMidiForNote, resolveRoundClef } from "../lib/pick-display-midi";

export function useStaffTrainer() {
  const [clefMode, setClefModeState] = useState<ClefMode>("both");
  const [displayClef, setDisplayClef] = useState<StaffClef>("treble");
  const [displayMidi, setDisplayMidi] = useState(67);
  const [playedMidi, setPlayedMidi] = useState<number | null>(null);
  const [playedNoteName, setPlayedNoteName] = useState<NoteName | null>(null);

  const clearPlayed = useCallback(() => {
    setPlayedMidi(null);
    setPlayedNoteName(null);
  }, []);

  const game = useNoteGame({
    onWrongNote: (midiNote) => {
      setPlayedMidi(midiNote);
      setPlayedNoteName(midiToNoteName(midiNote));
    },
  });

  const assignDisplay = useCallback(
    (note: NoteName, mode: ClefMode) => {
      clearPlayed();
      const clef = resolveRoundClef(mode);
      setDisplayClef(clef);
      setDisplayMidi(pickMidiForNote(note, clef));
    },
    [clearPlayed],
  );

  useEffect(() => {
    if (game.phase === "playing") {
      assignDisplay(game.targetNote, clefMode);
    }
  }, [game.targetNote, game.phase, clefMode, assignDisplay]);

  const setClefMode = useCallback(
    (mode: ClefMode) => {
      if (game.phase !== "idle" && game.phase !== "finished") return;
      setClefModeState(mode);
    },
    [game.phase],
  );

  const resetToIdle = useCallback(() => {
    clearPlayed();
    game.resetToIdle();
  }, [clearPlayed, game]);

  return {
    ...game,
    clefMode,
    setClefMode,
    displayClef,
    displayMidi,
    playedMidi,
    playedNoteName,
    resetToIdle,
  };
}
