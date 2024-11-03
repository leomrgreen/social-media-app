"use client";

import React, { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea component
import { GrLinkNext } from "react-icons/gr";

const ProfileListModal = ({ isOpen, onClose, username, listType }) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchList = async () => {
      try {
        setIsLoading(true);
        const data = await new ProfileAPI().profile.read(username);
        const list =
          listType === "followers" ? data.data.followers : data.data.following;
        setListData(list);
      } catch (error) {
        console.error("Failed to load list data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [isOpen, username, listType]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>
            {listType === "followers" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <ScrollArea className="w-full max-h-[30rem]">
            {/* Scroll area with max height */}
            <div className="space-y-3">
              {listData.length > 0 ? (
                listData.map((user) => (
                  <div
                    key={user.name}
                    className="flex items-center justify-between gap-3 border-b py-2"
                  >
                    <a
                      href={`/user/${user.name}`}
                      className="flex items-center gap-3"
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar?.url} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>@{user.name}</span>
                    </a>
                    <a
                      href={`/user/${user.name}`}
                      className="bg-background border w-24 rounded-md font-semibold flex justify-center items-center hover:gap-3 transition-all gap-2 py-1"
                    >
                      Visit
                      <GrLinkNext className="-rotate-45" />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No users found.</p>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileListModal;
