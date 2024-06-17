import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createContactMessage = mutation({
  args: {
    contact_name: v.string(),
    contact_email: v.string(),
    contact_message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contact", {
      contact_name: args.contact_name,
      contact_email: args.contact_email,
      contact_message: args.contact_message,
    });
  }
});

export const listContactMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("contact").collect();
  },
});

export const deleteContactMessage = mutation({
  args: {
    id: v.id("contact"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getContactMessage = query({
  args: {
    id: v.id("contact"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
