// Interactivity for the prerendered page. All content is already in the HTML;
// this only toggles state. Sections may be missing (empty data), so every
// lookup is guarded.

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

// Restarts a CSS entrance animation with a new stagger delay.
function replay(el: HTMLElement, delayMs: number) {
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = '';
  el.style.animationDelay = `${delayMs}ms`;
}

/* ---------- Project filters ---------- */
const filtersEl = $('#project-filters');
if (filtersEl) {
  const cards = $$('#project-grid .project');
  filtersEl.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('.pill');
    if (!b) return;
    const k = b.dataset.k!;
    $$('.pill', filtersEl).forEach((p) => p.setAttribute('aria-pressed', String(p === b)));
    let i = 0;
    cards.forEach((c) => {
      const on = k === 'all' || c.dataset.category === k;
      c.hidden = !on;
      if (on) replay(c, i++ * 60);
    });
  });
}

/* ---------- Writing tabs ---------- */
const tabsEl = $('#writing-tabs');
if (tabsEl) {
  const tabs = $$<HTMLButtonElement>('.tab', tabsEl);
  const select = (tab: HTMLButtonElement) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!)!;
      panel.hidden = !on;
      if (on) $$('.post', panel).forEach((p, i) => replay(p, i * 50));
    });
  };
  tabsEl.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('.tab');
    if (b) select(b);
  });
  tabsEl.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    select(next);
    next.focus();
  });
}

/* ---------- Videos ---------- */
const playerEl = $('#player');
const playlistEl = $('#playlist');
if (playerEl && playlistEl) {
  let current = $<HTMLElement>('.track', playlistEl)!;
  const thumb = (id: string) => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;

  const showPoster = (t: HTMLElement) => {
    const d = t.dataset;
    playerEl.replaceChildren();
    const img = Object.assign(document.createElement('img'), { className: 'poster', src: thumb(d.id!), alt: '' });
    const btn = Object.assign(document.createElement('button'), { className: 'play-btn' });
    btn.setAttribute('aria-label', `Play ${d.title}`);
    btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5l11 7-11 7z"/></svg>';
    const dur = Object.assign(document.createElement('span'), { className: 'duration', textContent: d.duration! });
    playerEl.append(img, btn, dur);
    $('#video-title')!.textContent = d.title!;
    $('#video-blurb')!.textContent = d.blurb!;
  };

  playerEl.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.play-btn')) return;
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(current.dataset.id!)}?autoplay=1&rel=0`;
    f.title = current.dataset.title!;
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    f.allowFullscreen = true;
    playerEl.replaceChildren(f);
  });

  playlistEl.addEventListener('click', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('.track');
    if (!t) return;
    current = t;
    $$('.track', playlistEl).forEach((x) => x.setAttribute('aria-current', String(x === t)));
    showPoster(t);
  });
}

/* ---------- Mobile nav ---------- */
const toggle = $('.nav-toggle')!;
const links = $('#nav-links')!;
const setMenu = (open: boolean) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  links.classList.toggle('open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) setMenu(false);
});

/* ---------- Active nav + reveal ---------- */
if ('IntersectionObserver' in window) {
  const navMap = new Map<string, HTMLElement>();
  $$<HTMLAnchorElement>('a[href^="#"]', links).forEach((a) => navMap.set(a.getAttribute('href')!.slice(1), a));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && navMap.has(en.target.id)) {
        navMap.forEach((a) => a.classList.remove('active'));
        navMap.get(en.target.id)!.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach((s) => spy.observe(s));

  const rev = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => rev.observe(el));
} else {
  $$('.reveal').forEach((el) => el.classList.add('in'));
}
