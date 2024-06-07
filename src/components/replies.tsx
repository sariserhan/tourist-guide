"use client";

import Image from 'next/image';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { DeleteIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { formatCreationTime } from '@/lib/utils';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { api } from '../../convex/_generated/api';

const Replies = ({commentId}: {commentId: Id<"comments">}) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const replies = useQuery(api.replies.getRepliesByCommentId, { commentId });
  const upvoteReply = useMutation(api.replies.upvoteReply);
  const downvoteReply = useMutation(api.replies.downvoteReply);
  const deleteReply = useMutation(api.replies.deleteReply);
  return (
    <>
        {
          replies?.map((reply) => (
          <div key={reply.commentId+Math.random()} className="pl-4 border-gray-300 border-l">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-sm py-2">{reply.text}</p>
              {user?.username === reply.userClerkName &&
                <Button variant="ghost" size="icon"
                  onClick={async () => {
                    await deleteReply({ replyId: reply._id });
                  }}
                >
                  <DeleteIcon />
                </Button>
              }
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 flex items-center">
                Reply by
                <Image
                  src={reply.userClerkImageUrl}
                  alt={reply.userClerkName}
                  width={24}
                  height={24}
                  className="rounded-full inline-block mx-2"
                />
                {reply.userClerkName} on {formatCreationTime(reply._creationTime)}
              </p>
              <div className="flex items-center mb-2">
                <Button
                  variant={reply.upvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                  onClick={async () =>
                    {
                      if (!isSignedIn) {
                        router.push("/sign-in");
                        return;
                      }
                      await upvoteReply({ replyId: reply._id, votingUser: user.username! })
                    }
                  }
                  className="rounded-full "
                  size="smallIcon"
                >
                  <ThumbsUpIcon className="w-3 h-3 text-green-500" />
                </Button>
                <p className="mx-2 font-semibold text-sm text-gray-700">{reply.likes}</p>
                <Button
                  variant={reply.downvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                  onClick={async () =>
                    {
                      if (!isSignedIn) {
                        router.push("/sign-in");
                        return;
                      }
                      await downvoteReply({ replyId: reply._id, votingUser: user.username! });
                    }
                  }
                  className="rounded-full"
                  size="smallIcon"
                >
                  <ThumbsDownIcon className="w-3 h-3 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))
        }
    </>
  )
}

export default Replies
