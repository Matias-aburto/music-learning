import type { LucideIcon } from "lucide-react";
import {
  GuitarIcon,
  HelpCircleIcon,
  HomeIcon,
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
    id: "quiz",
    title: "Quiz",
    href: "/quiz",
    icon: HelpCircleIcon,
    enabled: false,
    badge: "Próximamente",
  },
];

export function getModuleById(id: string) {
  return appModules.find((module) => module.id === id);
}
