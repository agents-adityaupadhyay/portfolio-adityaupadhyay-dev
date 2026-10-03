# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio (plain HTML/CSS/vanilla JS). No build step, no package manager, no linter, no tests. Remote: `github.com/agents-adityaupadhyay/portfolio-adityaupadhyay-dev`, branch `main`.

## Running

- Open `index.html` directly, or serve the folder: `npx serve .`
- Deploys to any static host pointed at the repo root.

## Architecture

Content and rendering are split across two scripts, loaded in order at the end of `index.html` (`data.js` then `main.js`):

- `assets/js/data.js` defines a single global, `window.PORTFOLIO` (`links`, `categories`, `projects`, `experience`, `writing`, `videos`, `repos`). All page content lives here; content edits should not require touching HTML or `main.js`.
- `assets/js/main.js` is one IIFE that reads `window.PORTFOLIO` and fills in the DOM by element ID (`#project-grid`, `#timeline`, `#post-list`, `#player`, `#repo-grid`, etc.) using string-built `innerHTML` plus delegated click handlers. Every interpolated value goes through `esc()`; keep doing that when adding rendering code.
- `index.html` holds only static section scaffolding with the target IDs. Renaming an ID in the HTML requires updating the matching selector in `main.js` (a missing element throws at load, since selectors are not null-checked).
- `assets/css/styles.css` starts with theme tokens (colors, fonts; `--accent` recolors the site).

Data conventions that `main.js` relies on:

- `projects[].category` must be a key of `categories`; the filter pills are generated from `categories`. `demo`/`repo`/`video` set to `""` hide that button; `#anchor` values are treated as internal links, `http(s)` as external (new tab).
- `writing` is keyed by `articles`, `blogs`, `tutorials`, matching the `tabLabels` object in `main.js`; adding a new tab means updating both.
- `projects[].impact` renders a highlighted result line; `featured: true` spans two grid columns at >=1000px (grid uses `dense` flow, so keep featured counts that tile cleanly).
- `videos[]` without a `youtubeId` are filtered out.
- Empty sections are removed at load by `dropSection(id)` in `main.js`, which also removes every `a[href="#id"]` (nav links, hero buttons). Writing tabs with no posts are dropped the same way.
- The resume button is removed unless a `HEAD` request for `assets/resume.pdf` succeeds (so it is always hidden when opened via `file://`).
- Scroll-reveal and nav highlighting use `IntersectionObserver` (`.reveal` elements get `.in`; sections with an `id` drive the active nav link). `.reveal` is only hidden under `html.js` (set by an inline script in `<head>`), so content stays visible without JS.

## Theming

All colors are tokens on `:root` in `styles.css`, overridden in a `prefers-color-scheme: dark` block. Use tokens instead of literal colors: `--on-ink`/`--on-accent` for text on filled ink/accent backgrounds, and `--panel` for the always-dark blocks (console, video player, contact).
