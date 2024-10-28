"use client";
import ProfileAPI from "@/lib/api/profileAPI";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
const api = new ProfileAPI();

const SignOutBtn = () => {
  return (
    <Button
      onClick={() => {
        api.profile.signOut();
      }}
      className="w-full"
    >
      Sign out
      <LogOut />
    </Button>
  );
};

export default SignOutBtn;
