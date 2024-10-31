"use client";

import React, { useEffect, useState } from "react";
import ProfileAPI from "@/lib/api/profileAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FollowBtn from "../actions/follow-btn";
import { Skeleton } from "./skeleton";

const UserProfileCard = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Skeleton className="w-3/4 h-[12rem] mx-auto" />;

  return (
    <Card className="w-full max-w-[35rem] mx-auto  border grid">
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
            <p className="text-nowrap text-sm">
              {profileData.followers.length} Followers
            </p>
            <p className="text-nowrap text-sm">
              {profileData.following.length} Following
            </p>
          </div>
          <FollowBtn profile={profileData} />
        </span>
      </CardHeader>
      <CardContent className="flex justify-center">
        {profileData.bio}
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
