import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createReply = mutation({
    args: {
        commentId: v.id("comments"),
        userClerkId: v.string(),
        userClerkName: v.string(),
        userClerkImageUrl: v.string(),
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const comment = await ctx.db.get(args.commentId);
        if (!comment) {
            throw new ConvexError("Comment not found");
        }
        return await ctx.db.insert("replies", {
            commentId: args.commentId,
            userClerkId: args.userClerkId,
            userClerkName: args.userClerkName,
            userClerkImageUrl: args.userClerkImageUrl,
            text: args.text,
            likes: 0,
            upvotedBy: [],
            downvotedBy: [],
        });
    },
});

export const getRepliesByCommentId = query({
    args: {
        commentId: v.id("comments"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
        .query("replies")
        .filter((q) => q.eq(q.field("commentId"), args.commentId))
        .order("desc")
        .collect();
    },
});

export const upvoteReply = mutation({
    args: {
        replyId: v.id("replies"),
        votingUser: v.string(),
    },
    handler: async (ctx, args) => {
        const reply = await ctx.db.get(args.replyId);
        if (!reply) {
            throw new ConvexError("Reply not found");
        }
        reply.upvotedBy.includes(args.votingUser) ?
        await ctx.db.patch(args.replyId, {
            likes: reply.likes - 1,
            upvotedBy: reply.upvotedBy.filter((id) => id !== args.votingUser),
        }) :
        await ctx.db.patch(args.replyId, {
            likes: reply.likes + 1,
            upvotedBy: [...reply.upvotedBy, args.votingUser],
            downvotedBy: reply.downvotedBy.filter((id) => id !== args.votingUser),
        });
    },
});

export const downvoteReply = mutation({
    args: {
        replyId: v.id("replies"),
        votingUser: v.string(),
    },
    handler: async (ctx, args) => {
        const reply = await ctx.db.get(args.replyId);
        if (!reply) {
            throw new ConvexError("Reply not found");
        }
        reply.downvotedBy.includes(args.votingUser) ?
        await ctx.db.patch(args.replyId, {
            likes: reply.likes + 1,
            downvotedBy: reply.downvotedBy.filter((id) => id !== args.votingUser),
        }) :
        await ctx.db.patch(args.replyId, {
            likes: reply.likes - 1,
            upvotedBy: reply.upvotedBy.filter((id) => id !== args.votingUser),
            downvotedBy: [...reply.downvotedBy, args.votingUser],
        });
    },
});

export const deleteReply = mutation({
    args: {
        replyId: v.id("replies"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.replyId);
        return true;
    },
});

export const deleteReplyByCommentId = mutation({
    args: {
        commentId: v.id("comments"),
    },
    handler: async (ctx, args) => {
        const allRepliesToDelete = await ctx.db.query("replies").filter((q) => q.eq(q.field("commentId"), args.commentId)).collect();
        allRepliesToDelete.map(async (reply) => {
            await ctx.db.delete(reply._id);
        });
        return true;
    },
});
