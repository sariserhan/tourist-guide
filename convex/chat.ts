import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addChatMessage = mutation({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
    senderName: v.string(),
    receiverName: v.string(),
    messages: v.object({
      senderName: v.string(),
      text: v.string(),
      timestamp: v.number(),
    })
  },
  handler: async (ctx, args) => {
    const chats = await ctx.db.query("chat").collect();
    const filteredChat = chats.map((chat) => {
      if (chat.chattingUsers.includes(args.senderId) && chat.chattingUsers.includes(args.receiverId)) {
        return chat
      }
    })
    filteredChat && filteredChat[0] ?
      await ctx.db.patch(filteredChat[0]?._id, {
        messages: [...filteredChat[0].messages, args.messages]
      })
    :
    await ctx.db.insert("chat", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      senderName: args.senderName,
      receiverName: args.receiverName,
      chattingUsers: [args.senderId, args.receiverId],
      messages: [args.messages],
    });
  }
});

export const getChatMessages = query({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
    const chattingUsers1 = [args.senderId, args.receiverId]
    const chattingUsers2 = [args.receiverId, args.senderId]
    const chatHistory = await ctx.db.query("chat")
    .filter((q) => q.eq(q.field("chattingUsers"), chattingUsers1))
    .collect();
    if (chatHistory.length > 0) {
      return chatHistory;
    }
      return await ctx.db.query("chat")
      .filter((q) => q.eq(q.field("chattingUsers"), chattingUsers2))
      .collect();
  },
});

export const listChatMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("chat").collect();
  },
});
