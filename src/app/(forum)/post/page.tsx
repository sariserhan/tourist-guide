"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/../../convex/_generated/api";
import { Id } from "@/../../convex/_generated/dataModel"
import { ForumCategoriesProps } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { UploadFile } from "@/components/upload-file";

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
  const { isSignedIn } = useUser();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageStorageIds, setImageStorageIds] = useState<Id<"_storage">[] | undefined>([]);
  const storePost = useMutation(api.posts.addPost);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isSignedIn) {
      redirect('/sign-in')
    }
    const { title, article } = data;
    await storePost({
      title,
      article,
      country,
      city: city ?? "",
      category,
      imageUrls,
      imageStorageIds,
    });
    toast({
      description: "Article posted successfully",
    })
    city !== 'undefined' ?
      router.push('/forum?country=' + country  + '&category=' + category)
      :
      router.push('/forum?country=' + country  + '&category=' + category + '&city=' + city);
    router.refresh();
  };

  return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="flex flex-col mb-4 border p-5 gap-3">
            <h1 className="text-2xl font-bold pb-5">Post Article</h1>
            <h2 className="font-semibold pb-5">
                Country: <span className="font-normal">{country}</span><br />
              {
                city && city.length > 0 &&
                <p>
                  City: <span className="font-normal">{city}</span>
                </p>
              }
                Category: <span className="font-normal">{category}</span>
            </h2>
            <Input id="title" type="text" placeholder="Title" {...register("title")} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            <Textarea id="article" placeholder="Article" {...register("article")} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            {errors.article && <span className="text-red-500">{errors.article.message}</span>}
            <UploadFile
              setImages={setImageUrls}
              setImageStorageIds={setImageStorageIds}
              images={imageUrls}
            />
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</Button>
          </div>
        </form>
      </div>
  );
};

export default Post;
