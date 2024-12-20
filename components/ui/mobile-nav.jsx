import { Home, Plus, Settings, User } from "lucide-react";
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
import Link from "next/link";
import Search from "../actions/search";
import * as storage from "@/lib/utilities/storage";

const MobileNav = () => {
  return (
    <>
      <span className="fixed top-3 right-3 z-50 mobile-nav ">
        <Search />
      </span>

      <nav className="fixed w-full p-3 bg-background mobile-nav flex bottom-0 border-t shadow-sm z-50">
        <ul className="flex  justify-center gap-5 items-center px-2  w-full">
          <li className="flex flex-col items-center text-xs">
            <Link href="/feed">
              <Home />
              <span className="text-muted-foreground sr-only">Home</span>
            </Link>
          </li>
          <Separator orientation="vertical" />

          <li className="flex flex-col items-center text-xs">
            <Link href="/profile">
              <User />
              <span className="text-muted-foreground sr-only">Profile</span>
            </Link>
          </li>
          <Separator orientation="vertical" />

          <li className="flex flex-col items-center text-xs">
            <Link href="/post/upload">
              <Plus />
              <span className="text-muted-foreground sr-only">Upload</span>
            </Link>
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
