export const siteConfig = {
  name: "Music Learning",
  description:
    "Plataforma modular para músicos: metrónomo, acordes, quizzes y más.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
