interface MIDIMessageEvent extends Event {
  readonly data: Uint8Array;
}

interface MIDIPort {
  readonly id: string;
  readonly name: string | null;
  readonly manufacturer: string | null;
  readonly connection: MIDIPortConnectionState;
  readonly state: MIDIPortDeviceState;
  readonly type: MIDIPortType;
  onstatechange: ((this: MIDIPort, ev: Event) => void) | null;
  open(): Promise<MIDIPort>;
  close(): Promise<MIDIPort>;
}

interface MIDIInput extends MIDIPort {
  readonly type: "input";
  onmidimessage: ((this: MIDIInput, ev: MIDIMessageEvent) => void) | null;
}

interface MIDIOutput extends MIDIPort {
  readonly type: "output";
}

interface MIDIAccess extends EventTarget {
  readonly inputs: ReadonlyMap<string, MIDIInput>;
  readonly outputs: ReadonlyMap<string, MIDIOutput>;
  readonly sysexEnabled: boolean;
  onstatechange: ((this: MIDIAccess, ev: Event) => void) | null;
}

interface Navigator {
  requestMIDIAccess(options?: { sysex?: boolean }): Promise<MIDIAccess>;
}
