"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import ProfileAPI from "@/lib/api/profileAPI";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area"; // Import the ScrollArea component
import LoadingButton from "../ui/load-btn";
import Link from "next/link";

const Search = () => {
  const api = new ProfileAPI();
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Manage dialog state

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      if (query.trim()) {
        const results = await api.profile.search(query);
        console.log("results", results);
        setProfiles(results.data || []); // Ensure we set an empty array if no data
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      {/* Manage dialog open state */}
      {/* Trigger to open the search dialog */}
      <DialogTrigger asChild>
        <span className="flex gap-2 w-full">
          <SearchIcon />
          <span className="sm:block hidden">Search</span>
        </span>
      </DialogTrigger>
      {/* Dialog Content */}
      <DialogContent className="max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>Search Profiles</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="my-4">
          <Input
            type="text"
            placeholder="Search for profiles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {isSearching ? (
            <LoadingButton message="Searching..." />
          ) : (
            <Button onClick={handleSearch} className="mt-2 w-full">
              Search
            </Button>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-96">
          {profiles.length > 0 && (
            <p className="text-start text-muted-foreground mb-2">
              Profiles found: {profiles.length}
            </p>
          )}
          <ScrollArea className="max-h-80 overflow-y-auto space-y-4">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Link
                  href={`/user/${profile.name}`}
                  key={profile.name} // Use a unique key for each profile
                  className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg transition"
                  onClick={() => setIsOpen(false)} // Close dialog on link click
                >
                  <Avatar>
                    <AvatarImage src={profile.avatar.url} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">@{profile.name}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                {isSearching ? "Searching..." : "No profiles found."}
              </p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
