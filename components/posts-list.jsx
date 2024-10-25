"use client";
import React, { useState, useEffect } from "react";
import postsAPI from "../lib/api/postAPI";
import { Skeleton } from "./ui/skeleton";
import PostCard from "./ui/post-card";

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
        const data = await postsAPI.post.getPosts({ page, limit });
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
