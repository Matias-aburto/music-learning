"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isWebMidiSupported } from "../lib/midi-access";
import type { MidiAccessStatus } from "../types";

export function useMidiAccess() {
  const [status, setStatus] = useState<MidiAccessStatus>(() =>
    isWebMidiSupported() ? "idle" : "unsupported",
  );
  const accessRef = useRef<MIDIAccess | null>(null);

  const requestAccess = useCallback(async () => {
    if (!isWebMidiSupported()) {
      setStatus("unsupported");
      return null;
    }

    if (accessRef.current) {
      setStatus("granted");
      return accessRef.current;
    }

    setStatus("requesting");

    try {
      const access = await navigator.requestMIDIAccess({ sysex: false });
      accessRef.current = access;
      setStatus("granted");
      return access;
    } catch {
      setStatus("denied");
      return null;
    }
  }, []);

  useEffect(() => {
    return () => {
      accessRef.current = null;
    };
  }, []);

  return {
    status,
    access: accessRef.current,
    requestAccess,
    getAccess: () => accessRef.current,
  };
}
