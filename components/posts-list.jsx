"use client";
import React, { useState, useEffect } from "react";
import postsAPI from "../lib/api/postAPI"; // Import the API handler
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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
        setPosts(data.data); // Use the data property for posts
        console.log(data);
        setTotalPages(data.meta.pageCount); // Set total pages from meta
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]); // Fetch posts when page or limit changes

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[58rem] mx-auto border-x-2">
      <div className="grid gap-4 px-0">
        {posts.map((post) => (
          <Card key={post.id} className="border-none p-4 shadow-md px-0">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.media?.url && (
              <img
                src={post.media.url}
                alt={post.media.alt}
                className="w-[100%] aspect-square"
              />
            )}
            <p className="text-gray-500 text-sm">
              Created: {new Date(post.created).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">
              Comments: {post._count.comments}
            </p>
            <p className="text-gray-500 text-sm">
              Reactions: {post._count.reactions}
            </p>
          </Card>
        ))}
      </div>
      <div className="pagination-controls flex justify-between mt-4">
        <Button onClick={handlePrev} disabled={page === 1}>
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostsList;
