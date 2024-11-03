"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProfileAPI from "@/lib/api/profileAPI";
import * as storage from "@/lib/utilities/storage";

const FollowBtn = ({ profile }) => {
  const api = new ProfileAPI();
  const loggedInUser = storage.load("user");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Initialize followers as an empty array if undefined
    const followersList = profile.followers || [];

    // Check if the logged-in user is following the profile
    const followingStatus = followersList.some(
      (follower) => follower.name === loggedInUser?.name
    );
    setIsFollowing(followingStatus);
  }, [profile, loggedInUser?.name]);

  // Don't render the button if the logged-in user is the profile owner
  if (profile.name === loggedInUser?.name) {
    return null;
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.profile.unfollow(profile.name);
      } else {
        await api.profile.follow(profile.name);
      }
      setIsFollowing(!isFollowing); // Toggle following state
      window.location.reload();
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
