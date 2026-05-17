"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isWebMidiSupported, listMidiDevices } from "../lib/midi-access";
import type { MidiAccessStatus, MidiDevice } from "../types";

export function useMidiDevices() {
  const [status, setStatus] = useState<MidiAccessStatus>(() =>
    isWebMidiSupported() ? "idle" : "unsupported",
  );
  const [devices, setDevices] = useState<MidiDevice[]>([]);

  const accessRef = useRef<MIDIAccess | null>(null);

  const syncDevices = useCallback((access: MIDIAccess) => {
    setDevices(listMidiDevices(access));
  }, []);

  const requestAccess = useCallback(async () => {
    if (!isWebMidiSupported()) {
      setStatus("unsupported");
      return;
    }

    setStatus("requesting");

    try {
      const access = await navigator.requestMIDIAccess({ sysex: false });
      accessRef.current = access;
      syncDevices(access);

      access.onstatechange = () => {
        syncDevices(access);
      };

      setStatus("granted");
    } catch {
      setStatus("denied");
    }
  }, [syncDevices]);

  useEffect(() => {
    return () => {
      if (accessRef.current) {
        accessRef.current.onstatechange = null;
      }
    };
  }, []);

  const inputs = devices.filter((device) => device.type === "input");
  const outputs = devices.filter((device) => device.type === "output");

  return {
    status,
    devices,
    inputs,
    outputs,
    requestAccess,
    refresh: () => {
      if (accessRef.current) {
        syncDevices(accessRef.current);
      }
    },
  };
}
