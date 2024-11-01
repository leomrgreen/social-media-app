"use client";
import { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import { Home, Plus, Search, Settings, User } from "lucide-react";
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
import { Skeleton } from "./ui/skeleton";

const loggedInUser = storage.load("user");

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedInUser && loggedInUser.name) {
        setIsLoggedIn(true);
        try {
          const data = await new ProfileAPI().profile.read(loggedInUser.name);
          setProfileData(data.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load profile data", error);
          setIsLoading(false);
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
            {isLoading ? (
              <div className="flex items-center justify-between">
                <Skeleton className="w-[3.2rem] h-[3.2rem] rounded-full  items-center" />
                <div className="flex flex-col gap-2 justify-center">
                  <Skeleton className="w-[10rem] h-3 rounded-md" />
                  <Skeleton className="w-[8rem] h-3 rounded-md" />
                </div>
              </div>
            ) : (
              profileData && (
                <>
                  <Avatar>
                    <AvatarImage src={profileData.avatar.url} />
                    <AvatarFallback>
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span>@{profileData.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {profileData.email}
                    </span>
                  </div>
                </>
              )
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
                    <DialogTitle>Theme settings</DialogTitle>
                  </DialogHeader>
                  <ModeToggle />
                </DialogContent>
              </Dialog>
              <SidebarMenuButton className="lg:hidden">
                <a
                  href="/post/upload"
                  className="lg:hidden w-full flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground"
                >
                  <Plus /> Upload post
                </a>
              </SidebarMenuButton>
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
