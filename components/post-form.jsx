"use client";
import React, { useState } from "react";
import { onCreatePost } from "@/lib/api/createPost";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LoadingButton from "./ui/load-btn";

const CreatePostForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await onCreatePost(event);
      // Reset form or display success message if needed
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false); // Reset loading state whether success or error
    }
  };

  return (
    <Card className="p-6 max-w-[50rem] mx-auto w-full">
      <h1 className="text-5xl pb-10">Upload post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="What's happening?"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            name="body"
            placeholder="Tell us more about this post"
            rows="5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="tags">Add tags (space or comma separated)</Label>
          <Input
            type="text"
            id="tags"
            name="tags"
            placeholder="Travel, Food, Gaming"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="media-url">Media URL</Label>
          <Input
            type="url"
            id="media-url"
            name="media-url"
            placeholder="Media URL"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="media-alt">Media Alt Text</Label>
          <Input
            type="text"
            id="media-alt"
            name="media-alt"
            placeholder="Media Alt Text"
          />
        </div>

        {/* Conditionally render LoadingButton or Button based on isLoading */}
        {isLoading ? (
          <LoadingButton message="Creating Post..." />
        ) : (
          <Button type="submit" className="mt-4">
            Create Post
          </Button>
        )}
      </form>
    </Card>
  );
};

export default CreatePostForm;
