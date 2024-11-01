import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { BsGear } from "react-icons/bs";
import DeleteBtn from "./delete-btn";

const EditPostBtn = ({ id }) => {
  return (
    <DropdownMenu className="z-50">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="absolute top-0 right-0">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-28 z-30 bg-background border rounded-md"
      >
        <DropdownMenuItem className="p-2 flex justify-between items-center">
          Edit
          <BsGear />
        </DropdownMenuItem>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditPostBtn;
