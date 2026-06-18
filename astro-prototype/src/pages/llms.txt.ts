import { getCollection, getEntry } from "astro:content";

export async function GET() {
  const [site, posts, projects, maps] = await Promise.all([
    getEntry("agent", "site"),
    getCollection("posts", ({ data }) => !data.draft),
    getCollection("projects", ({ data }) => !data.draft),
    getCollection("maps", ({ data }) => !data.draft),
  ]);

  if (!site) {
    return new Response("Missing agent metadata", { status: 500 });
  }

  const canonical = site.data.canonicalUrl.replace(/\/$/, "");
  const lines = [
    `# ${site.data.siteName}`,
    "",
    site.data.description,
    "",
    "## Canonical Pages",
    `- Home: ${canonical}/`,
    `- Blog: ${canonical}/blogs/`,
    `- Maps: ${canonical}/gallery/`,
    "",
    "## Posts",
    ...posts.map((post) => `- ${post.data.title}: ${canonical}/blogs/${post.slug}/`),
    "",
    "## Projects",
    ...projects
      .sort((a, b) => a.data.order - b.data.order)
      .map((project) => `- ${project.data.title}: ${project.data.summary}`),
    "",
    "## Maps",
    ...maps
      .sort((a, b) => a.data.order - b.data.order)
      .map((map) => `- ${map.data.title}: ${map.data.image.src}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
