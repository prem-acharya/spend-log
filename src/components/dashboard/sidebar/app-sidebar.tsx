"use client";

import * as React from "react";
import {
  BookMarked,
  IndianRupee,
  Settings2,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthProvider";
import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMemo } from "react";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Spend",
    url: "#",
    icon: IndianRupee,
  },
  {
    title: "Reports",
    url: "#",
    icon: BookMarked,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
  },
];

const teams = [
  {
    name: "Spend Log",
    logo: IndianRupee,
    plan: "Track. Learn. Grow.",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userData = useMemo(
    () => ({
      name: user?.name ?? "Guest",
      email: user?.email ?? "guest@example.com",
      avatar: "/avatars/default.jpg",
    }),
    [user?.name, user?.email]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
