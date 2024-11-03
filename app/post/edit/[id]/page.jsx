"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PostsAPI from "@/lib/api/postAPI";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpdatePostPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await PostsAPI.post.readSinglePost(postId);
        const post = data.data;
        setTitle(post.title || "");
        setBody(post.body || "");
        setTags(post.tags ? post.tags.join(", ") : "");
        setMediaUrl(post.media?.url || "");
        setMediaAlt(post.media?.alt || "");
      } catch (error) {
        console.log("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      body,
      tags: tags
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : null,
    };

    try {
      await PostsAPI.post.update(postId, postData);
      toast.success("Updated!", {
        description: "Post has successfully been edited!",
        action: {
          label: "Preview",
          onClick: () => router.push(`/post/${postId}`),
        },
        position: "top-center",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the post. Please try again.",
      });
      console.log("Error updating post:", error);
    }
  };

  return (
    <section className="w-full mx-auto h-full flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-[45rem] w-full xl:px-1 px-5"
      >
        <h1 className="text-5xl mr-auto pb-10">Update your post</h1>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title"
          />
        </div>

        <div>
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter body content"
            rows="5"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma or space separated)</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags"
          />
        </div>

        <div>
          <Label htmlFor="media-url">Media URL</Label>
          <Input
            id="media-url"
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Enter media URL"
          />
        </div>

        <div>
          <Label htmlFor="media-alt">Media Alt Text</Label>
          <Input
            id="media-alt"
            type="text"
            value={mediaAlt}
            onChange={(e) => setMediaAlt(e.target.value)}
            placeholder="Enter media alt text"
          />
        </div>

        <Button type="submit" className="mt-4">
          Update Post
        </Button>
      </form>
    </section>
  );
};

export default UpdatePostPage;
