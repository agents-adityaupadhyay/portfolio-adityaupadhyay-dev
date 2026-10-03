# pro-portfolio

Personal portfolio for Aditya Upadhyay. Plain HTML, CSS and JavaScript. No build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Edit content

Everything you see on the page comes from `assets/js/data.js`:

- `projects`: title, category, summary, stack, and `demo`, `repo`, `video` links. An empty link hides its button.
- `experience`: your roles, newest first.
- `writing`: articles, blogs and tutorials.
- `videos`: put the YouTube video ID in `youtubeId` to show the thumbnail and play it inline.
- `repos`: GitHub repositories to feature.
- `links`: email, GitHub, LinkedIn and YouTube.

Add your resume as `assets/resume.pdf` for the download button.

## Theme

Colors and fonts are tokens at the top of `assets/css/styles.css`. Change `--accent` to recolor the site.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Point it at this folder.
