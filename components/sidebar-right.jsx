import * as React from "react";
import { Plus } from "lucide-react";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
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

// This is sample data.
const data = {
  user: {
    name: "user",
    email: "m@example.com",
    avatar: "/placeholder.png",
  },
  users: {
    name: "alvarez",
    email: "test@gmail.com",
    avatar: "/placeholder.png",
  },
};

const users = [
  {
    name: "alvarez",
    email: "test@gmail.com",
    avatar: "/placeholder.png",
  },
  {
    name: "alvarez",
    email: "test@gmail.com",
    avatar: "/placeholder.png",
  },
  {
    name: "alvarez",
    email: "test@gmail.com",
    avatar: "/placeholder.png",
  },
];

export function SidebarRight({ ...props }) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex w-[25rem] top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center">
        Popular users
      </SidebarHeader>

      <SidebarContent>
        <div className="flex flex-wrap gap-3 px-2">
          {users.map((user, idx) => {
            return (
              <li key={idx} className="flex flex-col items-center">
                <span>@{user.name}</span>
                <span className="text-sm">{user.email}</span>
              </li>
            );
          })}
        </div>
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
