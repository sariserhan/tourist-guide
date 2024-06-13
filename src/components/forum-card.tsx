"use client";

import Image from "next/image";
import Link from "next/link";
import DeleteComponent from "./delete-component";
import LikesCounter from './likes-counter';
import IsAuthorOnline from "./is-author-online";
import { api } from "../../convex/_generated/api";
import { ForumCategoriesProps } from "@/lib/types";
import { formatCreationTime } from "@/lib/utils";
import { Id } from "../../convex/_generated/dataModel";
import { DisLikeButton, LikeButton } from "./like-dislike-button";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { HorizontalScroll } from "./horizontal-scroll";
import { CarouselDApi } from "./carousel";

const ForumCard = ({country, category, city}: ForumCategoriesProps) => {
  const {isSignedIn, user} = useUser();

  const allPosts = useQuery(api.posts.listPosts, { country, city, category });
  if (!allPosts) {
    return <div className="flex items-center justify-center font-bold">No Post Yet</div>;
  }

  const posts = allPosts?.filter((post) => (
    post.country === country && post.city === city && post.category === category)
  )

  return (
    <>
      {posts?.map((post) => (
        <div key={post._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between">
            <Link
              href={`/forum/${post._id}`}
            >
              <h2 className="text-lg text-wrap font-semibold hover:bg-accent hover:text-accent-foreground">{post.title}</h2>
            </Link>
            <div className="flex items-center justify-between">
              {isSignedIn && user.username === post.authorName &&
                <DeleteComponent
                  postId={post._id}
                  imageStorageIds={post.imageStorageIds as Id<"_storage">[]}
              />
              }
              <div className="text-sm text-nowrap text-gray-500 dark:text-gray-400">{formatCreationTime(post._creationTime)}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-accent hover:text-accent-foreground ">
          {post.imageUrls && post.imageUrls?.length>0 ?
            <div className="flex justify-center items-center border border-rounded scroll-x">
              <HorizontalScroll images={post.imageUrls as string[]} />
            </div>
            :
            post.article
          }
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-accent hover:text-accent-foreground hover:rounded-full">
                <Image
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                  height={32}
                  src={post.authorImageUrl}
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width={32}
                />
                <div className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:bg-accent hover:text-accent-foreground">{post.authorName}</div>
              </div>
              <IsAuthorOnline authorId={post.authorId} />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <LikeButton posts={post} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
              <LikesCounter likes={post.likes} className='font-medium text-center text-gray-900 dark:text-gray-50'/>
              <DisLikeButton posts={post} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ForumCard;
