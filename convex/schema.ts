import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user: defineTable({
        email: v.string(),
        userName: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
    }),


    post: defineTable({
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
        comments: v.optional(
            v.array(
                v.object({
                    commentId: v.id("comment"),
                    commentText: v.string(),
                    commentAuthor: v.string(),
                    commentAuthorId: v.string(),
                    commentAuthorImageUrl: v.string(),
                })
            )
        ),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', { searchField: 'article' }),

    // comment: defineTable({
    //     postId: v.id("post"),
    //     text: v.string(),
    //     authorId: v.id("user"),
    //     authorName: v.string(),
    //     authorImageUrl: v.string(),
    //     likes: v.number(),
    //     upvotedBy: v.array(v.id("user")),
    //     downvotedBy: v.array(v.id("user")),
    // })
});

