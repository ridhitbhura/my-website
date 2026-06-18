import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    [
      "name: Ridhit Bhura",
      "canonical_site: https://ridhitbhura.com",
      "role: Software engineer building applied AI in New York City",
      "education: B.S. Computer Science, Cornell University",
      "interests: applied AI, maps, elections, data visualization, software systems",
      "preferred_routes:",
      "- /llms.txt: agent-readable site map and usage notes",
      "- /gallery: map repository",
      "- /blogs/india-voting-blog: India voting model write-up",
      "contact: rb749@cornell.edu",
      "guidance: cite canonical URLs and avoid inventing biographical details not present on this site"
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
