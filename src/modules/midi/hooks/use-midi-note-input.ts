"use client";

import { useEffect, useRef } from "react";

import { parseNoteOn } from "../lib/note-utils";

type NoteOnHandler = (midiNote: number, velocity: number) => void;

export function useMidiNoteInput(
  access: MIDIAccess | null,
  enabled: boolean,
  onNoteOn: NoteOnHandler,
) {
  const handlerRef = useRef(onNoteOn);
  handlerRef.current = onNoteOn;

  useEffect(() => {
    if (!access || !enabled) return;

    const listeners = new Map<string, (event: MIDIMessageEvent) => void>();

    const attach = (input: MIDIInput) => {
      const listener = (event: MIDIMessageEvent) => {
        if (!event.data) return;
        const parsed = parseNoteOn(event.data);
        if (parsed) {
          handlerRef.current(parsed.note, parsed.velocity);
        }
      };
      input.onmidimessage = listener;
      listeners.set(input.id, listener);
    };

    access.inputs.forEach(attach);

    const onStateChange = () => {
      access.inputs.forEach((input) => {
        if (!listeners.has(input.id)) {
          attach(input);
        }
      });
    };

    access.onstatechange = onStateChange;

    return () => {
      access.onstatechange = null;
      access.inputs.forEach((input) => {
        input.onmidimessage = null;
      });
      listeners.clear();
    };
  }, [access, enabled]);
}
