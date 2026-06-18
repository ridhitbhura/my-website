# Stack Decision Notes

## Recommendation For This PR

Keep the production site on Hugo for this iteration and ship the new protocol homepage there.

The Hugo spike reaches the core product goal quickly: a clean homepage with a centered agent command, a Human/Agent toggle, and real `/agent.txt` plus `/llms.txt` endpoints. It also preserves the current deployment workflow and avoids forcing a framework migration before the new information architecture has settled.

## Why Astro Is Still Worth Prototyping

The Astro spike and content prototype are included as non-production artifacts because they make a future migration easier to judge:

- `astro-spike/` is a runnable vertical slice of the homepage, gallery, agent endpoints, and one blog post.
- `astro-prototype/` sketches the content collections Ridhit would edit by hand.
- `docs/astro-migration-map.md` maps current Hugo files to Astro equivalents.

## Decision Rule

Switch to Astro only after the next redesign pass if it makes the next six edits easier: adding projects, editing map entries, adding posts, changing the homepage, maintaining agent metadata, and previewing the site locally.

Do not switch only because Astro is newer. Switch when the component and content model clearly beat the theme override workflow.
