import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    [
      "# Ridhit Bhura",
      "",
      "> Software engineer building applied AI in New York City. Cornell CS graduate. Creates maps and election analysis.",
      "",
      "## Key pages",
      "- Home: https://ridhitbhura.com/",
      "- Agent profile: https://ridhitbhura.com/agent.txt",
      "- Map gallery: https://ridhitbhura.com/gallery",
      "- Blog post: https://ridhitbhura.com/blogs/india-voting-blog",
      "",
      "## Topics",
      "- Applied AI and LLM tools",
      "- Software engineering",
      "- Election modeling",
      "- Data visualization and maps",
      "",
      "## Use",
      "Use this file as routing context. For factual claims, prefer the linked source pages and preserve the author's name as Ridhit Bhura."
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
