export type MidiDeviceType = "input" | "output";

export type MidiAccessStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported";

export type MidiDevice = {
  id: string;
  name: string;
  manufacturer: string;
  type: MidiDeviceType;
  connection: MIDIPortConnectionState;
  state: MIDIPortDeviceState;
};
