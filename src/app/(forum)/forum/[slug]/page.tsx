"use client";

import Image from "next/image";
import Divider from "@/components/divider";
import Replies from "@/components/replies";
import BreadCrumb from "@/components/breadcrumb-custom";
import IsAuthorOnline from "@/components/is-author-online";
import DeleteComponent from "@/components/delete-component";
import PopoverComponent from "@/components/popover-component";
import LikesCounter from "@/components/likes-counter";
import { z } from "zod";
import { notFound } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { api } from "@/../convex/_generated/api";
import { Id, Doc } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCreationTime } from "@/lib/utils";
import { LikeButton, DisLikeButton } from "@/components/like-dislike-button";
import { ForumCategoriesProps } from "@/lib/types";
import { HorizontalScroll } from "@/components/horizontal-scroll";

interface paramsProps {
  slug: Id<"posts">
}

export default function SlugPage({ params }: { params: paramsProps }) {
  const { isSignedIn, user } = useUser();
  const postId = params.slug as Id<"posts">;
  const posts = useQuery(api.posts.getPost, { postId });
  const getAllComments = useQuery(api.comments.getAllComments, { postId });
  const createComment = useMutation(api.comments.createComment);
  const FormSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  if (posts === undefined) {
    return <div>Loading...</div>;
  }

  if (posts === null) {
    return notFound();
  }

  const {
    _id: id,
    _creationTime: creationTime,
    article,
    authorName,
    authorId,
    authorImageUrl,
    category,
    city,
    country,
    downvotedBy,
    imageStorageIds,
    imageUrls,
    likes,
    title,
    upvotedBy
  } = posts as Doc<"posts">;


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createComment({
      postId,
      userClerkId: user?.id!,
      userClerkName: user?.username!,
      userClerkImageUrl: user?.imageUrl!,
      text: data.comment
  });
    form.reset({ comment: '' });
    toast({
      title: "Comment Submitted!"
    });
  };

  return (
    <main className="min-h-screen backdrop-filter backdrop-blur-xl bg-gray-100">
      <div className="flex items-center justify-center px-32 py-20">
        <div className="border-t border-gray-300 p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <BreadCrumb country={country} city={city} category={category as ForumCategoriesProps["category"]} title={title.slice(0,10)}/>
          <div className="flex flex-row-reverse items-center">
            <p className="text-sm">{formatCreationTime(creationTime)}</p>
            {isSignedIn && user.username === authorName &&
              <DeleteComponent
                postId={id}
                country={country}
                city={city}
                category={category}
                imageStorageIds={imageStorageIds as Id<"_storage">[]}
              />
            }
          </div>
          <h1 className="text-xl font-bold mb-4">{title}</h1>
          <article className="prose mb-4 whitespace-normal break-words">{article}</article>
            {imageUrls && (
              <HorizontalScroll images={imageUrls as string[]} />
            )}
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2 items-center">
                <p className="text-sm text-gray-500">
                  Posted by
                  <Image
                    src={authorImageUrl}
                    alt={authorName}
                    width={24}
                    height={24}
                    className="rounded-full inline-block mx-2"
                  />
                  {authorName}
                </p>
                <IsAuthorOnline authorId={authorId} />
              </div>
              <div className="flex items-center mb-4">
                <LikeButton posts={posts} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
                <LikesCounter likes={likes} className='font-medium text-center text-gray-900 dark:text-gray-50'/>
                <DisLikeButton posts={posts} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
              </div>
            </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="comment"
                          placeholder="Add a comment"
                          {...field}
                          className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-500 text-white px-4 mb-10 rounded">Submit</Button>
                </div>
              </form>
            </Form>
          </div>
          <Divider />
          {getAllComments === undefined ? (
            <div>Loading...</div>
          ) : (
            getAllComments.map((comment) => (
              <div key={comment._id} className=" border-gray-300 mt-10 border-b">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 text-sm py-2">{comment.text}</p>
                    {isSignedIn && user.username === authorName &&
                      <DeleteComponent commentId={comment._id} />
                    }
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 flex items-center">
                        Comment by
                        <Image
                          src={comment.userClerkImageUrl}
                          alt={comment.userClerkName}
                          width={24}
                          height={24}
                          className="rounded-full inline-block mx-2"
                        />
                        {comment.userClerkName} on {formatCreationTime(comment._creationTime)}
                      </p>
                      <PopoverComponent commentId={comment._id}/>
                    </div>
                    <div className="flex items-center mb-2">
                      <LikeButton comment={comment} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
                      <LikesCounter likes={comment.likes} className="font-semibold text-gray-700"/>
                      <DisLikeButton comment={comment} username={user?.username || undefined} isSignedIn={isSignedIn || false} />
                    </div>
                  </div>
                  <div>
                    <Replies commentId={comment._id} />
                  </div>
                </div>
              </div>
            ))
            )}
        </div>
      </div>
    </main>
  );
};
