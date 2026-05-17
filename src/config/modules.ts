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
  description: string;
  enabled: boolean;
  badge?: string;
};

export const appModules: AppModule[] = [
  {
    id: "home",
    title: "Inicio",
    href: "/",
    icon: HomeIcon,
    description: "Resumen de la plataforma",
    enabled: true,
  },
  {
    id: "metronome",
    title: "Metrónomo",
    href: "/metronome",
    icon: TimerIcon,
    description: "Practica con tempo preciso",
    enabled: true,
  },
  {
    id: "chords",
    title: "Acordes",
    href: "/chords",
    icon: GuitarIcon,
    description: "Aprende formas y progresiones",
    enabled: false,
    badge: "Próximamente",
  },
  {
    id: "quiz",
    title: "Quiz",
    href: "/quiz",
    icon: HelpCircleIcon,
    description: "Pon a prueba tu teoría musical",
    enabled: false,
    badge: "Próximamente",
  },
];

export function getModuleById(id: string) {
  return appModules.find((module) => module.id === id);
}
