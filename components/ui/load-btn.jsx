import React from "react";
import { Button } from "./button";
import { RiLoader2Line } from "react-icons/ri";

const LoadingButton = ({ message }) => {
  return (
    <Button disabled className="w-full">
      <RiLoader2Line
        className="animate-spin
      "
      />
      {message}
    </Button>
  );
};

export default LoadingButton;
