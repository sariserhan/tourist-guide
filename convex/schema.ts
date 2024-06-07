import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { schemaToMermaid } from "convex-schema-mermaid";

const schema = defineSchema({
    users: defineTable({
        email: v.string(),
        userName: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
    }),

    posts: defineTable({
        title: v.string(),
        article: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.union(v.id("_storage"), v.null())),
        likes: v.number(),
        country: v.string(),
        city: v.string(),
        category: v.string(),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', { searchField: 'article' }),

    comments: defineTable({
        postId: v.id("posts"),
        userClerkId: v.string(),
        userClerkName: v.string(),
        userClerkImageUrl: v.string(),
        text: v.string(),
        likes: v.number(),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    })
    .searchIndex('search_postId', { searchField: 'postId' }),

    replies: defineTable({
        commentId: v.id("comments"),
        userClerkId: v.string(),
        userClerkName: v.string(),
        userClerkImageUrl: v.string(),
        text: v.string(),
        likes: v.number(),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    }),
});
// console.log(schemaToMermaid(schema));

export default schema;
