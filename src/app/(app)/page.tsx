import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appModules } from "@/config/modules";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const enabledModules = appModules.filter((module) => module.enabled && module.id !== "home");

  return (
    <AppShell
      breadcrumbs={[{ label: siteConfig.name, href: "/" }, { label: "Inicio" }]}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Bienvenido a {siteConfig.name}
          </h1>
          <p className="text-muted-foreground">{siteConfig.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {enabledModules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <module.icon className="size-5" />
                  {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button render={<Link href={module.href} />}>Abrir</Button>
              </CardContent>
            </Card>
          ))}

          {appModules
            .filter((module) => !module.enabled && module.id !== "home")
            .map((module) => (
              <Card key={module.id} className="opacity-70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <module.icon className="size-5" />
                    {module.title}
                    {module.badge ? (
                      <Badge variant="outline">{module.badge}</Badge>
                    ) : null}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </AppShell>
  );
}
