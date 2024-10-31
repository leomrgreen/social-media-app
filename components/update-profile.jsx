"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import * as storage from "@/lib/utilities/storage";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { onUpdateProfile } from "@/lib/api/updateProfile";
import ProfileAPI from "@/lib/api/profileAPI"; // Import your ProfileAPI

const loggedInUser = storage.load("user"); // Load the logged-in user

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState(null); // State for profile data
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // Fetch profile data using loggedInUser's name
        const data = await new ProfileAPI().profile.read(loggedInUser?.name);
        setProfileData(data.data);
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if loggedInUser is defined
    if (loggedInUser?.name) {
      fetchProfile();
    }
  }, []);

  // Update the state when profileData changes
  useEffect(() => {
    if (profileData) {
      setBio(profileData.bio || ""); // Set bio from profile data
      setAvatarUrl(profileData.avatar?.url || ""); // Set avatar URL
      setAvatarAlt(profileData.avatar?.alt || ""); // Set avatar ALT
    }
  }, [profileData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the update object
    const updateData = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
    };
    // Call the onUpdateProfile function with the updateData
    onUpdateProfile(e, updateData);
  };

  // Loading state feedback
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        disabled
        name="username"
        value={`@${loggedInUser?.name}`} // Show the logged-in username
        readOnly // Make this field read-only if you don't want to allow editing
      />
      <Label htmlFor="bio">Bio</Label>
      <Input
        type="text"
        id="bio"
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)} // Update state on change
      />

      <Label htmlFor="avatar-url">Avatar URL</Label>
      <Input
        type="text"
        id="avatar-url"
        name="avatar-url"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)} // Update state on change
      />

      <Label htmlFor="avatar-alt">Avatar ALT</Label>
      <Input
        type="text"
        id="avatar-alt"
        name="avatar-alt"
        value={avatarAlt}
        onChange={(e) => setAvatarAlt(e.target.value)} // Update state on change
      />
      <Button type="submit" className="w-full">
        Update
      </Button>
    </form>
  );
};

export default UpdateProfile;
