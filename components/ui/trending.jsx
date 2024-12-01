import ProfileAPI from "@/lib/api/profileAPI";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";
import { Verified } from "lucide-react";
import FollowBtn from "../actions/follow-btn";
import * as storage from "@/lib/utilities/storage";
import Link from "next/link";

const TrendingUsers = () => {
  const api = new ProfileAPI();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUserName = storage.load("user")?.name;
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserProfile = async () => {
      const data = await new ProfileAPI().profile.read(loggedInUserName);
      setLoggedInUserProfile(data.data);
    };
    fetchLoggedInUserProfile();
  }, [loggedInUserName]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await api.profile.readAll();
        console.log("Fetched users:", data.data); // Debugging: Check structure of data

        if (data.data && Array.isArray(data.data)) {
          const sortedUsers = data.data
            .sort((a, b) => b._count.posts - a._count.posts) // Sort by followers in descending order
            .slice(0, 10); // Get only the top 10

          setUsers(sortedUsers);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2 py-5 px-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-[full] h-[7rem]" />
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2 py-5 px-2 overflow-x-hidden">
      {users.map((user, idx) => {
        const isFollowing = loggedInUserProfile?.following?.some(
          (followedUser) => followedUser.name === user.name
        );

        return (
          <li
            key={idx}
            className="flex flex-col items-center justify-center bg-background border py-2 rounded-sm"
          >
            <Link
              href={`/user/${user.name}`}
              className="flex flex-col items-center text-sm break-words"
            >
              <Avatar>
                <AvatarImage src={user.avatar.url} />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <div className="flex gap-2 items-center">
                <span>@{user.name}</span>{" "}
                <span className="text-blue-500">
                  <Verified className="text-sm w-4 h-4" />
                </span>
              </div>
            </Link>
            <span className="text-muted-foreground">
              {user._count.posts} posts
            </span>
            <FollowBtn
              profile={user}
              onFollowChange={() => {}}
              isFollowing={isFollowing} // Pass the isFollowing state here
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TrendingUsers;
