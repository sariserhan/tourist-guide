import { mutation, query } from "./_generated/server";
import { ForumCardProps } from "../src/lib/types";
import { v } from "convex/values";

export const addPost = mutation({
    handler: async (ctx, args) => {
        const { title, article, createdBy, country, city, category, userImageUrl } = args as ForumCardProps;

        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("User not found")
        }

        const postId = await ctx.db.insert("forum", {
            title,
            article,
            likes: 0,
            country,
            city,
            category,
            createdBy,
            userImageUrl,
            upvotedBy: [],
            downvotedBy: [],
        });

        return postId;
    }
});

export const listPosts = query({
    args: {
        country: v.string(),
        city: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
      const posts = await ctx.db
        .query("forum")
        .filter((q) => q.eq(q.field("country"), args.country))
        .filter((q) => q.eq(q.field("city"), args.city))
        .filter((q) => q.eq(q.field("category"), args.category))
        .order("desc")
        .collect();

        return posts;
    },
});

export const getUpvoteList = query({
    args: {
        postId: v.id("forum"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        return post.upvotedBy;
    },
});

export const getDownvoteList = query({
    args: {
        postId: v.id("forum"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        return post.downvotedBy;
    },
});

export const upvotePost = mutation({
    args: {
        postId: v.id("forum"),
        userName: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(args.postId, {
            likes: post.likes + 1,
            upvotedBy: [...post.upvotedBy, args.userName],
            downvotedBy: post.downvotedBy.filter((user) => user !== args.userName),
        });
        return post.likes;
    },
});

export const neutralizeUpvote = mutation({
    args: {
        postId: v.id("forum"),
        userName: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(args.postId, {
            likes: post.likes - 1,
            upvotedBy: post.upvotedBy.filter((user) => user !== args.userName),
        });
        return post.likes;
    },
});

export const neutralizeDownvote = mutation({
    args: {
        postId: v.id("forum"),
        userName: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(args.postId, {
            likes: post.likes + 1,
            downvotedBy: post.downvotedBy.filter((user) => user !== args.userName),
        });
        return post.likes;
    },
});


export const downvotePost = mutation({
    args: {
        postId: v.id("forum"),
        userName: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(args.postId, {
            likes: post.likes - 1,
            downvotedBy: [...post.downvotedBy, args.userName],
            upvotedBy: post.upvotedBy.filter((user) => user !== args.userName),
        });
        return post.likes;
    },
});

export const deletePost = mutation({
    args: {
        postId: v.id("forum"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.postId);
        return true;
    },
});
