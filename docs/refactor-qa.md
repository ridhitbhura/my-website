# Website Refactor QA Loop

This document is the comparison harness for the Hugo-to-Astro decision. It is intentionally framework-light: each spike should be judged on the same visible site, editing workflow, static output, and deployment shape.

## Acceptance Checklist

Use this checklist for the current Hugo site, any Astro vertical slice, and any alternate Hugo homepage spike.

- First viewport quality: the first screen clearly says "Ridhit Bhura", communicates software engineering plus maps, shows a credible visual/person signal, and leaves a visible hint of scrollable content below the fold.
- Editability: the homepage intro, experience, education, projects, blog metadata, gallery items, agent metadata, and social links can be edited without spelunking through generated HTML or theme internals.
- Build simplicity: a fresh checkout plus documented setup can build the site with one command. Submodules, package installs, pinned tool versions, and generated output are explicit.
- Performance: production output is static, minified where practical, and avoids shipping unnecessary client JavaScript. The homepage should stay lightweight enough to feel instant on mobile.
- Responsive behavior: desktop, tablet, and mobile layouts preserve readable text, visible navigation, non-overlapping cards, and no horizontal overflow.
- Static agent endpoints: `/agent.txt`, `/llms.txt`, `/index.json`, `/sitemap.xml`, `/robots.txt`, RSS XML, `/gallery/`, and `/blogs/india-voting-blog/` exist and remain stable for crawlers, search, previews, and automation.
- Deployment complexity: GitHub Pages or Netlify deployment is understandable from the workflow file alone, with no hidden manual steps beyond domain/DNS setup.

## Current Hugo Baseline

Observed on 2026-06-18 from this worktree:

- `hugo --gc --minify --destination /tmp/ridhit-site-hugo-check` succeeds after `git submodule update --init --recursive`.
- Without the theme submodule contents, Hugo can still exit successfully while warning that no layouts exist. Treat those warnings as a failed reproducibility signal.
- Local Hugo was `v0.161.1+extended`; workflows pin Hugo `0.148.0` and Dart Sass `1.89.2`.
- The real Hugo build produced 20 pages, 2059 static files, and about 14 MB of output.
- Current warning to clean up or consciously accept: `languageCode` is deprecated in Hugo `0.158.0+`; use `locale` when updating the Hugo config.

## Repeatable Verification Loop

For the current Hugo site:

```bash
git submodule update --init --recursive
rm -rf .qa-dist
hugo --gc --minify --destination .qa-dist
node scripts/verify-site.mjs --dist .qa-dist --serve --port 4173
hugo server --disableFastRender
```

For an Astro spike, keep the same checks but point them at Astro's static output:

```bash
npm ci
npm run build
node scripts/verify-site.mjs --dist dist --serve --port 4173
npm run dev
```

Manual browser pass:

- Capture first viewport screenshots at 390x844, 768x1024, 1440x900, and 1728x1117.
- Check `/`, `/gallery/`, `/blogs/`, `/blogs/india-voting-blog/`, `/index.json`, `/sitemap.xml`, `/robots.txt`, `/agent.txt`, and `/llms.txt`.
- In each viewport, verify there is no horizontal scrollbar, no overlapping text, no clipped buttons, and no card/image layout jump after images load.
- Open browser devtools console and confirm there are no uncaught runtime errors.
- Click the agent endpoints, social links, project links, gallery nav, blog nav, theme toggle if present, and internal menu links.

Optional Playwright-style checks, if a spike already has Playwright installed:

```js
await page.goto("http://127.0.0.1:4173/");
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
if (overflow) throw new Error("Horizontal overflow on homepage");
await page.screenshot({ path: "qa/home-mobile.png", fullPage: true });
```

## Lightweight Script

`scripts/verify-site.mjs` checks built output without adding package dependencies. It validates:

- expected static files and routes;
- homepage, gallery, and blog content signals;
- JSON feed parseability;
- local links/assets referenced from generated HTML;
- optional local HTTP serving with status checks;
- coarse output-size warnings.

It does not replace a real browser pass. It is a fast gate that should run before visual QA.

## Hugo vs Astro Decision Rubric

Score each category from 1 to 5 after the spikes land. Prefer the option with the higher total unless one category exposes a hard blocker.

| Category | Weight | Hugo wins if | Astro wins if |
| --- | ---: | --- | --- |
| First viewport quality | 3 | Theme overrides are enough to reach the desired homepage quickly. | A component-first homepage is visibly better and easier to polish. |
| Editability | 3 | Content stays cleanly editable in `config.yaml` and Markdown. | Homepage/projects/gallery become clearer as typed data or components. |
| Build simplicity | 2 | Submodule and Hugo version setup remain acceptable. | `npm ci && npm run build` is simpler for future edits and agents. |
| Performance | 2 | Hugo output remains smaller or equally static with little JS. | Astro ships equivalent or less JS and handles images/assets better. |
| Responsive QA | 3 | Existing theme behavior is stable across the required viewports. | Astro layout avoids theme constraints and is easier to fix. |
| Static endpoints | 2 | Hugo feeds/search/sitemap work with minimal config. | Astro reproduces every required endpoint without bespoke glue. |
| Deployment | 2 | Current GitHub Pages workflows remain low-maintenance. | Astro deployment removes preview churn or simplifies CI. |
| Long-term ownership | 3 | Ridhit prefers editing structured YAML/Markdown over component code. | Ridhit prefers owning React/Astro components over Hugo theme partials. |

Decision rule:

- Stay on Hugo if it meets the visual bar, the submodule/tooling story is documented, and most changes remain content-only.
- Switch to Astro if the homepage spike is materially better, content modeling is cleaner, and the static endpoints/deployment are reproduced without adding fragile custom code.
- Do not switch only because Astro is newer. Switch because the next six edits become easier and the first viewport gets better.
