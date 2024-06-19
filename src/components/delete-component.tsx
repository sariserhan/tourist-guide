"use client";

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DeleteIcon } from "lucide-react"
import { Id } from '../../convex/_generated/dataModel';
import { api } from "../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

interface DeleteComponentProps {
  commentId?: Id<"comments">;
  postId?: Id<"posts">;
  country?: string;
  city?: string;
  category?: string;
  imageStorageIds?: Id<"_storage">[];
}

const DeleteComponent = ({commentId, postId, country, city, category, imageStorageIds}: DeleteComponentProps) => {
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      if (country) {
        router.push(`/forum?country=${country}&city=${city}&category=${category}`);
      }
      router.refresh();

      postId && await fetchMutation(api.posts.deletePost, { postId });
      imageStorageIds && imageStorageIds.map(async (storageId: Id<"_storage">) => {
        await fetchMutation(api.files.deleteFile, { storageId });
      })


        const comments = postId && await fetchMutation(api.comments.deleteCommentsByPost, { postId });
        if (comments) {
          for (const comment of comments) {
            await fetchMutation(api.replies.deleteReplyByCommentId, { commentId: comment._id });
          }
        }
      toast({ title: "Post Deleted" });
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast({ title: "Failed to delete post" });
    }
  };

  const handleDeleteComment = async () => {
    try {
      if (commentId) {
        await fetchMutation(api.comments.deleteComment, { commentId });
        await fetchMutation(api.replies.deleteReplyByCommentId, { commentId });
        router.refresh();
      }
      toast({ title: "Comment Deleted" });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast({ title: "Failed to delete comment" });
    }
  };
  return (
    <AlertDialog>
      <div>
        <AlertDialogTrigger>
          <Button variant="ghost" size="icon">
            <DeleteIcon />
          </Button>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {postId ? "Delete Post" : "Delete Comment"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your {postId ? "post/comments" : "comment"} and all the replies associated with it.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          {postId ?
            <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
            :
            <AlertDialogAction onClick={handleDeleteComment}>Delete</AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteComponent
