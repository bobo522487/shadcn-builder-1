import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const componentValue = v.object({
  id: v.string(),
  type: v.string(),
  category: v.optional(v.string()),
  attributes: v.optional(v.any()),
  properties: v.optional(v.any()),
  overrides: v.optional(v.any()),
  children: v.optional(v.array(v.any())),
});

export default defineSchema({
  forms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    components: v.array(componentValue), // Form definition snapshot
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    userId: v.optional(v.string()), // For user-specific forms
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created_at", ["createdAt"])
    .index("by_category", ["category"]),
});
