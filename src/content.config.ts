import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const entries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/entries" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.enum(["project", "post", "map", "note", "case-study"]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    eyebrow: z.string().optional(),
    proof: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    image: z.string().optional(),
    images: z.array(imageSchema).default([]),
    externalUrl: z.string().optional(),
  }),
});

export const collections = { entries };
