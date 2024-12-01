import React, { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import FollowBtn from "../actions/follow-btn";
import { Skeleton } from "@/components/ui/skeleton";
import * as storage from "@/lib/utilities/storage";

const ProfileListModal = ({ isOpen, onClose, username, listType }) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Initialize as false
  const loggedInUserName = storage.load("user")?.name;
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserProfile = async () => {
      const data = await new ProfileAPI().profile.read(loggedInUserName);
      setLoggedInUserProfile(data.data);
    };

    if (isOpen) {
      fetchLoggedInUserProfile();
    }
  }, [isOpen, loggedInUserName]);

  useEffect(() => {
    if (!isOpen) {
      setListData([]); // Clear data when modal is closed
      setIsLoading(false); // Reset loading state
      return;
    }

    const fetchList = async () => {
      try {
        setIsLoading(true); // Set loading to true when fetching starts
        const data = await new ProfileAPI().profile.read(username);
        const list =
          listType === "followers" ? data.data.followers : data.data.following;
        setListData(list);
      } catch (error) {
        console.error("Failed to load list data", error);
      } finally {
        setIsLoading(false); // Reset loading state after fetch
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

        <ScrollArea className="w-full max-h-[30rem]">
          <div className="space-y-3">
            {isLoading ? (
              // Show loading skeleton only if the dialog is open and loading
              <Skeleton className="w-full h-10" />
            ) : listData.length > 0 ? (
              listData.map((user) => {
                const isFollowing = loggedInUserProfile?.following?.some(
                  (followedUser) => followedUser.name === user.name
                );

                return (
                  <div
                    key={user.name} // Ensure this key is unique
                    className="flex items-center justify-between gap-3 border-b py-2"
                  >
                    <Link
                      href={`/user/${user.name}`}
                      className="flex items-center gap-3"
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar?.url} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>@{user.name}</span>
                    </Link>
                    {loggedInUserProfile && (
                      <FollowBtn
                        profile={user}
                        onFollowChange={() => {}}
                        isFollowing={isFollowing} // Pass the isFollowing state here
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileListModal;
