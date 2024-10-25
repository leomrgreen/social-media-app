import React from "react";

const MobileNav = () => {
  return (
    <nav className="fixed w-full p-3 bg-background/60 backdrop-blur-sm sm:hidden flex justify-around bottom-0 border shadow-sm">
      <ul className="flex gap-5 items-center">
        <li>Home</li>
        <li>Profile</li>
        <li>Contact</li>
        <li>Sign Up</li>
      </ul>
    </nav>
  );
};

export default MobileNav;
