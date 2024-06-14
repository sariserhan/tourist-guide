"use client";

import { useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

const CommentCount = ({ postId }: {postId: Id<"posts">}) => {
  const commentCount = useQuery(api.comments.getAllCommentsCount, {
    postId
  });
  return <p>{commentCount}</p>;
};

export default CommentCount;
