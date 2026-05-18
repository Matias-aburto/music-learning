import type { LucideIcon } from "lucide-react";
import {
  GuitarIcon,
  HomeIcon,
  KeyRoundIcon,
  KeyboardMusicIcon,
  Music2Icon,
  PianoIcon,
  TimerIcon,
} from "lucide-react";

export type AppModule = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  enabled: boolean;
  badge?: string;
};

export const appModules: AppModule[] = [
  {
    id: "home",
    title: "Inicio",
    href: "/",
    icon: HomeIcon,
    enabled: true,
  },
  {
    id: "metronome",
    title: "Metrónomo",
    href: "/metronome",
    icon: TimerIcon,
    enabled: true,
  },
  {
    id: "chords",
    title: "Acordes",
    href: "/chords",
    icon: GuitarIcon,
    enabled: false,
    badge: "Próximamente",
  },
  {
    id: "notes",
    title: "Notas",
    href: "/notes",
    icon: PianoIcon,
    enabled: true,
  },
  {
    id: "staff",
    title: "Pentagrama",
    href: "/staff",
    icon: Music2Icon,
    enabled: true,
  },
  {
    id: "piano",
    title: "Piano",
    href: "/piano",
    icon: KeyboardMusicIcon,
    enabled: true,
  },
  {
    id: "key-signatures",
    title: "Armaduras",
    href: "/key-signatures",
    icon: KeyRoundIcon,
    enabled: true,
  },
];

export function getModuleById(id: string) {
  return appModules.find((module) => module.id === id);
}
