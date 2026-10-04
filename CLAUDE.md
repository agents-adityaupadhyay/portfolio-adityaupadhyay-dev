# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio built with Astro (static output, no UI framework), deployed to Cloudflare Workers as static assets at `adityaupadhyay.dev`. Remote: `github.com/agents-adityaupadhyay/portfolio-adityaupadhyay-dev`, branch `main`. No tests.

## Commands

- `npm run dev`: Astro dev server with hot reload (http://localhost:4321).
- `npm run build`: build to `dist/`.
- `npm run check`: `astro check` (TypeScript + `.astro` type checking). Run this after edits.
- `npm run preview`: build, then serve `dist/` with `wrangler dev` (http://localhost:8787), which matches production, including the 404 handling.
- `npm run deploy`: build and `wrangler deploy`. Requires `npx wrangler login` once.

## Architecture

- `LAUNCHED` in `src/config.ts` is the launch switch. `src/pages/index.astro` renders `components/Home.astro` (the full portfolio) when true, or `components/ComingSoon.astro` (with `noindex`) when false. The two pages share only `Base.astro` and the CSS; `main.ts` is imported by `Home.astro`, so it is not shipped on the coming-soon page.
- `src/data/portfolio.ts` exports `portfolio` (typed by the `Portfolio` interface): links, categories, projects, experience, writing, videos, repos. All page content lives here.
- `src/components/Home.astro` reads the data and decides at build time which sections render. Empty lists, videos without a `youtubeId`, and writing tabs with no posts are left out, and so are their nav links (`sections` array) and the hero "Watch a demo" button. The resume button renders only if `public/resume.pdf` exists at build time.
- `src/components/*.astro` hold one section each and render the full HTML at build time (Astro escapes interpolations).
- `src/scripts/main.ts` is the only client JS (Astro bundles it inline). It only toggles state on the prerendered DOM: project filter (`hidden` on cards by `data-category`), writing tabs (one prerendered `tabpanel` per tab), video player (swaps poster/iframe from `data-*` on `.track` buttons), mobile nav, scroll spy and reveal. Sections may be absent, so lookups are guarded.
- `src/layouts/Base.astro` holds the `<head>`: meta, Open Graph tags, canonical (from `site` in `astro.config.mjs`), fonts, and the inline script that adds `html.js`. `.reveal` is only hidden under `.js`, so content stays visible without JS.
- `public/` is copied as-is to `dist/` (favicon, resume.pdf).
- `wrangler.jsonc` serves `./dist` only, with `not_found_handling: "404-page"` (`src/pages/404.astro`) and a custom-domain route.

Data conventions:

- `projects[].category` must be a key of `categories` (filter pills come from `categories`). `demo`/`repo`/`video` set to `""` hide the button; `http(s)` links open in a new tab.
- `projects[].impact` renders a highlighted result line. `featured: true` spans two grid columns at >=1000px (grid uses `dense` flow, so keep featured counts that tile cleanly).
- Writing tabs are fixed to `articles`, `blogs`, `tutorials` (`tabLabels` in `Home.astro`).

## Theming

All colors are tokens on `:root` in `src/styles/global.css`, overridden in a `prefers-color-scheme: dark` block. Use tokens instead of literal colors: `--on-ink`/`--on-accent` for text on filled ink/accent backgrounds, and `--panel` for the always-dark blocks (console, video player, contact). `[hidden]` is forced to `display: none !important` because cards set `display: flex`.
