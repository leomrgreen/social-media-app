"use client";
import React from "react";
import { BsTrash } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import PostsAPI from "@/lib/api/postAPI";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const DeleteBtn = ({ postId }) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await PostsAPI.post.delete(postId); // Call the delete method with the postId
      toast({
        title: "Post deleted",
        description: "The post was successfully deleted.",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the post. Please try again.",
        status: "error",
      });
    } finally {
      setTimeout(() => {
        location.reload();
      }, "1000");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-0 left-0 text-destructive"
        >
          <BsTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post
            from our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
