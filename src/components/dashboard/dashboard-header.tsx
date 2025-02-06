"use client";

import { useMemo } from "react";
import { useDashboard } from "@/app/(dashboard)/dashboard/context/dashboardContext";
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

export function DashboardHeader() {
  const { breadcrumbs } = useDashboard();

  const breadcrumbItems = useMemo(() => {
    return breadcrumbs.map((item, index) => (
      <BreadcrumbItem
        key={item.path}
        className={index === 0 ? "hidden md:block" : undefined}
      >
        {item.isCurrentPage ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
        )}
        {index < breadcrumbs.length - 1 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
      </BreadcrumbItem>
    ));
  }, [breadcrumbs]);

  return (
    <header className="sticky border-b top-[1px] z-10 flex h-16 shrink-0 items-center gap-2 bg-background/100 backdrop-blur-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
