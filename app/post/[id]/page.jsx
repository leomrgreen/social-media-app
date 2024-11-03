"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import postAPI from "@/lib/api/postAPI";
import PostCard from "@/components/ui/post-card";
import { Skeleton } from "@/components/ui/skeleton";

const PostPage = () => {
  const [post, setPost] = useState(null); // State for a single post
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const data = await postAPI.post.readSinglePost(postId); // Fetch the single post
        setPost(data.data); // Set the single post
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // Depend on postId to refetch if it changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Skeleton className="w-[40rem] h-[35rem]" />
      </div>
    ); // Show a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {post ? (
        <PostCard
          post={post}
          body={true}
          fullBorder={true}
          singlePost={true}
          tags={true}
        />
      ) : (
        <div>No post found.</div>
      )}
    </div>
  );
};

export default PostPage;
