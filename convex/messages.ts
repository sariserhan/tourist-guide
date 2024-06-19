import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: {
    senderId: v.string(),
    senderName: v.string(),
    senderPicture: v.string(),
    receiverId: v.string(),
    receiverName: v.string(),
    receiverPicture: v.string(),
    text: v.string(),
    about: v.object({
      country: v.optional(v.string()),
      city: v.optional(v.string()),
      category: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      receiverName: args.receiverName,
      receiverPicture: args.receiverPicture,
      senderName: args.senderName,
      senderPicture: args.senderPicture,
      text: args.text,
      about: args.about,
      read: false,
    });
  }
});

export const getDistinctMessageFromSender = query({
  args: {
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
    .query("messages")
    .filter((q) => q.eq(q.field("receiverId"), args.receiverId))
    .collect()
    return (messages.map((message) => message.senderId))
      .filter((value, index, self) => self.indexOf(value) === index);
  },
});

export const getUnreadMessageCountFromReceiver = query({
  args: {
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
    .query("messages")
    .filter((q) => q.eq(q.field("receiverId"), args.receiverId))
    .filter((q) => q.eq(q.field("read"), false))
    .collect()
    return messages.length;
  },
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

export const getMessagesFromUser = query({
  args: {
    receiverId: v.string(),
    senderId: v.string(),
  },
  handler: async (ctx, args) => {
      return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("receiverId"), args.receiverId))
      .filter((q) => q.eq(q.field("senderId"), args.senderId))
      .order("asc")
      .collect();
  },
});

export const markAsRead = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.messageId, {
      read: true,
    });
  },
});
