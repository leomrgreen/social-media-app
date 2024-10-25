"use client";
import React, { useState, useEffect } from "react";
import postsAPI from "../lib/api/postAPI";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import timeSince from "@/lib/utilities/getDate";
import { Heart, MessageCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Fixed limit of 12 posts per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const data = await postsAPI.getPosts({ page, limit });
        setPosts((prevPosts) => [...prevPosts, ...data.data]); // Append new posts
        setTotalPages(data.meta.pageCount); // Set total pages from meta
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 // Trigger near the bottom
      ) {
        if (page < totalPages && !loading) setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, loading]);

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[50rem] w-full mx-auto">
      <div className="grid border-x-2">
        {posts.map((post, index) => (
          <Card
            key={`${post.id}-${index}`} // Use a combination of id and index as key
            className="border-b p-4 shadow-md flex flex-col gap-2 rounded-none"
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
                className="max-w-[100%] aspect-[4/3] object-cover rounded-lg border"
              />
            ) : (
              <img
                src="/placeholder.png"
                alt="Placeholder"
                className="w-[100%] aspect-[4/3] object-contain rounded-lg border"
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
          </Card>
        ))}
      </div>
      {loading && (
        <div className="grid gap-4 ">
          {Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="w-[50rem] h-[30rem]" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsList;
