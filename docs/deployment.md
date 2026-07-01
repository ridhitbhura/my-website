# Deployment

## Flow

Use Cloudflare Pages preview deployments as staging.

1. Push work to a PR branch.
2. Let Cloudflare Pages build the PR preview.
3. Review the preview URL.
4. Merge to `main` only after the preview looks good.
5. Production deploys from `main`.

## Cloudflare Pages Settings

Project: `my-website`

```txt
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 24
```

If Cloudflare keeps failing immediately after the Astro migration, check that the project is not still using the old Hugo build command or `public` output directory.

## Local Checks

```bash
npm install
npm run validate
npm run preview
```

## Content

New public content goes in `src/content/entries/`.

```bash
npm run new -- my-entry-slug --type=post
```
