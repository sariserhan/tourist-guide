import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createComment = mutation({
    args: {
      postId: v.id("posts"),
      userClerkId: v.string(),
      userClerkName: v.string(),
      userClerkImageUrl: v.string(),
      text: v.string(),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("comments", {
        postId: args.postId,
        userClerkId: args.userClerkId,
        userClerkName: args.userClerkName,
        userClerkImageUrl: args.userClerkImageUrl,
        text: args.text,
        likes: 0,
        upvotedBy: [],
        downvotedBy: [],
      });
    }
});

export const getCommentByPostId = query({
    args: {
      postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

export const getAllComments = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
    .query("comments")
    .filter((q) => q.eq(q.field("postId"), args.postId))
    .order("desc")
    .collect();
  },
});

export const getAllCommentsCount = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
    .query("comments")
    .filter((q) => q.eq(q.field("postId"), args.postId))
    .collect();
    return comments.length;
  },
});

// export const addReplyToComment = mutation({
//   args: {
//     replyId: v.id("replies"),
//     commentId: v.id("comments"),
//   },
//   handler: async (ctx, args) => {
//     const comment = await ctx.db.get(args.commentId);
//     if (!comment) {
//         throw new ConvexError("Comment not found");
//     }
//   await ctx.db.patch(args.commentId, {
//     repliesId: [...comment.repliesId, args.replyId],
//   });
//   return comment.repliesId;
//   }
// });

export const upvoteComment = mutation({
  args: {
    commentId: v.id("comments"),
    votingUser: v.string(),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new ConvexError("Comment not found");
    }
    comment.upvotedBy.includes(args.votingUser) ?
    await ctx.db.patch(args.commentId, {
      likes: comment.likes - 1,
      upvotedBy: comment.upvotedBy.filter((user) => user !== args.votingUser),
    })
      :
    await ctx.db.patch(args.commentId, {
      likes: comment.likes + 1,
      upvotedBy: [...comment.upvotedBy, args.votingUser],
      downvotedBy: comment.downvotedBy.filter((user) => user !== args.votingUser),
    });
    return comment.likes;
  },
});

export const downvoteComment = mutation({
  args: {
    commentId: v.id("comments"),
    votingUser: v.string(),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new ConvexError("Comment not found");
    }

    comment.downvotedBy.includes(args.votingUser) ?
    await ctx.db.patch(args.commentId, {
      likes: comment.likes + 1,
      downvotedBy: comment.downvotedBy.filter((user) => user !== args.votingUser),
    })
    :
    await ctx.db.patch(args.commentId, {
      likes: comment.likes - 1,
      downvotedBy: [...comment.downvotedBy, args.votingUser],
      upvotedBy: comment.upvotedBy.filter((user) => user !== args.votingUser),
    });
    return comment.likes;
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.commentId);
    return true;
  },
});

export const deleteCommentsByPost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const allCommentsToDelete = await ctx.db.query("comments").filter((q) => q.eq(q.field("postId"), args.postId)).collect();
    allCommentsToDelete.map(async (comment) => {
      await ctx.db.delete(comment._id);
    });
    return allCommentsToDelete;
  },
});

export const editComment = mutation({
  args: {
    commentId: v.id("comments"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.commentId, { text: args.text });
    return true;
  },
});
