"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileAPI from "@/lib/api/profileAPI";
import UserProfileCard from "@/components/ui/user-profile-card";
import UserPostCard from "@/components/ui/user-post-card";
import { Card } from "@/components/ui/card";

const Userpage = () => {
  const params = useParams();
  const username = params.id;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await new ProfileAPI().profile.readPosts(username);
        setPosts(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to load user posts", error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <>
      <section className="max-w-[70rem] w-full mx-auto px-5 flex flex-col gap-2 pt-10">
        <UserProfileCard username={username} />
      </section>
      <section className="max-w-[70rem] w-full mx-auto px-5">
        <div className="grid grid-cols-3 gap-1">
          {posts.length > 0 ? (
            posts.map((post) => <UserPostCard key={post.id} post={post} />)
          ) : (
            <Card className="p-5">No posts available</Card>
          )}
        </div>
      </section>
    </>
  );
};

export default Userpage;
