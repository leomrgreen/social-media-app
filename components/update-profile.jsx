"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import * as storage from "@/lib/utilities/storage";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner"; // Import Sonner's toast
import { onUpdateProfile } from "@/lib/api/updateProfile";
import ProfileAPI from "@/lib/api/profileAPI";

const loggedInUser = storage.load("user");

const UpdateProfile = ({ closeDialog }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await new ProfileAPI().profile.read(loggedInUser?.name);
        setProfileData(data.data);
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedInUser?.name) fetchProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      setBio(profileData.bio || "");
      setAvatarUrl(profileData.avatar?.url || "");
      setAvatarAlt(profileData.avatar?.alt || "");
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
    };

    try {
      await onUpdateProfile(e, updateData);
      toast.success("Profile updated", {
        description: "Your profile has been updated.",
        position: "top-center",
      });
      closeDialog(); // Close dialog after successful submission
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Update failed", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        disabled
        name="username"
        value={`@${loggedInUser?.name}`}
        readOnly
      />
      <Label htmlFor="bio">Bio</Label>
      <Input
        type="text"
        id="bio"
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Label htmlFor="avatar-url">Avatar URL</Label>
      <Input
        type="text"
        id="avatar-url"
        name="avatar-url"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <Label htmlFor="avatar-alt">Avatar ALT</Label>
      <Input
        type="text"
        id="avatar-alt"
        name="avatar-alt"
        value={avatarAlt}
        onChange={(e) => setAvatarAlt(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Update
      </Button>
    </form>
  );
};

export default UpdateProfile;
