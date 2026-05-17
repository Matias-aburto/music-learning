import type { Metadata } from "next";

import { MidiDevicesPanel } from "@/modules/midi/components/midi-devices-panel";

export const metadata: Metadata = {
  title: "MIDI",
};

export default function MidiSettingsPage() {
  return <MidiDevicesPanel />;
}
