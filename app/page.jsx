"use client";

import { useState } from "react";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center w-full max-w-[50rem] space-y-4 mx-auto">
      <h1 className="text-5xl text-start">
        Welcome to Noroff's official social media platform
      </h1>
      <h2 className="text-2xl text-muted-foreground">
        Get started by signing up
      </h2>
      {/* Button to open Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={() => setIsRegisterOpen(true)}>
            Register
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <RegisterForm />
        </DialogContent>
      </Dialog>
      <h3 className="text-muted-foreground">Already have an account?</h3>
      {/* Button to open Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsLoginOpen(true)}
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
