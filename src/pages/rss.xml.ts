import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { byDateDesc, entryHref, isWritingEntry, profile } from "../data/site";

export async function GET(context: { site: URL }) {
  const entries = (await getCollection("entries", ({ data }) => !data.draft))
    .filter(isWritingEntry)
    .sort(byDateDesc);

  return rss({
    title: `${profile.name} writing`,
    description: "Technical notes, maps, and case studies by Ridhit Bhura.",
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: entryHref(entry),
      categories: entry.data.tags,
    })),
  });
}
