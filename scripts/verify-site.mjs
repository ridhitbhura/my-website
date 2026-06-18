#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (arg.startsWith("--")) {
    const [key, inlineValue] = arg.slice(2).split("=", 2);
    const value = inlineValue ?? process.argv[i + 1];
    args.set(key, value === undefined || value.startsWith("--") ? "true" : value);
    if (inlineValue === undefined && value && !value.startsWith("--")) i += 1;
  }
}

const root = path.resolve(args.get("dist") ?? "public");
const port = Number(args.get("port") ?? 4173);
const shouldServe = args.get("serve") === "true";
const baseUrl = `http://127.0.0.1:${port}`;
const failures = [];
const warnings = [];

const expectedFiles = [
  "index.html",
  "gallery/index.html",
  "blogs/index.html",
  "blogs/india-voting-blog/index.html",
  "index.json",
  "index.xml",
  "sitemap.xml",
  "robots.txt",
  "agent.txt",
  "llms.txt",
  "CNAME",
  "favicon.png",
  "favicon.ico",
];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

async function fileText(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function normalizeLocalUrl(rawUrl, fromFile) {
  if (!rawUrl || rawUrl.startsWith("#")) return null;
  if (/^(mailto|tel|sms|javascript):/i.test(rawUrl)) return null;
  if (rawUrl.startsWith("//")) return null;

  let pathname = rawUrl.split(/[?#]/, 1)[0];
  let baseDir = path.dirname(fromFile);

  if (/^https?:\/\//i.test(rawUrl)) {
    let parsed;
    try {
      parsed = new URL(rawUrl);
    } catch {
      return null;
    }
    if (parsed.hostname !== "ridhitbhura.com") return null;
    pathname = parsed.pathname;
    baseDir = "";
  } else if (rawUrl.startsWith("/")) {
    baseDir = "";
  }

  const withoutSlash = decodeURIComponent(pathname.replace(/^\/+/, ""));
  const candidate =
    withoutSlash === "" ? "index.html" : withoutSlash.endsWith("/") ? `${withoutSlash}index.html` : withoutSlash;
  const withIndex = path.extname(candidate) ? candidate : `${candidate}/index.html`;
  const normalized = path.normalize(path.join(baseDir, withIndex));
  return normalized.startsWith("..") ? null : normalized;
}

function extractUrls(html) {
  const urls = [];
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrPattern.exec(html))) urls.push(match[1]);
  return urls;
}

async function walk(dir, base = dir) {
  const entries = await import("node:fs/promises").then((fs) => fs.readdir(dir, { withFileTypes: true }));
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute, base)));
    else files.push(path.relative(base, absolute));
  }
  return files;
}

function contentText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function checkExpectedFiles() {
  for (const relativePath of expectedFiles) {
    const absolute = path.join(root, relativePath);
    if (!existsSync(absolute)) {
      fail(`Missing expected static output: ${relativePath}`);
      continue;
    }
    const info = await stat(absolute);
    if (info.size === 0) fail(`Expected static output is empty: ${relativePath}`);
  }
}

async function checkContent() {
  const home = await fileText("index.html");
  const homeText = contentText(home);
  for (const phrase of ["Ridhit Bhura", "Applied AI", "maps", "agent.txt", "llms.txt"]) {
    if (!homeText.includes(phrase)) fail(`Homepage is missing expected phrase: ${phrase}`);
  }

  const agentText = await fileText("agent.txt");
  if (!agentText.includes("preferred_agent_actions")) fail("agent.txt is missing agent guidance.");

  const llmsText = await fileText("llms.txt");
  if (!llmsText.includes("## Agent Guidance")) fail("llms.txt is missing agent guidance.");

  const gallery = await fileText("gallery/index.html");
  const galleryImages = [...gallery.matchAll(/<img\b/gi)].length;
  if (galleryImages < 10) fail(`Gallery rendered only ${galleryImages} images; expected at least 10.`);

  const blog = await fileText("blogs/india-voting-blog/index.html");
  if (!contentText(blog).includes("How India")) fail("India voting blog page did not render its title/content.");

  const indexJson = JSON.parse(await fileText("index.json"));
  if (!Array.isArray(indexJson) || indexJson.length === 0) {
    fail("index.json is not a non-empty search/feed array.");
  }

  const robots = await fileText("robots.txt");
  if (!/Sitemap:/i.test(robots)) warn("robots.txt does not advertise a sitemap.");
}

async function checkLocalLinks() {
  const htmlFiles = (await walk(root)).filter((file) => file.endsWith(".html"));
  for (const htmlFile of htmlFiles) {
    const html = await fileText(htmlFile);
    for (const rawUrl of extractUrls(html)) {
      const localPath = normalizeLocalUrl(rawUrl, htmlFile);
      if (!localPath) continue;
      if (!existsSync(path.join(root, localPath))) {
        fail(`${htmlFile} references missing local asset or page: ${rawUrl} -> ${localPath}`);
      }
    }
  }
}

async function checkBudgets() {
  const files = await walk(root);
  let totalBytes = 0;
  for (const file of files) totalBytes += (await stat(path.join(root, file))).size;
  const homeBytes = (await stat(path.join(root, "index.html"))).size;
  const totalMb = totalBytes / 1024 / 1024;
  if (totalMb > 20) warn(`Built site is ${totalMb.toFixed(1)} MB; inspect image/vendor weight.`);
  if (homeBytes > 80_000) warn(`Homepage HTML is ${(homeBytes / 1024).toFixed(1)} KB; keep first load lean.`);
}

async function startServer() {
  const mimeTypes = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".xml": "application/xml",
  };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", baseUrl);
    const requestPath = decodeURIComponent(url.pathname);
    const relativePath = requestPath.endsWith("/")
      ? `${requestPath.slice(1)}index.html`
      : requestPath.slice(1);
    const filePath = path.join(root, relativePath || "index.html");
    try {
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error("not a file");
      response.setHeader("content-type", mimeTypes[path.extname(filePath)] ?? "application/octet-stream");
      response.end(await readFile(filePath));
    } catch {
      response.statusCode = 404;
      response.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return server;
}

async function checkHttpRoutes() {
  const routes = [
    "/",
    "/gallery/",
    "/blogs/",
    "/blogs/india-voting-blog/",
    "/index.json",
    "/sitemap.xml",
    "/robots.txt",
    "/agent.txt",
    "/llms.txt",
  ];
  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`);
    if (!response.ok) fail(`HTTP ${response.status} for ${route}`);
  }
}

async function main() {
  if (!existsSync(root)) {
    console.error(`Static output directory does not exist: ${root}`);
    process.exit(1);
  }

  await checkExpectedFiles();
  await checkContent();
  await checkLocalLinks();
  await checkBudgets();

  let server;
  if (shouldServe) {
    server = await startServer();
    await checkHttpRoutes();
    server.close();
  }

  for (const message of warnings) console.warn(`WARN: ${message}`);
  if (failures.length > 0) {
    for (const message of failures) console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`Verified ${root}${shouldServe ? ` via ${baseUrl}` : ""}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
