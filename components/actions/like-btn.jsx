"use client";
import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import PostsAPI from "@/lib/api/postAPI";
import * as storage from "@/lib/utilities/storage";

const LikeBtn = ({ postId, initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const loggedInUser = storage.load("user");

  useEffect(() => {
    // Check if the logged-in user's name is in the reactors array
    if (loggedInUser) {
      const userHasReacted = initialLikes.some(
        (reaction) =>
          Array.isArray(reaction.reactors) &&
          reaction.reactors.includes(loggedInUser.name)
      );

      setIsLiked(userHasReacted);
    }
  }, [initialLikes, loggedInUser]);

  const handleLikeToggle = async () => {
    try {
      await PostsAPI.post.like(postId);
      window.location.reload();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <button onClick={handleLikeToggle} className="flex items-center gap-1">
      {!isLiked ? (
        <BsHeart className="text-xl" />
      ) : (
        <BsHeartFill className="text-xl" />
      )}{" "}
    </button>
  );
};

export default LikeBtn;
