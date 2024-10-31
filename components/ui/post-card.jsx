import { Heart, MessageCircle } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import timeSince from "@/lib/utilities/getDate";
import { Card } from "./card";
import LikeBtn from "../actions/like-btn";

const PostCard = ({
  post,
  fullBorder = false,
  body = false,
  singlePost = false,
  tags = false,
}) => {
  return (
    <Card
      key={post.id}
      className={`p-4 shadow-md flex flex-col gap-2 w-full max-w-[50rem] ${
        fullBorder ? "border" : "border-b"
      } ${!singlePost ? "rounded-none" : "rounded-md"}`}
    >
      <div className="flex items-center gap-3">
        <Avatar
          onClick={() => {
            window.location.href = `/user/${post.author.name}`;
          }}
          className="cursor-pointer"
        >
          <AvatarImage
            src={post.author.avatar.url}
            alt={post.author.avatar.media}
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span
          className="cursor-pointer"
          onClick={() => {
            window.location.href = `/user/${post.author.name}`;
          }}
        >
          @{post.author.name}
        </span>
        <p className="text-muted-foreground">{timeSince(post.created)}</p>
      </div>
      {post.media?.url ? (
        <img
          src={post.media.url}
          alt={post.media.alt}
          className={`max-w-[100%] aspect-[4/3] object-cover rounded-lg border ${
            !singlePost ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() => {
            !singlePost ? (window.location.href = `/post/${post.id}`) : null;
          }}
        />
      ) : (
        <img
          src="/placeholder.png"
          alt="Placeholder"
          className={`max-w-[100%] aspect-[4/3] object-cover rounded-lg border ${
            !singlePost ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() => {
            !singlePost ? (window.location.href = `/post/${post.id}`) : null;
          }}
        />
      )}
      <div className="flex justify-between">
        <h3>{post.title}</h3>
        <div className="flex gap-3 items-center">
          <p className="text-muted-foreground flex items-center gap-1">
            <LikeBtn postId={post.id} initialLikes={post.reactions} />{" "}
            <span>{post._count.reactions}</span>
          </p>
          <p className="text-muted-foreground flex items-center gap-1">
            <MessageCircle /> {post._count.comments}
          </p>
        </div>
      </div>
      {body && <p className="text-muted-foreground">{post.body}</p>}{" "}
      <ul className="flex gap-2 items-center">
        {post.tags.map((tag, idx) => {
          return (
            <li key={idx} className={`${tags ? "flex" : "hidden"} list-none`}>
              #{tag}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default PostCard;
