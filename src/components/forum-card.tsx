"use client";

import Link from "next/link";
import CommentCount from "./comment-count";
import LikesCounter from './likes-counter';
import PopoverMessage from "./popover-message";
import IsAuthorOnline from "./is-author-online";
import DeleteComponent from "./delete-component";
import { Id } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";
import { Badge } from "./ui/badge";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { HorizontalScroll } from "./horizontal-scroll";
import { formatCreationTime } from "@/lib/utils";
import { GoCommentDiscussion } from "react-icons/go";
import { useEffect, useState } from "react";
import { ForumCategoriesProps } from "@/lib/types";
import { DisLikeButton, LikeButton } from "./like-dislike-button";

const ForumCard = ({ country, category, city }: ForumCategoriesProps) => {
  const { isSignedIn, user } = useUser();
  const [initialPostCount, setInitialPostCount] = useState(0);
  const [newPostCount, setNewPostCount] = useState(0);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const filteredPosts = useQuery(api.posts.listPosts, { country, city, category });

  useEffect(() => {
    if (filteredPosts) {
      // Update initial post count if it's the first load
      if (initialPostCount === 0) {
        setInitialPostCount(filteredPosts.length);
      }

      // Update new post count whenever filteredPosts changes
      if (filteredPosts.length > initialPostCount) {
        setNewPostCount(filteredPosts.length - initialPostCount);
        setShowAllPosts(false)
      }
    }
  }, [filteredPosts, initialPostCount]);

  const handleShowNewPosts = () => {
    setShowAllPosts(true);
    filteredPosts && setInitialPostCount(filteredPosts.length); // Reset initial post count to current post count
    setNewPostCount(0); // Reset new post count
  };
  if (!filteredPosts) {
    return <div className="flex items-center justify-center font-bold">Loading...</div>;
  }
  const postsToShow = showAllPosts ? filteredPosts : filteredPosts.slice(-initialPostCount);

  return (
    <main className="justify-center font-bold bg-white w-full h-[85rem] rounded-lg border overflow-auto">
    {filteredPosts.length === 0 ? (
      <div className="flex justify-center font-bold bg-white w-full">No Post Yet</div>
      ) : (
      <>
      {newPostCount > 0 && !showAllPosts && (newPostCount !== initialPostCount) && (
        <div className="flex justify-center items-center">
          <Badge
            className=" cursor-pointer"
            onClick={handleShowNewPosts}
            variant="outline"
          >
            Show New Posts ({newPostCount})
          </Badge>
        </div>
      )}
      {postsToShow.map(post => (
        <div key={post._id} className="relative rounded-lg border border-gray-200 bg-white p-4 mb-2 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between border-b">
            <Link href={`/forum/${post._id}`}>
              <h2 className="text-lg text-wrap font-semibold hover:bg-accent hover:text-accent-foreground">{post.title}</h2>
            </Link>
          <div className="flex items-center justify-between">
            {isSignedIn && user?.username === post.authorName && (
              <DeleteComponent
                postId={post._id}
                imageStorageIds={post.imageStorageIds as Id<"_storage">[]}
              />
            )}
            <div className="text-sm text-nowrap text-gray-500 dark:text-gray-400">{formatCreationTime(post._creationTime)}</div>
          </div>
        </div>
        {post.imageUrls && post.imageUrls.length > 0 ?
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-accent hover:text-accent-foreground">
            <div className="flex justify-center items-center border border-rounded scroll-x">
              <HorizontalScroll images={post.imageUrls as string[]} />
            </div>
          </div>
        :
          <Link href={`/forum/${post._id}`}>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-accent hover:text-accent-foreground">
              {post.article}
            </div>
          </Link>
        }
        <div className="flex mt-6 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <PopoverMessage
                authorImageUrl={post.authorImageUrl}
                authorName={post.authorName}
                authorId={post.authorId}
                about={{country, city, category}}
              />
              <IsAuthorOnline authorId={post.authorId} />
            </div>
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <Link href={`/forum/${post._id}`}>
              <div className="flex p-2 ml-1 space-x-1 items-center justify-center cursor-pointer hover:bg-accent hover:text-accent-foreground bg-gray-50 rounded-2xl">
                <GoCommentDiscussion
                  className="h-4 w-4 text-gray-900 dark:text-gray-50"
                />
                <CommentCount postId={post._id} />
              </div>
            </Link>
            <LikeButton posts={post} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
            <LikesCounter likes={post.likes} className='font-medium text-center text-gray-900 dark:text-gray-50'/>
            <DisLikeButton posts={post} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
          </div>
        </div>
      </div>
      ))}
    </>
  )}
  </main>
  )
};

export default ForumCard;
