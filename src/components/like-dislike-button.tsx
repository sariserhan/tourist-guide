"use client";

import { Button } from '@/components/ui/button';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { Doc } from '../../convex/_generated/dataModel';

interface LikeDislikeButtonProps {
  comment?: Doc<"comments">;
  posts?: Doc<"posts">;
  username: string | undefined;
  isSignedIn: boolean;
}

export const LikeButton = ({comment, posts, username, isSignedIn}: LikeDislikeButtonProps) => {
  const router = useRouter();
  const setUpvote = useMutation(api.posts.upvotePost);
  const setUpvoteComment = useMutation(api.comments.upvoteComment);
  if (!username) return;
  return (
    <>
      {
        comment ? (
          <Button
            variant={comment.upvotedBy.includes(username) ? "secondary" : "outline"}
            onClick={async () =>
              {
                if (!isSignedIn) {
                  router.push("/sign-in");
                  return;
                }
                await setUpvoteComment({ commentId: comment._id, votingUser: username })
              }
            }
            className="rounded-full "
            size="smallIcon"
          >
            <ThumbsUpIcon className="w-3 h-3 text-green-500" />
          </Button>
        ) : posts && (
          <Button
            variant={posts.upvotedBy.includes(username) ? "secondary" : "outline"}
            onClick={async () =>
              {
                if (!isSignedIn) {
                  router.push("/sign-in");
                  return;
                }
                await setUpvote({ postId: posts._id, votingUser: username })
              }
            }
            className="rounded-full "
            size="icon"
          >
            <ThumbsUpIcon className="w-5 h-5 text-green-500" />
          </Button>
        )
      }
    </>
  )
}

export const DisLikeButton = ({comment, posts, username, isSignedIn}: LikeDislikeButtonProps) => {
  const router = useRouter();
  const setDownvote = useMutation(api.posts.downvotePost);
  const setDownvoteComment = useMutation(api.comments.downvoteComment);
  if (!username) return;
  return (
    <>
      {
        comment ?
        (
        <Button
          variant={comment.downvotedBy.includes(username) ? "secondary" : "outline"}
          onClick={async () =>
            {
              if (!isSignedIn) {
                router.push("/sign-in");
                return;
              }
                await setDownvoteComment({ commentId: comment._id, votingUser: username });
            }
          }
          className="rounded-full"
          size="smallIcon"
        >
          <ThumbsDownIcon className="w-3 h-3 text-red-500" />
        </Button>
          ) : posts && (
            <Button
              variant={posts.downvotedBy.includes(username) ? "secondary" : "outline"}
              onClick={async () =>
                {
                  if (!isSignedIn) {
                    router.push("/sign-in");
                    return;
                  }
                  await setDownvote({ postId: posts._id, votingUser: username })
                }
              }
              className="rounded-full"
              size="icon"
            >
              <ThumbsDownIcon className="w-5 h-5 text-red-500" />
            </Button>
          )
        }
    </>
  )
}
