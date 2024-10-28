"use client";
import { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import { Home, Search, Settings, User } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as storage from "@/lib/utilities/storage";
import SignOutBtn from "./actions/sign-out-btn";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ModeToggle from "./theme/mode-toggle";

const loggedInUser = storage.load("user");

const items = [
  { title: "Home", url: "/feed", icon: Home },
  { title: "Profile", url: "#", icon: User },
  { title: "Search", url: "#", icon: Search },
];

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedInUser && loggedInUser.name) {
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
        <div className="flex flex-col gap-2 p-2 justify-center py-5">
          <span className="flex items-center">
            {profileData && (
              <>
                <Avatar>
                  <AvatarImage src={profileData.avatar.url} />
                  <AvatarFallback>{null}</AvatarFallback>
                </Avatar>
                <div className="grid">
                  <span>@{profileData.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {profileData.email}
                  </span>
                </div>
              </>
            )}
          </span>
        </div>
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-5 mt-2">
              <SidebarMenuButton>
                <a
                  href="/feed"
                  className="w-full flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground"
                >
                  <Home /> Home
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <a
                  href="/profile"
                  className="w-full flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground"
                >
                  <User /> Profile
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <span className="w-full flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground">
                  <Search /> Search
                </span>
              </SidebarMenuButton>
              <Dialog>
                <DialogTrigger asChild>
                  <SidebarMenuButton>
                    <span className="w-full flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground">
                      <Settings /> Appearance
                    </span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Appearance Settings</DialogTitle>
                  </DialogHeader>
                  <ModeToggle />
                </DialogContent>
              </Dialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOutBtn />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
