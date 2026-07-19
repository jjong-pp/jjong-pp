// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var articles = defineCollection({
  name: "articles",
  directory: "src/content/articles",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    role: z.string().optional()
  })
});
var content_collections_default = defineConfig({
  collections: [articles]
});
export {
  content_collections_default as default
};
