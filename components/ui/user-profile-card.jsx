"use client";

import React, { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FollowBtn from "../actions/follow-btn";
import { Skeleton } from "./skeleton";
import * as storage from "@/lib/utilities/storage";
import EditBtn from "../actions/edit.btn";
import ProfileListModal from "./profile-list";

const UserProfileCard = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUser = storage.load("user");
  const loggedInUserName = loggedInUser?.name;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("followers");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await new ProfileAPI().profile.read(username);
        setProfileData(data.data);
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleFollowChange = (delta) => {
    // Update follower count based on the delta (+1 or -1)
    setProfileData((prev) => ({
      ...prev,
      followers:
        delta > 0
          ? [...prev.followers, { name: loggedInUserName }]
          : prev.followers.filter(
              (follower) => follower.name !== loggedInUserName
            ),
    }));
  };

  if (isLoading) return <Skeleton className="w-3/4 h-[12rem] mx-auto" />;

  return (
    <>
      <Card className="w-full max-w-[35rem] mx-auto border grid">
        <CardHeader className="flex flex-col sm:flex-row justify-around mx-auto items-center gap-5 w-full">
          <span className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src={profileData.avatar.url} />
              <AvatarFallback>{profileData.name[0]}</AvatarFallback>
            </Avatar>
            <span>@{profileData.name}</span>
          </span>

          <span className="flex flex-col gap-2">
            <div className="flex gap-3 text-muted-foreground">
              <p className="text-nowrap text-sm">
                {profileData._count.posts} Posts
              </p>
              <button
                onClick={() => openModal("followers")}
                className="text-nowrap text-sm"
              >
                {profileData.followers.length} Followers
              </button>
              <button
                onClick={() => openModal("following")}
                className="text-nowrap text-sm"
              >
                {profileData.following.length} Following
              </button>
            </div>
            {loggedInUserName === profileData.name ? (
              <EditBtn />
            ) : (
              <FollowBtn
                profile={profileData}
                onFollowChange={handleFollowChange}
              />
            )}
          </span>
        </CardHeader>
        <CardContent className="flex text-muted-foreground">
          {profileData.bio}
        </CardContent>
      </Card>

      <ProfileListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={username}
        listType={modalType}
      />
    </>
  );
};

export default UserProfileCard;
