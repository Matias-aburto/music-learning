import { AppSidebar } from "@/components/app-sidebar";
import {
  PageHeader,
  type BreadcrumbEntry,
} from "@/components/layout/page-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type AppShellProps = {
  breadcrumbs: BreadcrumbEntry[];
  children: React.ReactNode;
};

export function AppShell({ breadcrumbs, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
