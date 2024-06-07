"use client";

import Image from "next/image";
import Divider from "@/components/divider";
import Replies from "@/components/replies";
import DeleteComponent from "@/components/delete-component";
import { z } from "zod";
import { notFound, useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { api } from "@/../convex/_generated/api";
import { Id, Doc } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { ReplyIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCreationTime } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import PopoverComponent from "@/components/popover-component";

interface paramsProps {
  slug: Id<"posts">
}

// interface PostValue {
//   _id: Id<"posts">;
//   _creationTime: number;
//   article: string;
//   author: string;
//   authorId: string;
//   authorImageUrl: string;
//   category: string;
//   city: string;
//   country: string;
//   downvotedBy: string[];
//   imageStorageId: string;
//   imageUrl: string;
//   likes: number;
//   title: string;
//   upvotedBy: string[];
// }

export default function SlugPage({ params }: { params: paramsProps }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const postId = params.slug as Id<"posts">;
  const router = useRouter();
  const posts = useQuery(api.posts.getPost, { postId });
  const setUpvote = useMutation(api.posts.upvotePost);
  const setDownvote = useMutation(api.posts.downvotePost);
  const setUpvoteComment = useMutation(api.comments.upvoteComment);
  const setDownvoteComment = useMutation(api.comments.downvoteComment);
  const getAllComments = useQuery(api.comments.getAllComments, { postId });
  const createReply = useMutation(api.replies.createReply);
  const createComment = useMutation(api.comments.createComment);
  const FormSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }),
  });

  const FormSchemaComment = z.object({
    reply: z.string().min(2, {
      message: "Reply must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const formComment = useForm<z.infer<typeof FormSchemaComment>>({
    resolver: zodResolver(FormSchemaComment),
    defaultValues: {
      reply: "",
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
  } = posts as Doc<"posts">;

  const idAndUser = { postId: id, votingUser: user?.username! };

  const handleDownVote = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    await setDownvote(idAndUser);
  }

  const handleUpVote = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    await setUpvote(idAndUser);
  }

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

  const onSubmitReply = async (data: z.infer<typeof FormSchemaComment>, commentId: Id<"comments">) => {
    setIsPopoverOpen(false);
    await createReply({
      commentId,
      userClerkId: user?.id!,
      userClerkName: user?.username!,
      userClerkImageUrl: user?.imageUrl!,
      text: data.reply
    });
    formComment.reset({ reply: '' });
    toast({
      title: "Reply Submitted!"
    });
  };

  return (
    <main className="min-h-screen backdrop-filter backdrop-blur-xl bg-gray-100">
      <div className="flex items-center justify-center px-32 py-20">
        <div className="border-t border-gray-300 p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl">
          <div className="flex flex-row-reverse">
            {isSignedIn && user.username === author &&
              <DeleteComponent
                postId={id}
                country={country}
                city={city}
                category={category}
                imageStorageId={imageStorageId as Id<"_storage">}
              />
            }
          </div>
          <h1 className="text-xl font-bold mb-4">{title}</h1>
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
                    {isSignedIn && user.username === author &&
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
                      {/* LIKE BUTTON */}
                      <Button
                        variant={comment.upvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                        onClick={async () =>
                          {
                            if (!isSignedIn) {
                              router.push("/sign-in");
                              return;
                            }
                            await setUpvoteComment({ commentId: comment._id, votingUser: user.username! })
                          }
                        }
                        className="rounded-full "
                        size="smallIcon"
                      >
                        <ThumbsUpIcon className="w-3 h-3 text-green-500" />
                      </Button>
                      <p className="mx-2 font-semibold text-sm text-gray-700">{comment.likes}</p>
                      {/* DISLIKE BUTTON */}
                      <Button
                        variant={comment.downvotedBy.includes(user?.username!) ? "secondary" : "outline"}
                        onClick={async () =>
                          {
                            if (!isSignedIn) {
                              router.push("/sign-in");
                              return;
                            }
                              await setDownvoteComment({ commentId: comment._id, votingUser: user.username! });
                          }
                        }
                        className="rounded-full"
                        size="smallIcon"
                      >
                        <ThumbsDownIcon className="w-3 h-3 text-red-500" />
                      </Button>
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
