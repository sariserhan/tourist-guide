"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ForumCategoriesProps } from "@/lib/types";
import { formatCreationTime } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import { useUser } from "@clerk/clerk-react";
import { RiDeleteBinLine } from "react-icons/ri";

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
    return <div className="flex items-center justify-center min-h-screen">No Post Yet</div>;
  }
  const posts = allPosts?.filter((post) => (
    post.country === country && post.city === city && post.category === category)
  )

  return (
    <>
      {posts.map(({ title, article, createdBy, likes, _creationTime, _id, upvotedBy, downvotedBy, userImageUrl }) => (
        <div key={_id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between">
            <Link
              href={`/forum/${title}?country=${country}&city=${city}&category=${category}`}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
            </Link>
            <div className="flex items-center gap-1">
              {isSignedIn && user.username === createdBy &&
              <Button variant="ghost" size="icon"
                onClick={async () => {
                  await deletePost({ postId: _id });
                }}
              >
                <RiDeleteBinLine />
              </Button>}
              <div className="text-sm text-gray-500 dark:text-gray-400">{formatCreationTime(_creationTime)}</div>
            </div>
          </div>
          <Link
              href={`/forum/${title}?country=${country}&city=${city}&category=${category}`}
            >
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {article}
            </div>
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                alt="Avatar"
                className="h-8 w-8 rounded-full"
                height={32}
                src={userImageUrl}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{createdBy}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="rounded-full"
                size="icon"
                variant={upvotedBy.includes(user?.username!) ? "secondary" : "ghost"}
                onClick={async () => {
                  if (!isSignedIn) {
                    router.push("https://decent-pelican-54.accounts.dev/sign-in")
                    return
                  }
                  upvotedBy.includes(user?.username!) ?
                    await neutralUpVote({ postId: _id, userName: user?.username!})
                    :
                    await setUpvote({ postId: _id, userName: user?.username!})
                }}
              >
                <ThumbsUpIcon className="w-5 h-5" />
              </Button>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{likes}</div>
              <Button
                className="rounded-full"
                size="icon"
                variant={downvotedBy.includes(user?.username!) ? "secondary" : "ghost"}
                onClick={async () => {
                  if (!isSignedIn) {
                    router.push("https://decent-pelican-54.accounts.dev/sign-in")
                    return
                  }
                  downvotedBy.includes(user?.username!) ?
                    await neutralDownVote({ postId: _id, userName: user?.username!})
                    :
                    await setDownvote({ postId: _id, userName: user?.username!})
                }}
              >
                <ThumbsDownIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

function ThumbsDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 14V2" />
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
      </svg>
    )
  }


  function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    )
  }


export default ForumCard;
