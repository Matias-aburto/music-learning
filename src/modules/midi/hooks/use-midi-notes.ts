"use client";

import { useEffect, useRef } from "react";

import { parseMidiMessage } from "../lib/note-utils";

type MidiNoteHandlers = {
  onNoteOn: (midiNote: number, velocity: number) => void;
  onNoteOff: (midiNote: number) => void;
};

export function useMidiNotes(
  access: MIDIAccess | null,
  enabled: boolean,
  handlers: MidiNoteHandlers,
) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!access || !enabled) return;

    const listeners = new Map<string, (event: MIDIMessageEvent) => void>();

    const attach = (input: MIDIInput) => {
      const listener = (event: MIDIMessageEvent) => {
        if (!event.data) return;
        const parsed = parseMidiMessage(event.data);
        if (!parsed) return;

        if (parsed.type === "on") {
          handlersRef.current.onNoteOn(parsed.note, parsed.velocity);
        } else {
          handlersRef.current.onNoteOff(parsed.note);
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
