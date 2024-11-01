import { Home, LogOut, Plus, Search, Settings, User } from "lucide-react";
import React from "react";
import { Separator } from "./separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import ModeToggle from "../theme/mode-toggle";
import SignOutBtn from "../actions/sign-out-btn";

const MobileNav = () => {
  return (
    <>
      <div className="fixed w-full top-0 z-50  sm:hidden p-2 flex justify-end items-center px-5">
        <Search />
      </div>
      <nav className="fixed w-full p-3 bg-background sm:hidden flex bottom-0 border shadow-sm z-50">
        <ul className="flex  justify-center gap-5 items-center px-2  w-full">
          <li className="flex flex-col items-center text-xs">
            <a href="/feed">
              <Home />
              <span className="text-muted-foreground sr-only">Home</span>
            </a>
          </li>
          <Separator orientation="vertical" />

          <li className="flex flex-col items-center text-xs">
            <a href="/profile">
              <User />
              <span className="text-muted-foreground sr-only">Profile</span>
            </a>
          </li>
          <Separator orientation="vertical" />

          <li className="flex flex-col items-center text-xs">
            <a href="/post/upload">
              <Plus />
              <span className="text-muted-foreground sr-only">Upload</span>
            </a>
          </li>
          <Separator orientation="vertical" />

          <Dialog>
            <DialogTrigger asChild>
              <li className="flex flex-col items-center text-xs">
                <Settings />
                <span className="text-muted-foreground sr-only">
                  Appearance
                </span>
              </li>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Theme settings</DialogTitle>
              </DialogHeader>
              <ModeToggle />
            </DialogContent>
          </Dialog>
          <Separator orientation="vertical" />

          <li className="flex flex-col items-center text-xs">
            <SignOutBtn />
            <span className="text-muted-foreground sr-only">Sign out</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
