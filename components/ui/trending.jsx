import ProfileAPI from "@/lib/api/profileAPI";
import { BadgeCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";
import FollowBtn from "../actions/follow-btn";

const TrendingUsers = () => {
  const api = new ProfileAPI();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await api.profile.readAll();
        console.log("Fetched users:", data.data); // Debugging: Check structure of data

        if (data.data && Array.isArray(data.data)) {
          const sortedUsers = data.data
            .sort((a, b) => b._count.followers - a._count.followers) // Sort by followers in descending order
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
    <ul className="grid xl:grid-cols-2 gap-2 py-5 px-2 overflow-x-hidden">
      {users.map((user, idx) => (
        <li
          key={idx}
          className="flex flex-col items-center justify-center bg-background border py-2 rounded-sm"
        >
          <a
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
                <BadgeCheck />
              </span>
            </div>
          </a>
          <span className="text-muted-foreground">
            {user._count.followers} followers
          </span>
          <FollowBtn profile={user} />
        </li>
      ))}
    </ul>
  );
};

export default TrendingUsers;
