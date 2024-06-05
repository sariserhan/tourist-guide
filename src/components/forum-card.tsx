"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ForumCategoriesProps } from "@/lib/types";
import { formatCreationTime } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import { useUser } from "@clerk/nextjs";
import { DeleteIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

const ForumCard = ({country, category, city}: ForumCategoriesProps) => {
  const {isSignedIn, user} = useUser();
  const router = useRouter()
  const allPosts = useQuery(api.posts.listPosts, { country, city, category });
  const setUpvote = useMutation(api.posts.upvotePost);
  const neutralUpVote = useMutation(api.posts.neutralizeUpvote);
  const neutralDownVote = useMutation(api.posts.neutralizeDownvote);
  const setDownvote = useMutation(api.posts.downvotePost);
  const deletePost = useMutation(api.posts.deletePost);

  if (!allPosts) {
    return <div className="flex items-center justify-center font-bold">No Post Yet</div>;
  }
  const posts = allPosts?.filter((post) => (
    post.country === country && post.city === city && post.category === category)
  )

  return (
    <>
      {posts?.map(({ title, article, author, authorImageUrl, likes, _creationTime, _id, upvotedBy, downvotedBy, imageUrl }) => (
        <div key={_id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between">
            <Link
              href={`/forum/${_id}`}
            >
              <h2 className="text-lg text-wrap font-semibold hover:bg-accent hover:text-accent-foreground">{title}</h2>
            </Link>
            <div className="flex items-center justify-between">
              {isSignedIn && user.username === author &&
                <Button variant="ghost" size="icon"
                  onClick={async () => {
                    await deletePost({ postId: _id });
                  }}
                >
                  <DeleteIcon />
                </Button>
              }
              <div className="text-sm text-nowrap text-gray-500 dark:text-gray-400">{formatCreationTime(_creationTime)}</div>
            </div>
          </div>
          <Link
              href={`/forum/${_id}`}
            >
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-accent hover:text-accent-foreground ">
            {imageUrl ?
              <div className="flex justify-center items-center border border-rounded">
                <Image
                  alt="Post Image"
                  className="rounded-lg"
                  height={700}
                  width={700}
                  src={imageUrl}
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                />
              </div>
              :
                article
            }
            </div>
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 ">
              <Image
                alt="Avatar"
                className="h-8 w-8 rounded-full cursor-pointer"
                height={32}
                src={authorImageUrl}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:bg-accent hover:text-accent-foreground cursor-pointer">{author}</div>
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <Button
                className="rounded-full"
                size="icon"
                variant={upvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                onClick={async () => {
                  if (!isSignedIn) {
                    router.push("/sign-in")
                    return
                  }
                  upvotedBy.includes(user?.username!) ?
                    await neutralUpVote({ postId: _id, author: user?.username!})
                    :
                    await setUpvote({ postId: _id, author: user?.username!})
                }}
              >
                <ThumbsUpIcon className="w-5 h-5 text-green-500" />
              </Button>
              <div className="text-sm font-medium text-center text-gray-900 dark:text-gray-50">{likes}</div>
              <Button
                className="rounded-full"
                size="icon"
                variant={downvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                onClick={async () => {
                  if (!isSignedIn) {
                    router.push("/sign-in")
                    return
                  }
                  downvotedBy.includes(user?.username!) ?
                    await neutralDownVote({ postId: _id, author: user?.username!})
                    :
                    await setDownvote({ postId: _id, author: user?.username!})
                }}
              >
                <ThumbsDownIcon className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ForumCard;
