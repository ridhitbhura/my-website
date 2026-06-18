import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    image: z.string().optional(),
    toc: z.unknown().optional()
  })
});

export const collections = { blogs };
