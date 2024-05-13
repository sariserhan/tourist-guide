import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        userName: v.string(),
    })
    .index("by_token", ["tokenIdentifier"]),

    forum: defineTable({
        title: v.string(),
        article: v.string(),
        likes: v.number(),
        // disLikes: v.number(),
        country: v.string(),
        city: v.string(),
        category: v.string(),
        createdBy: v.string(),
        userImageUrl: v.string(),
        upvotedBy: v.array(v.string()),
        downvotedBy: v.array(v.string()),
    })
});

