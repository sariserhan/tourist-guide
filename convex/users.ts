import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const getUserById = query({
  args: {
    clerkId: v.string()
  },
  handler: async (ctx, args) => {
    if (args.clerkId === 'guest') {
      return
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    return user;
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      userName: args.userName,
      chatReceivedFrom: [],
      isOnline: true,
    });
  },
});

export const getChatReceivedFrom = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user.chatReceivedFrom;
  },
});

export const getOnlineUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").filter((q) => q.eq(q.field("isOnline"), true)).collect();
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      userName: args.userName,
      email: args.email,
    });
  },
});

export const updateUserSession = internalMutation({
  args: {
    clerkId: v.string(),
    isOnline: v.boolean(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      isOnline: args.isOnline,
    });
  },
});

export const addChatReceivedFrom = mutation({
  args: {
    clerkId: v.string(),
    senderId: v.string()
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      chatReceivedFrom: [...user.chatReceivedFrom, args.senderId],
    });
  },
});

export const removeChatReceivedFrom = mutation({
  args: {
    clerkId: v.string(),
    senderId: v.string()
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      chatReceivedFrom: user.chatReceivedFrom.filter((id) => id !== args.senderId),
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});
