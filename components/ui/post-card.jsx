import { Heart, MessageCircle } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import timeSince from "@/lib/utilities/getDate";
import { Card } from "./card";

const PostCard = ({
  post,
  fullBorder = false,
  body = false,
  singlePost = false,
}) => {
  return (
    <Card
      key={post.id}
      className={`p-4 shadow-md flex flex-col gap-2 w-full max-w-[50rem] ${
        fullBorder ? "border" : "border-b"
      } rounded-none`}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={post.author.avatar.url}
            alt={post.author.avatar.media}
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span>@{post.author.name}</span>
        <p className="text-muted-foreground">{timeSince(post.created)}</p>
      </div>
      {post.media?.url ? (
        <img
          src={post.media.url}
          alt={post.media.alt}
          className="max-w-[100%] aspect-[4/3] object-cover rounded-lg border cursor-pointer"
          onClick={() => {
            window.location.href = `/post/${post.id}`;
          }}
        />
      ) : (
        <img
          src="/placeholder.png"
          alt="Placeholder"
          className="w-[100%] aspect-[4/3] object-contain rounded-lg border cursor-pointer"
          onClick={() => {
            window.location.href = `/post/${post.id}`;
          }}
        />
      )}
      <div className="flex justify-between">
        <h3>{post.title}</h3>
        <div className="flex gap-3 items-center">
          <p className="text-muted-foreground flex items-center gap-1">
            <Heart /> {post._count.comments}
          </p>
          <p className="text-muted-foreground flex items-center gap-1">
            <MessageCircle /> {post._count.reactions}
          </p>
        </div>
      </div>
      {body && <p className="text-muted-foreground">{post.body}</p>}{" "}
    </Card>
  );
};

export default PostCard;
