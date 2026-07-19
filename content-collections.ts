import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const articles = defineCollection({
  name: 'articles',
  directory: 'src/content/articles',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    role: z.string().optional(),
  }),
});

export default defineConfig({
  collections: [articles],
});
