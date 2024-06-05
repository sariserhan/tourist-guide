// import { mutation, query } from "./_generated/server";
// import { ConvexError, v } from "convex/values";

// export const addPost = mutation({
//     args: {
//         text: v.string(),
//         authorId: v.id("_user"),
//         authorName: v.string(),
//         authorImageUrl: v.string(),
//         likes: v.string(),
//         upvotedBy: v.array(v.string()),
//         downvotedBy: v.array(v.string()),
//         postId: v.id("_post"),
//     },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) throw new ConvexError("User not authenticated");

//         const user = await ctx.db
//             .query("user")
//             .filter((q) => q.eq(q.field("email"), identity.email))
//             .collect();

//         if (user.length === 0) throw new ConvexError("User not found");

//         return await ctx.db.insert("comment", {
//             postId: post[0]._id,
//             authorId: user[0]._id,
//             text: args.text,
//             likes: 0,
//             author: args.authorName,
//             authorImageUrl: user[0].imageUrl,
//             upvotedBy: [],
//             downvotedBy: [],
//         });
//     }
// });
