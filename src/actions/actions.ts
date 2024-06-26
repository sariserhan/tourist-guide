"use server";

import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from "../../convex/_generated/api";
import { Id } from '../../convex/_generated/dataModel';

export async function createComment(postId: Id<"posts">, userClerkId: string, userClerkName: string, userClerkImageUrl: string, text: string) {
    return await fetchMutation(api.comments.createComment, {
      postId,
      userClerkId,
      userClerkName,
      userClerkImageUrl,
      text,
    });
}

export async function getCommentCount(postId: Id<"posts">) {
    return await fetchQuery(api.comments.getAllCommentsCount, {
      postId
    });
}
