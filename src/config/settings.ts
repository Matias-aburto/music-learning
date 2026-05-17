import type { LucideIcon } from "lucide-react";
import { CableIcon } from "lucide-react";

export type SettingsItem = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
};

export const settingsNav: SettingsItem[] = [
  {
    id: "midi",
    title: "MIDI",
    href: "/settings/midi",
    icon: CableIcon,
  },
];

export function getSettingsItemById(id: string) {
  return settingsNav.find((item) => item.id === id);
}
