# pro-portfolio

Personal portfolio for Aditya Upadhyay, built with [Astro](https://astro.build) and hosted on Cloudflare Workers at https://adityaupadhyay.dev.

## Run it

```
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run preview    # production build served by Cloudflare's local runtime, http://localhost:8787
```

## Launch

The live site currently shows a "coming soon" page. To publish the full portfolio, set `LAUNCHED = true` in `src/config.ts` and push to `main`. Set it back to `false` to return to the coming-soon page.

## Edit content

Everything you see on the page comes from `src/data/portfolio.ts`:

- `projects`: title, category, summary, stack, an optional `impact` line, `featured` for a wide card, and `demo`, `repo`, `video` links. An empty link hides its button.
- `experience`: your roles, newest first.
- `writing`: articles, blogs and tutorials.
- `videos`: put the YouTube video ID in `youtubeId`. Videos without one are hidden.
- `repos`: GitHub repositories to feature.
- `links`: email, GitHub, LinkedIn and YouTube.

Sections with nothing in them are left off the page automatically.

Add your resume as `public/resume.pdf` for the download button.

## Theme

Colors and fonts are tokens at the top of `src/styles/global.css`. Change `--accent` to recolor the site. Dark mode follows the visitor's system setting.

## Deploy

```
npx wrangler login     # once
npm run deploy         # builds to dist/ and publishes it
```

`wrangler.jsonc` attaches the Worker to `adityaupadhyay.dev`. The domain's zone must be in the same Cloudflare account; Cloudflare creates the DNS record on first deploy.
