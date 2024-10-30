"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { set } from "date-fns";

const ModeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <div className="grid grid-cols-2 gap-2 items-center">
      <div
        className="grid text-center gap-2 cursor-pointer hover:bg-muted py-2 rounded-lg transition-colors"
        onClick={() => setTheme("light")}
      >
        <div className="aspect-[1/2] w-3/4 bg-gray-100 rounded-lg mx-auto flex flex-col items-center justify-between border shadow-md border-red-700 dark:border-border">
          <Sun className="mt-[50%] text-black" />
          <div className="grid gap-1 grid-cols-3 w-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-gray-300 w-full h-11" />
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          Light <span className="dark:hidden block"> (current)</span>
        </div>
      </div>
      <div
        className="grid text-center gap-2 cursor-pointer hover:bg-muted py-2 rounded-lg transition-colors"
        onClick={() => setTheme("dark")}
      >
        <div className="aspect-[1/2] w-3/4 bg-zinc-900 rounded-lg mx-auto flex flex-col items-center justify-between border shadow-md border-border dark:border-red-500">
          <Moon className="mt-[50%] text-white" />
          <div className="grid gap-1 grid-cols-3 w-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-zinc-950 w-full h-11" />
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          Dark <span className="dark:block hidden"> (current)</span>
        </div>
      </div>
    </div>
  );
};

export default ModeToggle;