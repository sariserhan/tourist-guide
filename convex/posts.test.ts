import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

// test("sending messages", async () => {
//   const t = convexTest(schema);
//   await t.mutation(api.posts.send, { body: "Hi!", author: "Sarah" });
//   await t.mutation(api.posts.send, { body: "Hey!", author: "Tom" });
//   const messages = await t.query(api.posts.list);
//   expect(messages).toMatchObject([
//     { body: "Hi!", author: "Sarah" },
//     { body: "Hey!", author: "Tom" }
//   ]);
// });
