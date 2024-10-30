"use client";
import React from "react";
import { onCreatePost } from "@/lib/api/createPost";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreatePostForm = () => {
  return (
    <Card className="p-6 max-w-[50rem] mx-auto">
      <form onSubmit={onCreatePost} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="body">Body</Label>
          <Textarea id="body" name="body" placeholder="Body" rows="5" />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="tags">Tags</Label>
          <Input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags (space or comma separated)"
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

        <Button type="submit" className="mt-4">
          Create Post
        </Button>
      </form>
    </Card>
  );
};

export default CreatePostForm;
