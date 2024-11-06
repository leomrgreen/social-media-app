"use client";
import React, { useState, useEffect } from "react";
import postsAPI from "../lib/api/postAPI";
import { Skeleton } from "./ui/skeleton";
import PostCard from "./ui/post-card";
import { Separator } from "./ui/separator";
import TrendingUsers from "./ui/trending";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Fixed limit of 12 posts per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false); // New state for toggle

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const data = await postsAPI.post.getPosts({
          page,
          limit,
          following,
        });
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
  }, [page, limit, following]); // Include following in dependencies

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

  const toggleFollowing = () => {
    setFollowing((prev) => !prev); // Toggle following state
    setPosts([]); // Clear posts to trigger a fresh fetch
    setPage(1); // Reset page to 1 to load the new set of posts
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[50rem] w-full mx-auto pb-10">
      {/* Toggle Button */}
      <div className="flex justify-center sticky top-0 z-50">
        <button
          onClick={toggleFollowing}
          className="flex items-center gap-3 text-xl lg:text-3xl  bg-background w-full justify-center p-3 border-b "
        >
          <span
            className={`${
              following ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            For you
          </span>
          <Separator orientation="vertical" />
          <span
            className={`${
              following ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Following
          </span>
        </button>
      </div>

      {/* Message for no posts */}
      {posts.length === 0 && !loading && (
        <div className="p-2">
          <p className="text-muted-foreground text-xl px-4">
            No posts found. Explore interesting profiles:
          </p>
          <TrendingUsers />
        </div>
      )}

      <div className="grid lg:border-x overflow-x-hidden">
        {posts.map((post, index) => (
          <PostCard key={`${post.id}-${index}`} post={post} />
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
