"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProfileAPI from "@/lib/api/profileAPI";
import * as storage from "@/lib/utilities/storage";

const FollowBtn = ({ profile, onFollowChange, isFollowing }) => {
  const api = new ProfileAPI();
  const loggedInUser = storage.load("user");
  const [isFollowingState, setIsFollowingState] = useState(false);

  // Determine following status based on prop or internal logic
  useEffect(() => {
    const followersList = profile.followers || [];
    const followingStatus =
      isFollowing !== undefined
        ? isFollowing
        : followersList.some(
            (follower) => follower.name === loggedInUser?.name
          );

    setIsFollowingState(followingStatus);
  }, [profile, loggedInUser?.name, isFollowing]);

  if (profile.name === loggedInUser?.name) {
    return null; // Don't render button for the logged-in user
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowingState) {
        await api.profile.unfollow(profile.name);
        onFollowChange(-1); // Decrement follower count
      } else {
        await api.profile.follow(profile.name);
        onFollowChange(1); // Increment follower count
      }
      setIsFollowingState(!isFollowingState); // Toggle following state
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Button
      className={isFollowingState ? "" : "bg-primary text-primary-foreground"}
      variant="outline"
      onClick={handleFollowToggle}
    >
      {isFollowingState ? "Following" : "Follow +"}
    </Button>
  );
};

export default FollowBtn;
