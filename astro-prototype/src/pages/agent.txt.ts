import { getEntry } from "astro:content";

export async function GET() {
  const site = await getEntry("agent", "site");

  if (!site) {
    return new Response("Missing agent metadata", { status: 500 });
  }

  const body = [
    `Site: ${site.data.siteName}`,
    `Canonical: ${site.data.canonicalUrl}`,
    `Owner: ${site.data.owner}`,
    `Description: ${site.data.description}`,
    `Preferred contact: ${site.data.preferredContact}`,
    "",
    "Primary topics:",
    ...site.data.primaryTopics.map((topic) => `- ${topic}`),
    "",
    "Usage notes:",
    ...site.data.usageNotes.map((note) => `- ${note}`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
