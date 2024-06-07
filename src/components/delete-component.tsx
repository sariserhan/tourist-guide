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
  imageStorageId?: Id<"_storage">;
}

const DeleteComponent = ({commentId, postId, country, city, category, imageStorageId}: DeleteComponentProps) => {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost" size="icon"
        >
          <DeleteIcon />
        </Button>
      </AlertDialogTrigger>
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
            <AlertDialogAction
              onClick={async () => {
                toast({
                  title: "Post Deleted"
                });
                country && router.push(`/forum?country=${country}&city=${city}&category=${category}`);
                await fetchMutation(api.posts.deletePost, { postId });
                imageStorageId && await fetchMutation(api.files.deleteFile, { storageId: imageStorageId as Id<"_storage"> });
                const comments = await fetchMutation(api.comments.deleteCommentsByPost, { postId });
                comments?.map(async (comment) => {
                  await fetchMutation(api.replies.deleteReplyByCommentId, { commentId: comment._id });
                  });
              }}
              >
              Delete
            </AlertDialogAction>
            :
            <AlertDialogAction
              onClick={async () => {
                commentId && await fetchMutation(api.comments.deleteComment, { commentId });
                commentId && await fetchMutation(api.replies.deleteReplyByCommentId, { commentId });
                toast({
                  title: "Comment Deleted"
                });
              }}
            >
              Delete
            </AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

}

export default DeleteComponent
