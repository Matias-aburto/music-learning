import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appModules } from "@/config/modules";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const enabledModules = appModules.filter(
    (module) => module.enabled && module.id !== "home",
  );

  return (
    <AppShell
      breadcrumbs={[{ label: siteConfig.name, href: "/" }, { label: "Inicio" }]}
    >
      <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {enabledModules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <module.icon className="size-5" />
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ButtonLink href={module.href}>Abrir</ButtonLink>
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
              </CardHeader>
            </Card>
          ))}
      </div>
    </AppShell>
  );
}
