"use client";

import { createContext, useContext, useMemo } from "react";
import { useBreadcrumb } from "@/lib/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

interface DashboardContextType {
  breadcrumbs: ReturnType<typeof useBreadcrumb>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const breadcrumbs = useBreadcrumb();
  const value = useMemo(() => ({ breadcrumbs }), [breadcrumbs]);

  return (
    <DashboardContext.Provider value={value}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
