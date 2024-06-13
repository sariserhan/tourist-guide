"use server";

import { fetchMutation } from 'convex/nextjs';
import { api } from "../../convex/_generated/api";
import { Id } from '../../convex/_generated/dataModel';
import { toast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';

export async function createComment(postId: Id<"posts">, userClerkId: string, userClerkName: string, userClerkImageUrl: string, text: string) {
    return await fetchMutation(api.comments.createComment, {
      postId,
      userClerkId,
      userClerkName,
      userClerkImageUrl,
      text,
    });
}
