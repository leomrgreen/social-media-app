"use client";
import { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as storage from "@/lib/utilities/storage";
import SignOutBtn from "./actions/sign-out-btn";
import Link from "next/link";
import { Button } from "./ui/button";

const loggedInUser = storage.load("user");

const items = [
  { title: "Home", url: "/feed", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedInUser && loggedInUser.name) {
        // Check if loggedInUser exists and has a name
        setIsLoggedIn(true);
        try {
          const data = await new ProfileAPI().profile.read(loggedInUser.name);
          setProfileData(data.data);
        } catch (error) {
          console.error("Failed to load profile data", error);
        }
      }
    };
    fetchProfile();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <img src="/noroff-logo.png" alt="noroff logo" className="w-16 h-16" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-muted-foreground">
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto flex gap-3">
                  {profileData && (
                    <>
                      <Avatar>
                        <AvatarImage src={profileData.avatar.url} />
                        <AvatarFallback>{null}</AvatarFallback>
                      </Avatar>
                      <span>@{profileData.name}</span>
                    </>
                  )}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Button className="w-full">
                    <Link
                      href="/profile"
                      className="w-full flex justify-center gap-2"
                    >
                      Account
                      <User />
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
