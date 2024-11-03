"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import * as storage from "@/lib/utilities/storage";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import TrendingUsers from "./ui/trending";
import Link from "next/link";

export function SidebarRight({ ...props }) {
  const [isUser, setIsUser] = React.useState(false);

  React.useEffect(() => {
    const user = storage.load("user");
    setIsUser(!!user); // Update state based on user existence

    // Optional: listen to storage changes if user logs in/out in another tab
    const handleStorageChange = () => {
      const updatedUser = storage.load("user");
      setIsUser(!!updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!isUser) return null;

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex w-[55rem] top-0 h-svh border-l"
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
              <Link href="/post/upload" className="w-full lg:flex hidden">
                Upload post
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
