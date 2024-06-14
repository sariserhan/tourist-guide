import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { schemaToMermaid } from "convex-schema-mermaid";

const schema = defineSchema({
    users: defineTable({
        email: v.string(),
        userName: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
        interestedCountries: v.array(v.string()),
        isOnline: v.boolean(),
    })
    .searchIndex('search_clerkId', { searchField: 'clerkId' }),

    posts: defineTable({
        title: v.string(),
        article: v.string(),
        imageUrls: v.optional(v.array(v.string())),
        imageStorageIds: v.optional(v.array(v.id("_storage"))),
        likes: v.number(),
        country: v.string(),
        city: v.string(),
        category: v.string(),
        authorName: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    })
    .searchIndex('search_author', { searchField: 'authorName' })
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

    messages: defineTable({
        senderId: v.string(),
        receiverId: v.string(),
        senderName: v.string(),
        receiverName: v.string(),
        text: v.string(),
    })
    .searchIndex('search_senderId', { searchField: 'senderId' })
    .searchIndex('search_receiverId', { searchField: 'receiverId' }),
});
// console.log(schemaToMermaid(schema));

export default schema;
