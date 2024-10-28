import ProfileAPI from "@/lib/api/profileAPI";
import { BadgeCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

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
            .filter(
              (user) => user._count && typeof user._count.followers === "number"
            ) // Filter users with valid follower count
            .sort(
              (a, b) => (b._count.followers || 0) - (a._count.followers || 0)
            ) // Sort by followers in descending order
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
    return <div>Loading...</div>;
  }

  return (
    <ul className="grid grid-cols-2 gap-2 py-5 px-2">
      {users.map((user, idx) => (
        <li
          key={idx}
          className="flex flex-col items-center justify-center bg-muted py-2 rounded-sm"
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
          <span className="text-muted-foreground">
            {user._count.followers} followers
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TrendingUsers;
