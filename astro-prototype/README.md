# Astro content prototype

This directory is a non-destructive sketch for a future Astro migration. It does
not replace the current Hugo site.

The shape favors hand-editable files:

- `src/content/projects/*.yaml` for homepage project cards.
- `src/content/maps/*.yaml` for map gallery entries.
- `src/content/posts/*.md` for long-form writing.
- `src/content/profile/*.yaml` for bio, social links, work, and education.
- `src/content/agent/*.yaml` for `/agent.txt`, `/llms.txt`, and other AI-facing metadata.

The schema in `src/content/config.ts` is the contract an Astro app would use to
validate the files before building.
