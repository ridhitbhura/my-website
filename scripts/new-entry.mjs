import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const slug = process.argv[2];
const typeArg = process.argv.find((arg) => arg.startsWith("--type="));
const type = typeArg?.split("=")[1] ?? "post";

const allowedTypes = new Set(["project", "post", "map", "note", "case-study"]);

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new -- my-entry-slug --type=post");
  process.exit(1);
}

if (!allowedTypes.has(type)) {
  console.error(`Type must be one of: ${Array.from(allowedTypes).join(", ")}`);
  process.exit(1);
}

const dir = join(process.cwd(), "src/content/entries");
const filePath = join(dir, `${slug}.mdx`);

if (existsSync(filePath)) {
  console.error(`Entry already exists: ${filePath}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const title = slug
  .split("-")
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join(" ");

const today = new Date().toISOString().slice(0, 10);

writeFileSync(
  filePath,
  `---
title: "${title}"
summary: "One clear sentence about why this exists."
date: ${today}
type: "${type}"
featured: false
draft: true
eyebrow: ""
proof: ""
tags:
  - Draft
links: []
images: []
---

Write the entry here.
`,
);

console.log(`Created ${filePath}`);
