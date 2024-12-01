import React from "react";
import { Card } from "@/components/ui/card";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import EditPostBtn from "../actions/edit-post-btn";
import DeleteBtn from "../actions/delete-btn";

const UserPostCard = ({ post, owner = false }) => (
  <Card className="w-full relative cursor-pointer ">
    {post.media && (
      <img
        src={post.media.url}
        alt={post.media.alt}
        className="aspect-square object-cover border rounded-md"
        onClick={() => {
          window.location.href = `/post/${post.id}`;
        }}
      />
    )}
    {!post.media && (
      <img
        src="/placeholder.png"
        alt="placeholder image"
        className="aspect-square object-cover border rounded-md"
        onClick={() => {
          window.location.href = `/post/${post.id}`;
        }}
      />
    )}
    {owner && (
      <>
        <EditPostBtn id={post.id} />
        <DeleteBtn postId={post.id} />
      </>
    )}
  </Card>
);

export default UserPostCard;
