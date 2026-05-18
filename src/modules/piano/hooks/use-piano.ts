"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMidiAccess } from "@/modules/midi/hooks/use-midi-access";
import { useMidiNotes } from "@/modules/midi/hooks/use-midi-notes";
import { midiToLabel } from "@/modules/midi/lib/note-utils";
import { startPianoNote, stopAllPianoNotes, stopPianoNote } from "../lib/piano-engine";
import { isMidiInPianoRange } from "../lib/piano-layout";

export function usePiano() {
  const { status: midiStatus, requestAccess } = useMidiAccess();
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
  const [activeNotes, setActiveNotes] = useState<ReadonlySet<number>>(() => new Set());
  const activeNotesRef = useRef(activeNotes);

  useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

  const pressNote = useCallback((midiNote: number, velocity = 100) => {
    void startPianoNote(midiNote, velocity);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.add(midiNote);
      return next;
    });
  }, []);

  const releaseNote = useCallback((midiNote: number) => {
    stopPianoNote(midiNote);
    setActiveNotes((prev) => {
      if (!prev.has(midiNote)) return prev;
      const next = new Set(prev);
      next.delete(midiNote);
      return next;
    });
  }, []);

  const handleNoteOn = useCallback(
    (midiNote: number, velocity: number) => {
      if (!isMidiInPianoRange(midiNote)) return;
      pressNote(midiNote, velocity);
    },
    [pressNote],
  );

  const handleNoteOff = useCallback(
    (midiNote: number) => {
      releaseNote(midiNote);
    },
    [releaseNote],
  );

  useMidiNotes(midiAccess, Boolean(midiAccess), {
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
  });

  useEffect(() => {
    void requestAccess().then((access) => {
      if (access) setMidiAccess(access);
    });
  }, [requestAccess]);

  useEffect(() => {
    return () => {
      stopAllPianoNotes();
    };
  }, []);

  const activeLabels = [...activeNotes]
    .sort((a, b) => a - b)
    .map((midi) => midiToLabel(midi));

  return {
    midiStatus,
    activeNotes,
    activeLabels,
    pressNote,
    releaseNote,
  };
}
