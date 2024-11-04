import { useEffect, useState } from "react"; // Import useEffect
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import * as storage from "@/lib/utilities/storage";
import { TfiComment } from "react-icons/tfi";
import timeSince from "@/lib/utilities/getDate";
import { Send } from "lucide-react";

const CommentDialog = ({ postId, api }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedInUser = storage.load("user");

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      const response = await api.post.readSinglePost(postId);
      // Sort comments from oldest to newest
      const sortedComments = response.data.comments.sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
      });
      setComments(sortedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []); // Empty dependency array ensures this runs once

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);

      const commentPayload = JSON.stringify({ body: newComment });
      const response = await api.post.comment(postId, commentPayload);

      // Create a new comment object with logged-in user details
      const newCommentObj = {
        id: response.data.id, // Assuming the response gives you the new comment ID
        body: newComment,
        created: new Date().toISOString(), // Current timestamp
        author: {
          name: loggedInUser?.name,
          avatar: {
            url: loggedInUser?.avatar.url, // Assuming you have the avatar URL
          },
        },
      };

      // Update comments list with the new comment
      setComments((prev) =>
        [...prev, newCommentObj].sort(
          (a, b) => new Date(a.created) - new Date(b.created)
        )
      );
      setNewComment("");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog onOpenChange={(isOpen) => isOpen && fetchComments()}>
      <DialogTrigger asChild>
        <span className="flex items-center gap-1 cursor-pointer">
          <TfiComment className="text-xl" />
          {comments.length} {/* This will now show the correct count */}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto p-4">
        <DialogTitle>Comments</DialogTitle>

        <ScrollArea className="h-64 mt-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-3 p-3 border-b"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={comment.author?.avatar.url}
                  alt={comment.author?.name}
                />
                <AvatarFallback>{comment.author?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <span className="flex items-center gap-2">
                  <p className="font-semibold">@{comment.author?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {timeSince(comment.created)}
                  </p>
                </span>
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : <Send />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
