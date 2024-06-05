"use client";

import Image from "next/image";
import { notFound, useRouter } from 'next/navigation'
import { useUser } from "@clerk/nextjs";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { DeleteIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

type paramsProps = {
  slug: Id<"post">
}

interface PostValue {
  _id: Id<"post">;
  _creationTime: number;
  article: string;
  author: string;
  authorId: string;
  authorImageUrl: string;
  category: string;
  city: string;
  country: string;
  downvotedBy: string[];
  imageStorageId: string;
  imageUrl: string;
  likes: number;
  title: string;
  upvotedBy: string[];
}

export default function SlugPage({params}: {params: paramsProps}) {
  const {isSignedIn, user} = useUser();
  const postId = params.slug as Id<"post">
  const router = useRouter()
  const response = useQuery(api.posts.getPost, { postId })
  const setUpvote = useMutation(api.posts.upvotePost);
  const neutralUpVote = useMutation(api.posts.neutralizeUpvote);
  const neutralDownVote = useMutation(api.posts.neutralizeDownvote);
  const setDownvote = useMutation(api.posts.downvotePost);
  const deletePost = useMutation(api.posts.deletePost);

  if (response === undefined) {
    return <div>Loading...</div>;
  }

  if (response === null) {
    return notFound();
  }

  const {
    _id: id,
    _creationTime: creationTime,
    article,
    author,
    authorId,
    authorImageUrl,
    category,
    city,
    country,
    downvotedBy,
    imageStorageId,
    imageUrl,
    likes,
    title,
    upvotedBy
  } = response as unknown as PostValue;

  const idAndUser = { postId: id, author: user?.username!}

  const handleDownVote = async () => {
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }
    downvotedBy.includes(idAndUser.author) ?
      await neutralDownVote(idAndUser)
    :
      await setDownvote(idAndUser)

  }
  const handleUpVote = async () => {
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }
    upvotedBy.includes(idAndUser.author) ?
      await neutralUpVote(idAndUser)
    :
      await setUpvote(idAndUser);
  }

  return (
    <main className="min-h-screen backdrop-filter backdrop-blur-xl bg-gray-100">
      <div className="flex items-center justify-center px-32 py-20">
        <div className="border-t border-gray-300 p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <div className="flex flex-row-reverse">
          {isSignedIn && user.username === author &&
            <Button variant="ghost" size="icon"
              onClick={async () => {
                await deletePost({ postId: id });
              }}
            >
              <DeleteIcon />
            </Button>
          }
        </div>
          <h1 className="text-4xl font-bold mb-4 mt-20 text-center">{title}</h1>
          <article className="prose mb-4">{article}</article>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={700}
              height={700}
              className="mb-4 w-full h-auto object-cover rounded-lg"
            />
          )}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 flex items-center">
              Posted by
              <Image
                src={authorImageUrl}
                alt={author}
                width={24}
                height={24}
                className="rounded-full inline-block mx-2"
              />
              {author} on {new Date(creationTime).toLocaleDateString()}
            </p>
            <div className="flex items-center mb-4">
              <Button
                variant={upvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                onClick={() => handleUpVote()}
                className="rounded-full"
                size="icon"
              >
                <ThumbsUpIcon className="w-5 h-5 text-green-500" />
              </Button>
              <p className="mx-2 font-semibold text-xl text-gray-700">{likes}</p>
              <Button
                variant={downvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                onClick={() => handleDownVote()}
                className="rounded-full"
                size="icon"
              >
                <ThumbsDownIcon className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <Input type="text" placeholder="Add a comment" className="w-full p-2 border border-gray-300 rounded mb-2" />
            <Button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</Button>
          </div>
        </div>
      </div>
    </main>
  );
};
