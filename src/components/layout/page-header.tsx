import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  breadcrumbs: BreadcrumbEntry[];
};

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((entry, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <Fragment key={entry.label}>
                  {index > 0 ? (
                    <BreadcrumbSeparator className="hidden md:block" />
                  ) : null}
                  <BreadcrumbItem
                    className={index === 0 ? "hidden md:block" : undefined}
                  >
                    {isLast || !entry.href ? (
                      <BreadcrumbPage>{entry.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={entry.href}>
                        {entry.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
