"use client";
import { Home, LogOut, Plus, Search, Settings, User } from "lucide-react";
import React from "react";
import * as storage from "@/lib/utilities/storage";
import { Avatar } from "./avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const MobileNav = () => {
  const loggedInUser = storage.load("user");
  console.log(loggedInUser);
  if (!loggedInUser) {
    return null;
  }

  return (
    <>
      <div className="fixed w-full top-0 z-50 bg-background/20 backdrop-blur-sm sm:hidden p-2 flex justify-between items-center px-5">
        <Avatar>
          <AvatarImage src={loggedInUser.avatar.url} />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <Search />
      </div>
      <nav className="fixed w-full p-3 bg-background/60 backdrop-blur-sm sm:hidden flex justify-around bottom-0 border shadow-sm z-50">
        <ul className="flex  items-center justify-between px-2 relative w-full">
          <span className="flex gap-3">
            <li className="flex flex-col items-center text-xs">
              <Home />
              <span className="text-muted-foreground">Home</span>
            </li>
            <li className="flex flex-col items-center text-xs">
              <User />
              <span className="text-muted-foreground">Profile</span>
            </li>
          </span>
          <li className="flex flex-col items-center text-xs plus-sign">
            <Plus />
            <span className="text-muted-foreground">Upload</span>
          </li>
          <span className="flex gap-3">
            <li className="flex flex-col items-center text-xs">
              <Settings />
              <span className="text-muted-foreground">Appearance</span>
            </li>
            <li className="flex flex-col items-center text-xs">
              <LogOut />
              <span className="text-muted-foreground">Sign out</span>
            </li>
          </span>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
