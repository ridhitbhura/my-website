import { defineCollection, z } from "astro:content";

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const linkSchema = z.object({
  label: z.string().optional(),
  href: z.string(),
  icon: z.string().optional(),
  kind: z.enum(["website", "github", "demo", "social", "email", "download"]).optional(),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: imageSchema.optional(),
    featured: linkSchema.optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    order: z.number().int().nonnegative().default(999),
    draft: z.boolean().default(false),
  }),
});

const maps = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    image: imageSchema,
    topic: z.enum(["elections", "demographics", "world", "other"]).default("other"),
    region: z.string().optional(),
    year: z.number().int().optional(),
    sourceUrl: z.string().optional(),
    post: z.string().optional(),
    order: z.number().int().nonnegative().default(999),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Ridhit Bhura"),
    tags: z.array(z.string()).default([]),
    heroImage: imageSchema.optional(),
    repoUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const profile = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    intro: z.string(),
    bio: z.array(z.string()).default([]),
    avatar: imageSchema,
    socials: z.array(linkSchema).default([]),
    experience: z.array(
      z.object({
        role: z.string(),
        organization: z.string(),
        organizationUrl: z.string().optional(),
        date: z.string(),
        location: z.string().optional(),
      }),
    ).default([]),
    education: z.array(
      z.object({
        credential: z.string(),
        school: z.string(),
        schoolUrl: z.string().optional(),
        date: z.string(),
        notes: z.array(z.string()).default([]),
      }),
    ).default([]),
  }),
});

const agent = defineCollection({
  type: "data",
  schema: z.object({
    siteName: z.string(),
    canonicalUrl: z.string().url(),
    owner: z.string(),
    description: z.string(),
    primaryTopics: z.array(z.string()).default([]),
    preferredContact: z.string(),
    routes: z.array(
      z.object({
        path: z.string(),
        purpose: z.string(),
        generatedFrom: z.string().optional(),
      }),
    ).default([]),
    usageNotes: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
  maps,
  posts,
  profile,
  agent,
};
