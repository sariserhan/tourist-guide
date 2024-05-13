"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { redirect, useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { ForumCategoriesProps } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";


// Define the schema for form data validation using Zod
const schema = z.object({
  title: z.string(),
  article: z.string(),
});

// Define types for form data
type FormData = z.infer<typeof schema>;

const Post = ({searchParams}: {searchParams: ForumCategoriesProps}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast()
  const { country, category, city } = searchParams;
  const {isSignedIn, user } = useUser();
  const storePost = useMutation(api.posts.addPost);
  const router = useRouter(); // Add this line to import the useRouter hook

  // Define submit handler function
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isSignedIn) {
      redirect(process.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL as string)
    }
    const { title, article } = data;
    const createdBy = user.username;
    const userImageUrl = user.imageUrl;
    await storePost({ title, article, createdBy, country, category, city, userImageUrl });
    toast({
      description: "Article posted successfully",
    })
    router.push('/forum?country=' + country + '&city=' + city + '&category=' + category);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <Input id="title" type="text" {...register("title")} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="article" className="block text-gray-700">Article</label>
          <Textarea id="article" {...register("article")} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors.article && <span className="text-red-500">{errors.article.message}</span>}
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</Button>
      </form>
    </div>
  );
};

export default Post;
