"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileAPI from "@/lib/api/profileAPI";
import UserProfileCard from "@/components/ui/user-profile-card";
import { FaCameraRetro } from "react-icons/fa";
import UserPostCard from "@/components/ui/user-post-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Userpage = () => {
  const params = useParams();
  const username = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await new ProfileAPI().profile.readPosts(username);
        setPosts(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to load user posts", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <>
      <section className="max-w-[70rem] w-full mx-auto px-5 flex flex-col gap-2 pt-10">
        <UserProfileCard username={username} />
      </section>
      <section className="max-w-[70rem] w-full mx-auto px-5 mt-2 pb-20">
        {isLoading ? (
          <Skeleton className="w-full h-screen" />
        ) : (
          <div className="grid grid-cols-3 gap-1 pt-5">
            {posts.length > 0 ? (
              posts.map((post) => <UserPostCard key={post.id} post={post} />)
            ) : (
              <Card className="p-5 col-span-3 text-center">
                No posts available
                <FaCameraRetro className="w-1/2 h-auto mx-auto text-muted-foreground" />
              </Card>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Userpage;
