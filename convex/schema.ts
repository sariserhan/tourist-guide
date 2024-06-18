import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
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
        senderPicture: v.string(),
        receiverName: v.string(),
        receiverPicture: v.string(),
        text: v.string(),
        about: v.object({
            country: v.optional(v.string()),
            city: v.optional(v.string()),
            category: v.optional(v.string()),
        }),
        read: v.boolean(),
    })
    .searchIndex('search_senderId', { searchField: 'senderId' })
    .searchIndex('search_receiverId', { searchField: 'receiverId' }),

    contact: defineTable({
        contact_name: v.string(),
        contact_email: v.string(),
        contact_message: v.string(),
    }),

    chat: defineTable({
        senderId: v.string(),
        receiverId: v.string(),
        senderName: v.string(),
        receiverName: v.string(),
        chattingUsers: v.array(v.string()),
        messages: v.array(v.object({
            senderName: v.string(),
            text: v.string(),
            timestamp: v.number(),
        })),
    })
});
// console.log(schemaToMermaid(schema));

export default schema;
