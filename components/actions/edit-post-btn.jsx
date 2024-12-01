import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import { BsGear } from "react-icons/bs";

const EditPostBtn = ({ id }) => {
  return (
    <DropdownMenu className="z-50">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="absolute top-0 right-0">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => {
            window.location.href = `/post/edit/${id}`;
          }}
        >
          Edit
          <BsGear />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditPostBtn;
