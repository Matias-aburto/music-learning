import type { MidiDevice } from "../types";

function mapPort(port: MIDIPort, type: MidiDevice["type"]): MidiDevice {
  return {
    id: port.id,
    name: port.name?.trim() || "Dispositivo sin nombre",
    manufacturer: port.manufacturer?.trim() || "—",
    type,
    connection: port.connection,
    state: port.state,
  };
}

export function listMidiDevices(access: MIDIAccess): MidiDevice[] {
  const devices: MidiDevice[] = [];

  access.inputs.forEach((input) => {
    devices.push(mapPort(input, "input"));
  });

  access.outputs.forEach((output) => {
    devices.push(mapPort(output, "output"));
  });

  return devices.sort((a, b) => a.name.localeCompare(b.name));
}

export function isWebMidiSupported() {
  return typeof navigator !== "undefined" && "requestMIDIAccess" in navigator;
}
