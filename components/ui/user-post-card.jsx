import React from "react";
import { Card } from "@/components/ui/card";

const UserPostCard = ({ post }) => (
  <Card className="w-full relative cursor-pointer rounded-none ">
    {post.media && (
      <img
        src={post.media.url}
        alt={post.media.alt}
        className="aspect-square object-cover border"
        onClick={() => {
          window.location.href = `/post/${post.id}`;
        }}
      />
    )}
    {!post.media && (
      <img
        src="/placeholder.png"
        alt="placeholder image"
        className="aspect-square object-cover border"
        onClick={() => {
          window.location.href = `/post/${post.id}`;
        }}
      />
    )}
  </Card>
);

export default UserPostCard;
