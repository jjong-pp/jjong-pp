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
  }),
  transform: async (document) => {
    const slugify = (text) => {
      return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
    };
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const headings = [];
    let m;
    while ((m = headingRegex.exec(document.content)) !== null) {
      const rawText = m[2].replace(/\*\*/g, "").trim();
      headings.push({
        id: slugify(rawText.replace(/^\d+\.\s*/, "")),
        text: rawText,
        level: m[1].length
      });
    }
    return {
      ...document,
      headings
    };
  }
});
var content_collections_default = defineConfig({
  collections: [articles]
});
export {
  content_collections_default as default
};
