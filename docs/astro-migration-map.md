# Astro Migration Map

## Current Hugo Shape

- `config.yaml` carries site metadata, nav, colors, hero copy, social links, work history, education, projects, and footer settings.
- `content/gallery.md` is a single frontmatter-heavy page with `galleryImages`.
- `content/blogs/india-voting-blog.md` is the only long-form post, with Markdown plus embedded HTML for alignment.
- `layouts/_default/gallery.html` renders the gallery-specific image grid.
- `layouts/partials/head.html`, `layouts/partials/sections/header.html`, and `layouts/partials/sections/footer/copyright.html` override theme behavior.
- `static/` stores public assets such as `agent.txt`, `llms.txt`, `me.jpg`, project images, favicon, and `style.css`.
- `themes/hugo-profile` is configured as a git submodule, but it is not populated in this worktree.

## Proposed Astro Content Model

Use Astro content collections for the content Ridhit edits by hand:

- `src/content/profile/ridhit.yaml`: profile facts, hero bio, socials, experience, and education.
- `src/content/projects/*.yaml`: one project card per file, sorted by `order`.
- `src/content/maps/*.yaml`: one gallery map per file, with optional topic, region, year, post, and source URL.
- `src/content/posts/*.md`: blog posts with frontmatter plus Markdown body.
- `src/content/agent/site.yaml`: canonical site metadata used to generate `/agent.txt` and `/llms.txt`.

The prototype schema lives at `astro-prototype/src/content/config.ts`.
Endpoint sketches live at `astro-prototype/src/pages/agent.txt.ts` and
`astro-prototype/src/pages/llms.txt.ts`.

## Sample Migration

Prototype samples are intentionally small and non-destructive:

- Projects migrated from `config.yaml`:
  - `astro-prototype/src/content/projects/linkedin-connection-note-ai-bot.yaml`
  - `astro-prototype/src/content/projects/cornell-hyperloop.yaml`
  - `astro-prototype/src/content/projects/graph-based-semi-supervised-learning.yaml`
- Maps migrated from `content/gallery.md`:
  - `astro-prototype/src/content/maps/map-01.yaml`
  - `astro-prototype/src/content/maps/map-02.yaml`
  - `astro-prototype/src/content/maps/map-03.yaml`
  - `astro-prototype/src/content/maps/map-04.yaml`
- Blog post migrated from `content/blogs/india-voting-blog.md`:
  - `astro-prototype/src/content/posts/india-voting-blog.md`
- Profile facts migrated from `config.yaml`:
  - `astro-prototype/src/content/profile/ridhit.yaml`
- Agent metadata proposed for generated text endpoints:
  - `astro-prototype/src/content/agent/site.yaml`
- Generated endpoint sketches:
  - `astro-prototype/src/pages/agent.txt.ts`
  - `astro-prototype/src/pages/llms.txt.ts`

## What Moves Where

- `config.yaml > params.hero`, `params.experience`, `params.education`, and social links move into `src/content/profile/ridhit.yaml`.
- `config.yaml > params.projects.items` becomes individual files in `src/content/projects/`.
- `content/gallery.md > galleryImages` becomes individual files in `src/content/maps/`.
- `content/blogs/*.md` moves to `src/content/posts/*.md`, with `date` renamed to `pubDate` and `image` expanded to `heroImage`.
- `static/*` maps directly to Astro `public/*`; URLs such as `/agent.txt`, `/llms.txt`, `/me.jpg`, and `/linkedin.png` can stay stable.
- `layouts/_default/gallery.html` becomes an Astro route such as `src/pages/gallery.astro` that queries the `maps` collection.
- `layouts/partials/head.html` becomes a shared Astro layout or SEO component.
- Header/footer partials become Astro components that read nav/profile/social data from collections or a small `site` config file.

## What Can Be Generated

- `/llms.txt`: generate from `agent/site.yaml`, the post collection, project collection, and map index.
- `/agent.txt`: generate from `agent/site.yaml` with crawler/contact/canonical guidance.
- RSS and sitemap: use Astro integrations or small route files.
- Search index: generate JSON from posts/projects/maps if search returns later.
- Open Graph/Twitter metadata: derive from each collection entry's title, description, and image.

## What Should Remain Static

- Favicon, profile photo, project images, `agent.txt`, and `llms.txt` should live in `public/`.
- Existing externally hosted map images can stay remote until there is a reason to mirror them.
- Custom CSS can move from `static/style.css` to `src/styles/global.css` or stay in `public/style.css` for the first migration pass.
- `CNAME` remains a public root file.

## Editing Rules Of Thumb

- Add a project by creating one YAML file in `src/content/projects/`.
- Add a map by creating one YAML file in `src/content/maps/`.
- Add a post by creating one Markdown file in `src/content/posts/`.
- Use `order` only where manual ordering matters.
- Keep URLs absolute for external resources and root-relative for public site assets.
- Avoid hiding important content in a global config file; if it appears on a page and changes over time, give it a content file.
