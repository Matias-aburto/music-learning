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
      <SidebarInset className="min-h-svh">
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className="flex min-h-0 flex-1 flex-col p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
