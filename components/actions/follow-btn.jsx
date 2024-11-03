"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProfileAPI from "@/lib/api/profileAPI";
import * as storage from "@/lib/utilities/storage";

const FollowBtn = ({ profile, onFollowChange }) => {
  const api = new ProfileAPI();
  const loggedInUser = storage.load("user");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followersList = profile.followers || [];
    const followingStatus = followersList.some(
      (follower) => follower.name === loggedInUser?.name
    );
    setIsFollowing(followingStatus);
  }, [profile, loggedInUser?.name]);

  if (profile.name === loggedInUser?.name) {
    return null; // Don't render button for the logged-in user
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.profile.unfollow(profile.name);
        onFollowChange(-1); // Decrement follower count
      } else {
        await api.profile.follow(profile.name);
        onFollowChange(1); // Increment follower count
      }
      setIsFollowing(!isFollowing); // Toggle following state
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Button
      className={isFollowing ? "" : "bg-primary text-primary-foreground"}
      variant="outline"
      onClick={handleFollowToggle}
    >
      {isFollowing ? "Following" : "Follow +"}
    </Button>
  );
};

export default FollowBtn;
