(function () {
  'use strict';

  var D = window.PORTFOLIO;
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var icons = {
    demo: '<svg class="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    repo: '<svg class="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>',
    play: '<svg class="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>',
    playSolid: '<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5l11 7-11 7z"/></svg>',
    arrow: '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'
  };

  // Removes a section and every in-page link pointing to it.
  function dropSection(id) {
    var s = document.getElementById(id);
    if (s) s.remove();
    document.querySelectorAll('a[href="#' + id + '"]').forEach(function (a) { a.remove(); });
  }

  /* ---------- Links ---------- */
  var L = D.links;
  $('#email-link').href = 'mailto:' + L.email;
  $('#email-link').textContent = L.email;
  ['#github-link', '#github-link-2'].forEach(function (s) { $(s).href = L.github; });
  $('#linkedin-link').href = L.linkedin;
  $('#youtube-link').href = L.youtube;
  $('#channel-link').href = L.youtube;
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Projects ---------- */
  var filter = 'all';
  var filtersEl = $('#project-filters');
  var gridEl = $('#project-grid');

  function renderFilters() {
    var keys = ['all'].concat(Object.keys(D.categories));
    filtersEl.innerHTML = keys.map(function (k) {
      var label = k === 'all' ? 'All' : D.categories[k];
      var count = k === 'all' ? D.projects.length : D.projects.filter(function (p) { return p.category === k; }).length;
      return '<button class="pill" data-k="' + k + '" aria-pressed="' + (k === filter) + '">' +
        esc(label) + ' <span class="count">' + count + '</span></button>';
    }).join('');
  }

  function linkBtn(href, icon, label) {
    if (!href) return '';
    var ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
    return '<a class="link-btn" href="' + esc(href) + '"' + ext + '>' + icon + label + '</a>';
  }

  function projectLinks(p) {
    var html = linkBtn(p.demo, icons.demo, 'Live demo') +
      linkBtn(p.repo, icons.repo, 'Repository') +
      linkBtn(p.video, icons.play, 'Walkthrough');
    return html ? '<div class="links">' + html + '</div>' : '';
  }

  function renderProjects() {
    var list = D.projects.filter(function (p) { return filter === 'all' || p.category === filter; });
    gridEl.innerHTML = list.map(function (p, i) {
      var n = String(D.projects.indexOf(p) + 1).padStart(2, '0');
      return '<article class="card project' + (p.featured ? ' featured' : '') + '" style="animation-delay:' + (i * 60) + 'ms">' +
        '<div class="project-meta"><span>' + n + ' / ' + esc(p.year) + '</span><span class="badge">' + esc(D.categories[p.category]) + '</span></div>' +
        '<div><h3>' + esc(p.title) + '</h3><div class="client">' + esc(p.client) + '</div></div>' +
        '<p>' + esc(p.summary) + '</p>' +
        (p.impact ? '<div class="impact">' + esc(p.impact) + '</div>' : '') +
        '<div class="stack">' + p.stack.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
        projectLinks(p) +
      '</article>';
    }).join('');
  }

  filtersEl.addEventListener('click', function (e) {
    var b = e.target.closest('.pill');
    if (!b) return;
    filter = b.dataset.k;
    renderFilters();
    renderProjects();
  });

  /* ---------- Experience ---------- */
  $('#timeline').innerHTML = D.experience.map(function (x) {
    return '<li><div class="when">' + esc(x.when) + '</div><div class="what">' +
      '<h3>' + esc(x.role) + '</h3><div class="org">' + esc(x.org) + '</div>' +
      (x.points.length ? '<ul>' + x.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') +
      '</div></li>';
  }).join('');

  /* ---------- Writing ---------- */
  var tabsEl = $('#writing-tabs');
  var postsEl = $('#post-list');
  var tabLabels = { articles: 'Articles', blogs: 'Blogs', tutorials: 'Tutorials' };
  // Only show tabs that have posts.
  Object.keys(tabLabels).forEach(function (k) {
    if (!(D.writing[k] || []).length) delete tabLabels[k];
  });
  var tab = Object.keys(tabLabels)[0];

  function renderTabs() {
    tabsEl.innerHTML = Object.keys(tabLabels).map(function (k) {
      var on = k === tab;
      return '<button class="tab" role="tab" id="tab-' + k + '" aria-controls="post-list" data-k="' + k +
        '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '">' + tabLabels[k] + '</button>';
    }).join('');
  }
  function renderPosts() {
    if (!tab) return;
    postsEl.setAttribute('aria-labelledby', 'tab-' + tab);
    postsEl.innerHTML = (D.writing[tab] || []).map(function (p, i) {
      return '<a class="post" href="' + esc(p.href) + '" style="animation-delay:' + (i * 50) + 'ms">' +
        '<span class="date">' + esc(p.date) + '</span>' +
        '<span class="body"><span class="title">' + esc(p.title) + '</span><span class="blurb">' + esc(p.blurb) + '</span></span>' +
        '<span class="read">' + esc(p.read) + '<span class="arrow">' + icons.arrow + '</span></span>' +
      '</a>';
    }).join('');
  }
  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (!b) return;
    tab = b.dataset.k;
    renderTabs();
    renderPosts();
  });
  tabsEl.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var keys = Object.keys(tabLabels);
    var i = keys.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : -1);
    tab = keys[(i + keys.length) % keys.length];
    renderTabs();
    renderPosts();
    tabsEl.querySelector('[aria-selected="true"]').focus();
  });

  /* ---------- Videos ---------- */
  var current = 0;
  var playerEl = $('#player');
  var playlistEl = $('#playlist');
  var videos = D.videos.filter(function (v) { return v.youtubeId; });

  function thumbUrl(v) { return 'https://i.ytimg.com/vi/' + encodeURIComponent(v.youtubeId) + '/hqdefault.jpg'; }

  function renderPlayer(autoplay) {
    var v = videos[current];
    $('#video-title').textContent = v.title;
    $('#video-blurb').textContent = v.blurb;
    if (autoplay) {
      playerEl.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtubeId) +
        '?autoplay=1&rel=0" title="' + esc(v.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      return;
    }
    playerEl.innerHTML =
      '<img class="poster" src="' + thumbUrl(v) + '" alt="">' +
      '<button class="play-btn" aria-label="Play ' + esc(v.title) + '">' + icons.playSolid + '</button>' +
      '<span class="duration">' + esc(v.duration) + '</span>';
  }

  function renderPlaylist() {
    playlistEl.innerHTML = videos.map(function (v, i) {
      return '<button class="track" data-i="' + i + '" aria-current="' + (i === current) + '">' +
        '<span class="thumb"><img src="' + thumbUrl(v) + '" alt=""></span>' +
        '<span><span class="t">' + esc(v.title) + '</span><span class="m">' + esc(v.tag) + ' / ' + esc(v.duration) + '</span></span>' +
      '</button>';
    }).join('');
  }

  playerEl.addEventListener('click', function (e) {
    if (e.target.closest('.play-btn')) renderPlayer(true);
  });
  playlistEl.addEventListener('click', function (e) {
    var b = e.target.closest('.track');
    if (!b) return;
    current = Number(b.dataset.i);
    renderPlayer(false);
    renderPlaylist();
  });

  /* ---------- Resume ---------- */
  // Hide the download button until assets/resume.pdf exists.
  var resumeBtn = $('#resume-btn');
  fetch(resumeBtn.getAttribute('href'), { method: 'HEAD' })
    .then(function (r) { if (!r.ok) resumeBtn.remove(); })
    .catch(function () { resumeBtn.remove(); });

  /* ---------- Repos ---------- */
  $('#repo-grid').innerHTML = D.repos.map(function (r) {
    return '<a class="card repo" href="' + esc(r.href) + '" target="_blank" rel="noopener">' +
      '<span class="name">' + esc(r.name) + '</span>' +
      '<span class="desc">' + esc(r.desc) + '</span>' +
      '<span class="lang"><i style="background:' + esc(r.color) + '"></i>' + esc(r.lang) + '</span>' +
    '</a>';
  }).join('');

  /* ---------- Hide empty sections ---------- */
  if (!D.projects.length) dropSection('work');
  if (!D.experience.length) dropSection('experience');
  if (!tab) dropSection('writing');
  if (!videos.length) dropSection('videos');
  if (!D.repos.length) dropSection('repos');

  /* ---------- Mobile nav ---------- */
  var toggle = $('.nav-toggle');
  var links = $('#nav-links');
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    links.classList.toggle('open', !open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }
  });

  /* ---------- Active nav + reveal ---------- */
  if ('IntersectionObserver' in window) {
    var navMap = {};
    links.querySelectorAll('a[href^="#"]').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && navMap[en.target.id]) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove('active'); });
          navMap[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Init ---------- */
  renderFilters();
  renderProjects();
  renderTabs();
  renderPosts();
  if (videos.length) {
    renderPlayer(false);
    renderPlaylist();
  }
})();
