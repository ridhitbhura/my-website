export type Link = {
  label: string;
  href: string;
};

import type { CollectionEntry } from "astro:content";

export type SiteEntry = CollectionEntry<"entries">;

export const profile = {
  name: "Ridhit Bhura",
  role: "Applied AI / Software Engineer",
  headline: "Software engineer building applied AI systems.",
  subline: "Mostly I build practical AI workflows at GEICO. Sometimes I make maps of elections and political geography.",
  blurb:
    "I build practical AI workflows, backend systems, and data-rich tools. Maps and political geography are my public creative thread.",
  email: "mailto:rb749@cornell.edu",
  location: "New York City",
};

export const navLinks: Link[] = [
  { label: "Work", href: "/work/" },
  { label: "Writing", href: "/writing/" },
  { label: "Maps", href: "/maps/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "mailto:rb749@cornell.edu" },
];

export const socialLinks: Link[] = [
  { label: "GitHub", href: "https://github.com/ridhitbhura" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ridhit" },
  { label: "X / Maps", href: "https://x.com/RidhitMaps" },
];

export const proofPoints = [
  "Applied AI at GEICO",
  "Cornell CS",
  "LLM workflows + data systems",
  "Maps and election visualization",
];

export const experience = [
  {
    role: "Software Engineer II",
    company: "GEICO",
    when: "Nov 2024 - Present",
    location: "Remote / New York, NY",
  },
  {
    role: "Software Engineering Intern",
    company: "Millennium Management",
    when: "Jun 2023 - Aug 2023",
    location: "Miami, FL",
  },
  {
    role: "B.S. Computer Science",
    company: "Cornell University",
    when: "2020 - 2023",
    location: "Ithaca, NY",
  },
];

export const entryHref = (entry: SiteEntry) => `/entries/${entry.id}/`;

export const entryPrimaryHref = (entry: SiteEntry) => entry.data.externalUrl ?? entryHref(entry);

export const byDateDesc = (a: SiteEntry, b: SiteEntry) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const isWorkEntry = (entry: SiteEntry) =>
  entry.data.type === "project" || entry.data.type === "case-study";

export const isWritingEntry = (entry: SiteEntry) =>
  entry.data.type === "post" || entry.data.type === "note" || entry.data.type === "case-study";

export const isMapEntry = (entry: SiteEntry) =>
  entry.data.type === "map" || entry.data.tags.includes("Maps");

export const formatEntryDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
