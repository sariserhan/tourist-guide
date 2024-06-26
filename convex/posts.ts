import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const addPost = mutation({
    args: {
        title: v.string(),
        article: v.string(),
        country: v.string(),
        city: v.optional(v.string()),
        category: v.string(),
        imageUrls: v.optional(v.array(v.string())),
        imageStorageIds: v.optional(v.array(v.id("_storage"))),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new ConvexError("User not authenticated");

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), identity.email))
            .collect();

        if (user.length === 0) throw new ConvexError("User not found");

        return await ctx.db.insert("posts", {
            title: args.title,
            article: args.article,
            likes: 0,
            country: args.country,
            imageUrls: args.imageUrls,
            imageStorageIds: args.imageStorageIds,
            city: args.city ?? "",
            category: args.category,
            authorName: user[0].userName,
            authorId: user[0].clerkId,
            authorImageUrl: user[0].imageUrl,
            upvotedBy: [],
            downvotedBy: [],
        });
    }
});

export const getPost = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.postId as Id<"posts">);
    },
});

export const getPostLikes = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId as Id<"posts">);
        return post && post.likes;
    },
});

// this mutation is required to generate the url after uploading the file to the storage.
export const getStorageUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const listPosts = query({
    args: {
        country: v.string(),
        city: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
        .query("posts")
        .filter((q) => q.eq(q.field("country"), args.country))
        .filter((q) => q.eq(q.field("city"), args.city ?? ""))
        .filter((q) => q.eq(q.field("category"), args.category))
        .order("desc")
        .collect();
    },
});

export const getUpvoteList = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new ConvexError("Post not found");
        }

        return post.upvotedBy;
    },
});

export const getDownvoteList = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new ConvexError("Post not found");
        }

        return post.downvotedBy;
    },
});

export const upvotePost = mutation({
    args: {
        postId: v.id("posts"),
        votingUser: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new ConvexError("Post not found");
        }

        post.upvotedBy.includes(args.votingUser) ?
        await ctx.db.patch(args.postId, {
            likes: post.likes - 1,
            upvotedBy: post.upvotedBy.filter((user) => user !== args.votingUser),
        })
        :
        await ctx.db.patch(args.postId, {
            likes: post.likes + 1,
            upvotedBy: [...post.upvotedBy, args.votingUser],
            downvotedBy: post.downvotedBy.filter((user) => user !== args.votingUser),
        });
        return post.likes;
    },
});

export const downvotePost = mutation({
    args: {
        postId: v.id("posts"),
        votingUser: v.string(),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new ConvexError("Post not found");
        }

        post.downvotedBy.includes(args.votingUser) ?
        await ctx.db.patch(args.postId, {
            likes: post.likes + 1,
            downvotedBy: post.downvotedBy.filter((user) => user !== args.votingUser),
        })
        :
        await ctx.db.patch(args.postId, {
            likes: post.likes - 1,
            downvotedBy: [...post.downvotedBy, args.votingUser],
            upvotedBy: post.upvotedBy.filter((user) => user !== args.votingUser),
        });
        return post.likes;
    },
});

export const deletePost = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.postId);
        return true;
    },
});
