import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
        throw new Error("User not found")
    }

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});
