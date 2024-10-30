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
    // Check if the logged-in user is following the profile
    const followingStatus = profile.followers.some(
      (follower) => follower.name === loggedInUser.name
    );
    setIsFollowing(followingStatus);
  }, [profile.followers, loggedInUser.name]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await api.profile.unfollow(profile.name);
    } else {
      await api.profile.follow(profile.name);
    }
    // Update the following status and refresh the page to show changes
    setIsFollowing(!isFollowing);
    window.location.reload();
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
