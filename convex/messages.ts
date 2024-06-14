import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createMessage = mutation({
  args: {
    senderId: v.string(),
    senderName: v.string(),
    receiverId: v.string(),
    receiverName: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) throw new ConvexError("User not found");

    return await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      receiverName: args.receiverName,
      senderName: args.senderName,
      text: args.text,
    });
  }
});

export const listMessages = query({
  args: {
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
      return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("receiverId"), args.receiverId))
      .order("desc")
      .collect();
  },
});
