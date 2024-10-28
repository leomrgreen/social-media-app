"use client";
import * as React from "react";
import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import TrendingUsers from "./ui/trending";

export function SidebarRight({ ...props }) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex lg:w-[25rem] w-[40%] top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center  justify-center text-2xl">
        Popular users
      </SidebarHeader>

      <SidebarContent>
        <TrendingUsers />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>Upload Post</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
