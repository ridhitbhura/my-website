# RidhitBhura.com

Personal site for applied AI/software engineering work, maps, and writing.

## Stack

- Astro
- MDX content collections
- TypeScript
- Tailwind CSS
- GitHub Pages

## Commands

Use Node 24 locally. CI also runs Node 24.

```bash
npm install
npm run dev
npm run new -- my-entry-slug --type=post
npm run validate
npm run build
npm run preview
```

## Content

Entries live in `src/content/entries/`. One collection powers projects, posts, notes, case studies, and maps.

Each entry is an MDX file with frontmatter:

```md
---
title: "Entry title"
summary: "One useful sentence."
date: 2026-07-01
type: "post"
featured: false
draft: true
tags:
  - Applied AI
links: []
images: []
---
```

Reusable site facts live in `src/data/site.ts`. Static files such as `Resume.pdf`, `agent.txt`, `llms.txt`, images, and `CNAME` live in `public/`.

## Deployment

Push to `main`. GitHub Actions runs `npm ci`, `npm run build`, uploads `dist`, and deploys GitHub Pages.
