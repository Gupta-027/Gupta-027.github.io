/* ==========================================================================
   GUPTA PRASAD ADHIKARI — portfolio behaviour
   --------------------------------------------------------------------------
   01  Content (capability panel copy)
   02  Utilities + the scroll hub
   03  Intro            08  Work stage
   04  Cursor/magnetic  09  Process
   05  Nav              10  About statement
   06  Reveal           11  Recognition
   07  Parallax         12  Panel · 13 Lightbox · 14 Ambient · 15 Boot

   PERFORMANCE MODEL
   Every scroll-reactive module registers with one `Scroll` hub instead of
   adding its own listener. The hub runs a single rAF-throttled pass, and
   the layout values each module needs (element offsets, section heights)
   are measured once into a cache that only a resize invalidates — so a
   scroll frame does zero forced reflow. Anything expensive is additionally
   gated by an IntersectionObserver so it costs nothing while off-screen.
   ========================================================================== */

/* ══════════════════════════════════════════════════════════════════════
   01. CONTENT — capability panel
   ══════════════════════════════════════════════════════════════════════ */
const CAPABILITIES = {
  research: {
    title: 'UX Research',
    lede: 'Understanding the problem before proposing a solution — and being able to show why the solution follows from it.',
    what: [
      'Stakeholder and user interviews, written up as personas grounded in what people actually said',
      'Journey and service mapping to find where the friction really sits, not where it is easiest to fix',
      'Competitive benchmarking — what the category has trained users to expect, and where breaking that is worth it',
      'Usability testing on clickable prototypes, with findings ranked by severity rather than by ease of fixing'
    ],
    proof: 'On BFSI Risk Intelligence I mapped four distinct operator roles — credit officer, fraud analyst, retention manager, collections agent — and found each needed the same model output framed as a different decision. That finding reshaped the whole interface.'
  },
  uiux: {
    title: 'UI/UX Design',
    lede: 'Wireframes through to high-fidelity, prototyped flows that a developer can build from without a meeting.',
    what: [
      'Low-fidelity flows first, so structure gets argued about before colour does',
      'High-fidelity screens in Figma with real content, not lorem ipsum',
      'Interactive prototypes covering the unhappy paths — loading, empty, error, permission-denied',
      'Developer hand-off with spacing, states, breakpoints and behaviour documented on the frame'
    ],
    proof: 'Vidyapeeth360 covers admissions, fees, attendance, communication and reporting for four different audiences. The design work was mostly deciding what each role should see first — and what they should never have to see at all.'
  },
  ai: {
    title: 'AI Interface Design',
    lede: 'AI as a design material: how a model shows its working, signals doubt, and hands control back to a person.',
    what: [
      'Designing the confidence surface — when to answer, when to cite, when to abstain',
      'Explainability in the interface: which factors drove this score, in the user\'s language',
      'Escalation and handoff moments, so a person is never stuck arguing with a model',
      'Guardrail states — what the product does when the model is wrong, slow, or unavailable'
    ],
    proof: 'On aayiq the interesting design problem was not the AI reply — it was the handoff. A customer should feel passed to a human, not abandoned by a bot, and the agent picking it up should inherit the full context rather than asking everything again.'
  },
  systems: {
    title: 'Design Systems',
    lede: 'Tokens, components and documented states, so the tenth screen costs a fraction of the first.',
    what: [
      'Colour, type, spacing and radius as tokens with defined semantic roles',
      'Component libraries with every interactive state built, not just the default',
      'Accessible contrast and focus behaviour treated as part of the component, not a later audit',
      'Usage documentation covering when not to use a component, which is the half people skip'
    ],
    proof: 'This site runs on a token set of about twenty custom properties. Every surface, accent and shadow on it resolves back to those — which is why the case-study pages could be added without touching a single component style.'
  },
  dataviz: {
    title: 'Data Visualisation',
    lede: 'Dashboards where the number someone came for is the first thing they see, not the fifth.',
    what: [
      'Choosing the chart form from the question being asked, not from what looks impressive',
      'Colour used to encode meaning — risk, trend, category — never as decoration',
      'Progressive disclosure: headline metric, then the breakdown, then the raw rows',
      'Readable in both themes, at real data volumes, with sensible empty and loading states'
    ],
    proof: 'The BFSI platform reports precision, recall and ROC-AUC rather than accuracy, because on a 5% fraud class accuracy flatters a useless model. Surfacing the honest metric was a design decision as much as a modelling one.'
  },
  frontend: {
    title: 'Frontend Development',
    lede: 'I ship the design rather than handing over a picture of it — which keeps the design honest.',
    what: [
      'Semantic, accessible HTML with keyboard paths that actually work',
      'Responsive layouts built on modern CSS — grid, container-aware sizing, fluid type',
      'Performance as a design constraint: transform-only animation, deferred offscreen work',
      'React / Next.js and TypeScript for product surfaces; vanilla where a framework would not earn its weight'
    ],
    proof: 'This portfolio is plain HTML, CSS and JavaScript — no framework, no build step, no dependencies. It holds 60fps through a pinned scroll sequence because the animation budget was designed alongside the visuals, not discovered afterwards.'
  }
};


/* ══════════════════════════════════════════════════════════════════════
   02. UTILITIES + THE SCROLL HUB
   ══════════════════════════════════════════════════════════════════════ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE    = matchMedia('(hover: hover) and (pointer: fine)').matches;
const DESKTOP = () => innerWidth > 1024;

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* A conservative read of how much animation this device should be asked
   to run. Anything that looks low-powered gets the ambient layer trimmed
   via .lite rather than a different layout — the page looks the same, it
   just stops painting the most expensive decorative pieces. */
const LITE = (() => {
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  const c = navigator.connection;
  if (c && (c.saveData || /2g/.test(c.effectiveType || ''))) return true;
  return false;
})();

/* ── The scroll hub ───────────────────────────────────────────────────
   One listener, one rAF, one pass over every subscriber. Subscribers get
   the values they'd otherwise each compute for themselves, so a scroll
   frame reads layout zero times.
   ─────────────────────────────────────────────────────────────────── */
const Scroll = {
  subs: [],
  measurers: [],
  queued: false,
  y: 0, vh: 0, docH: 0,

  /** fn({y, vh, docH}) — called on every settled scroll frame. */
  on(fn) { this.subs.push(fn); return fn; },

  /** fn() — called on resize, before the next scroll pass. Cache here. */
  onMeasure(fn) { this.measurers.push(fn); fn(); return fn; },

  measure() {
    this.vh = innerHeight;
    this.docH = document.documentElement.scrollHeight;
    for (const m of this.measurers) m();
  },

  run() {
    this.y = scrollY;
    for (const s of this.subs) s(this);
  },

  request() {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(() => { this.queued = false; this.run(); });
  },

  init() {
    this.measure();
    addEventListener('scroll', () => this.request(), { passive: true });

    /* Resize/orientation re-measures once the dust settles rather than on
       every intermediate frame of a window drag. */
    let t = 0;
    const remeasure = () => {
      clearTimeout(t);
      t = setTimeout(() => { this.measure(); this.run(); }, 150);
    };
    addEventListener('resize', remeasure, { passive: true });
    addEventListener('orientationchange', remeasure, { passive: true });

    /* Sections below the fold use content-visibility:auto, so their real
       height only exists once they're near the viewport. Re-measure when
       one of them renders, or every cached offset below it is stale. */
    for (const el of $$('.sec--defer, .csp__sec')) {
      el.addEventListener('contentvisibilityautostatechange', () => {
        requestAnimationFrame(() => requestAnimationFrame(() => { this.measure(); this.run(); }));
      });
    }

    this.run();
  }
};


/* ══════════════════════════════════════════════════════════════════════
   03. INTRO  (≤ 1.3s)
   ══════════════════════════════════════════════════════════════════════ */
const Intro = {
  init() {
    const el = $('#intro'), name = $('#introName'), tag = $('#introTag'), bar = $('#introBar');
    const done = () => {
      document.body.classList.remove('lock');
      document.body.classList.add('ready');
    };
    if (!el) { done(); return; }

    document.body.classList.add('lock');

    if (REDUCED) { el.remove(); done(); return; }

    const at = (ms, fn) => setTimeout(fn, ms);
    at(80,   () => { name.classList.add('on'); bar.style.width = '100%'; });
    at(430,  () => tag.classList.add('on'));
    at(1050, () => { el.classList.add('gone'); done(); });
    at(1950, () => el.remove());
  }
};


/* ══════════════════════════════════════════════════════════════════════
   04. CURSOR + MAGNETIC
   ══════════════════════════════════════════════════════════════════════ */
const Cursor = {
  init() {
    const cur = $('#cur'), txt = $('#curTxt');
    if (!cur || !FINE || REDUCED || !DESKTOP()) return;

    let x = 0, y = 0, cx = 0, cy = 0, running = false;

    /* The follow loop only spins while the cursor still has ground to
       cover. Once it catches up it parks itself, so an idle tab is not
       burning a rAF forever. */
    const loop = () => {
      const dx = x - cx, dy = y - cy;
      cx += dx * 0.22;
      cy += dy * 0.22;
      cur.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) requestAnimationFrame(loop);
      else running = false;
    };

    addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      document.body.classList.add('cur-on');
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
      const view = e.target.closest('[data-cursor="view"]');
      const btn  = e.target.closest('a, button, [data-cursor="btn"]');
      cur.classList.toggle('view-on', !!view);
      cur.classList.toggle('btn-on', !!btn && !view);
      txt.textContent = view ? 'View ↗' : '';
    });

    document.addEventListener('mouseleave', () => document.body.classList.remove('cur-on'));
  }
};

const Magnetic = {
  init() {
    if (!FINE || REDUCED) return;
    $$('.mag').forEach((el) => {
      let r = null;
      el.addEventListener('mouseenter', () => { r = el.getBoundingClientRect(); });
      el.addEventListener('mousemove', (e) => {
        if (!r) r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.18;
        const dy = (e.clientY - r.top - r.height / 2) * 0.24;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }, { passive: true });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; r = null; });
    });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   05. NAV + SCROLL CHROME
   ══════════════════════════════════════════════════════════════════════ */
const Nav = {
  init() {
    const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
    const bar = $('#progressBar'), top = $('#toTop');
    if (!nav) return;

    let last = 0;

    Scroll.on(({ y, vh, docH }) => {
      nav.classList.toggle('stuck', y > 8);
      /* Hide going down, return going up — but never while the mobile
         menu is open, or the menu would slide away with it. */
      if (!menu?.classList.contains('open')) {
        nav.classList.toggle('hide', y > last && y > 320);
      }
      last = y;

      if (bar) {
        const p = docH > vh ? clamp(y / (docH - vh), 0, 1) : 0;
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
      }
      if (top) top.classList.toggle('on', y > vh * 0.9);
    });

    burger?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('lock', open);
      if (open) nav.classList.remove('hide');
    });

    menu?.addEventListener('click', (e) => {
      if (!e.target.closest('a')) return;
      menu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('lock');
    });

    top?.addEventListener('click', () => scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));

    /* Section spy — IntersectionObserver, not a per-frame offset scan. */
    const links = $$('.menu__link');
    const map = new Map();
    links.forEach((a) => {
      const id = a.getAttribute('href')?.replace('#', '');
      const sec = id && document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    if (!map.size) return;

    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      /* Whichever visible section starts highest wins the highlight. */
      let best = null;
      seen.forEach((s) => {
        if (!best || s.offsetTop < best.offsetTop) best = s;
      });
      links.forEach((a) => a.classList.remove('on'));
      if (best) map.get(best)?.classList.add('on');
    }, { rootMargin: '-45% 0px -45% 0px' });

    map.forEach((_, sec) => io.observe(sec));
  }
};


/* ══════════════════════════════════════════════════════════════════════
   06. REVEAL
   ══════════════════════════════════════════════════════════════════════ */
const Reveal = {
  init() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (REDUCED) { items.forEach((el) => el.classList.add('in')); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const d = parseInt(el.dataset.delay || '0', 10);
        if (d) el.style.transitionDelay = `${d}ms`;
        el.classList.add('in');
        io.unobserve(el);                 // one-shot: never re-animates
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    items.forEach((el) => io.observe(el));
  }
};


/* ══════════════════════════════════════════════════════════════════════
   07. HERO BEAMS + PARALLAX
   ══════════════════════════════════════════════════════════════════════ */
const Beams = {
  init() {
    const host = $('#heroBeams');
    if (!host || REDUCED || LITE) return;

    const colours = [
      'rgba(168,85,247,.85)', 'rgba(139,92,246,.8)',
      'rgba(99,102,241,.75)', 'rgba(192,132,252,.85)'
    ];
    const n = DESKTOP() ? 9 : 5;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      const x = (100 / (n + 1)) * (i + 1) + (Math.random() * 5 - 2.5);
      el.className = i % 3 === 0 ? 'b-up b-dot' : 'b-up';
      el.style.cssText =
        `--x:${x.toFixed(2)}%;` +
        `--bh:${(18 + Math.random() * 20).toFixed(0)}vh;` +
        `--c:${colours[i % colours.length]};` +
        `--d:${(7 + Math.random() * 7).toFixed(1)}s;` +
        `--bdl:${(Math.random() * 9).toFixed(1)}s;` +
        `--py:${(25 + Math.random() * 50).toFixed(0)}%;` +
        `--pd:${(11 + Math.random() * 8).toFixed(1)}s;` +
        `--pdl:${(Math.random() * 6).toFixed(1)}s;`;
      frag.appendChild(el);
    }
    host.appendChild(frag);
  }
};

const Parallax = {
  init() {
    const items = $$('[data-parallax]');
    if (!items.length || REDUCED) return;

    /* Offsets are cached against the document, so a scroll frame does no
       getBoundingClientRect() at all. */
    let cache = [];
    Scroll.onMeasure(() => {
      cache = items.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, top: r.top + scrollY, h: r.height, speed: parseFloat(el.dataset.parallax) || 0.02 };
      });
    });

    Scroll.on(({ y, vh }) => {
      for (const it of cache) {
        const rel = it.top - y;
        if (rel + it.h < -240 || rel > vh + 240) continue;
        const offset = (rel + it.h / 2 - vh / 2) * -it.speed;
        it.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
    });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   08. WORK STAGE — the scroll-driven Selected Work showcase
   ----------------------------------------------------------------------
   Desktop + motion: the stage pins and each project becomes a fullscreen
   sheet that slides up and physically covers the one before it.

   Position comes straight from native scroll — no wheel interception, no
   preventDefault, no gesture queue. That is deliberate: hijacking the
   wheel is what makes this pattern feel sticky and unresponsive on a
   trackpad, because the page stops matching the user's fingers. Reading
   scrollY instead means a fling scrolls exactly as far as the OS says it
   should, and the sheets simply follow.

   A light lerp smooths the sheet motion, and the rAF that drives it stops
   itself the moment the value settles.
   ══════════════════════════════════════════════════════════════════════ */
const Workstage = {
  init() {
    const stage = $('#wstage');
    if (!stage) return;

    const slides = $$('.slides > .slide', stage);
    const moods  = $$('.wstage__mood > .mood', stage);
    const curEl  = $('#wprogCur', stage);
    const fillEl = $('#wprogFill', stage);
    const rail   = $$('.wprog2 > li', stage);
    const N = slides.length;
    if (N < 2) return;

    /* Mobile, tablet, no-JS and reduced motion all keep the plain stacked
       flow — the enhancement is desktop-with-motion only. */
    if (!DESKTOP() || REDUCED) { moods[0]?.style.setProperty('opacity', '1'); return; }

    stage.classList.add('wstage--on');
    stage.style.setProperty('--runway', `${(N - 1) * 100}vh`);

    /* The pinned stage defeats the browser's lazy-load heuristic: every
       sheet is technically inside the viewport but translated out of it,
       and some covers never fetch until far too late. Eager-load them once
       the stage is enhanced; the stacked mobile flow keeps loading="lazy". */
    for (const img of $$('.slide img', stage)) img.loading = 'eager';   // eagerCovers

    const parts = slides.map((s) => ({
      el: s,
      cover: $('.slide__cover', s),
      kids: $$('.slide__copy > *', s)
    }));

    let top = 0, runway = 1;
    Scroll.onMeasure(() => {
      const r = stage.getBoundingClientRect();
      top = r.top + scrollY;
      runway = Math.max(1, stage.offsetHeight - innerHeight);
    });

    /* ── Hold, then change ─────────────────────────────────────────────
       One viewport-height of scroll is one project. The switch from
       project i to i+1 happens only inside the middle band of that unit
       (T0→T1); either side of it the sheet holds perfectly still. So for
       most of its scroll distance a project is unmistakably *the* current
       one, and the change, when it comes, is a distinct event — not a
       constant half-crossfade. */
    const T0 = 0.30, T1 = 0.70;
    const easeIO = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const rawAt = (y) => clamp((y - top) / runway, 0, 1) * (N - 1);
    const shape = (raw) => {
      const i = Math.floor(raw), t = raw - i;
      if (i >= N - 1) return N - 1;
      return i + easeIO(clamp((t - T0) / (T1 - T0), 0, 1));
    };

    let target = 0, val = 0, raf = null, visible = false, lastAct = -1;

    const setActive = (act) => {
      if (act === lastAct) return;
      lastAct = act;
      stage.dataset.active = String(act);
      if (curEl) {
        curEl.textContent = String(act + 1).padStart(2, '0');
        curEl.classList.remove('flip');
        void curEl.offsetWidth;            // restart the flip
        curEl.classList.add('flip');
      }
      for (let i = 0; i < rail.length; i++) rail[i].classList.toggle('on', i === act);
    };

    /* Stacked sheets, not a crossfade. d = v - i is negative while a sheet
       is still climbing in from below, positive once the next one covers
       it. The outgoing sheet shrinks, lifts and darkens hard, so the eye
       reads "that one is leaving" before the new one has fully landed. */
    const render = (v) => {
      for (let i = 0; i < N; i++) {
        const { el, cover, kids } = parts[i];
        const d = v - i;
        const entry = clamp(1 + d, 0, 1);
        const coverAmt = clamp(d, 0, 1);

        el.style.visibility = d <= -1.02 || d >= 1.02 ? 'hidden' : 'visible';
        el.style.pointerEvents = Math.abs(d) < .5 ? 'auto' : 'none';

        const ty = d < 0 ? (1 - entry) * 100 : -coverAmt * 6;
        const scale = d < 0 ? 0.96 + entry * 0.04 : 1 - coverAmt * 0.07;
        el.style.transform = `translate3d(0, ${ty.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
        if (cover) cover.style.opacity = (Math.sqrt(coverAmt) * .92).toFixed(3);

        for (let ci = 0; ci < kids.length; ci++) {
          const e2 = clamp(entry - ci * .07, 0, 1);
          const k = kids[ci];
          k.style.opacity = e2.toFixed(3);
          k.style.transform = `translate3d(0, ${((1 - e2) * 22).toFixed(1)}px, 0)`;
        }
      }
      for (let i = 0; i < moods.length; i++) {
        moods[i].style.opacity = Math.max(0, 1 - Math.abs(v - i) * 1.6).toFixed(3);
      }
      if (fillEl) fillEl.style.setProperty('--p', (v / (N - 1)).toFixed(3));
      setActive(clamp(Math.round(v), 0, N - 1));
    };

    const tick = () => {
      const diff = target - val;
      if (Math.abs(diff) < 0.0005) {
        val = target; render(val); raf = null;
        for (const p of parts) p.el.style.willChange = '';
        return;
      }
      val += diff * 0.2;
      render(val);
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (raf) return;
      for (const p of parts) p.el.style.willChange = 'transform';
      raf = requestAnimationFrame(tick);
    };

    /* ── Snap ──────────────────────────────────────────────────────────
       If scrolling stops inside a change band, finish the change: glide
       to whichever project is nearer so the stage never rests half-way
       between two. Resting anywhere in a hold band is left alone. */
    const goTo = (i) => scrollTo({
      top: Math.round(top + (clamp(i, 0, N - 1) / (N - 1)) * runway),
      behavior: 'smooth'
    });
    let idleT = 0;
    const snap = () => {
      const y = scrollY;
      if (y < top || y > top + runway) return;
      const raw = rawAt(y), i = Math.floor(raw), t = raw - i;
      if (i >= N - 1 || t <= T0 + 0.02 || t >= T1 - 0.02) return;
      goTo(t < 0.5 ? i : i + 1);
    };

    Scroll.on(({ y }) => {
      if (!visible) return;
      target = shape(rawAt(y));
      kick();
      clearTimeout(idleT);
      idleT = setTimeout(snap, 160);
    });

    new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
      if (visible) { target = shape(rawAt(scrollY)); kick(); }
    }, { rootMargin: '10% 0px' }).observe(stage);

    /* Keyboard: one press, one project — only while the stage is pinned. */
    addEventListener('keydown', (e) => {
      if (!visible || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target.closest('input, textarea, [contenteditable]') || document.body.classList.contains('lock')) return;
      const y = scrollY;
      if (y < top - 4 || y > top + runway + 4) return;
      const cur = Math.round(rawAt(y));
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key) && cur < N - 1) { e.preventDefault(); goTo(cur + 1); }
      else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key) && cur > 0) { e.preventDefault(); goTo(cur - 1); }
    });

    render(0);

    if (FINE) {
      slides.forEach((s) => {
        const media = $('.slide__media', s), tilt = $('.slide__tilt', s);
        if (!media || !tilt) return;
        let r = null;
        media.addEventListener('mouseenter', () => { r = media.getBoundingClientRect(); });
        media.addEventListener('mousemove', (e) => {
          if (!r) return;
          const px = (e.clientX - r.left) / r.width - .5;
          const py = (e.clientY - r.top) / r.height - .5;
          tilt.style.transform =
            `perspective(1200px) rotateY(${(px * 3.4).toFixed(2)}deg) rotateX(${(-py * 3.4).toFixed(2)}deg)`;
        }, { passive: true });
        media.addEventListener('mouseleave', () => { tilt.style.transform = ''; r = null; });
      });
    }
  }
};


/* ══════════════════════════════════════════════════════════════════════
   09. PROCESS — a scroll-tied fill that lights each node in turn
   ══════════════════════════════════════════════════════════════════════ */
const Process = {
  init() {
    const row = $('#proc');
    if (!row) return;
    const steps = $$('.proc__i', row);
    if (!steps.length) return;

    if (REDUCED || innerWidth <= 1024) {
      steps.forEach((s) => s.classList.add('is-on'));
      row.style.setProperty('--p', '1');
      return;
    }

    let top = 0, h = 0;
    Scroll.onMeasure(() => {
      const r = row.getBoundingClientRect();
      top = r.top + scrollY; h = r.height;
    });

    let visible = false;
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) { Scroll.measure(); Scroll.run(); } }, { rootMargin: '20% 0px' }).observe(row);

    let lastP = -1;
    Scroll.on(({ y, vh }) => {
      if (!visible) return;
      /* 0 as the row's top edge reaches the bottom of the viewport,
         1 once it has travelled to roughly the viewport's middle. */
      const p = clamp((y + vh * 0.78 - top) / (h + vh * 0.3), 0, 1);
      if (Math.abs(p - lastP) < 0.004) return;
      lastP = p;
      row.style.setProperty('--p', p.toFixed(3));
      const lit = p * steps.length;
      for (let i = 0; i < steps.length; i++) steps[i].classList.toggle('is-on', lit > i + 0.35);
    });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   10. ABOUT STATEMENT — words brighten as the line scrolls through
   ══════════════════════════════════════════════════════════════════════ */
const AboutWords = {
  init() {
    const el = $('.about__statement');
    if (!el || REDUCED) return;

    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
    el.classList.add('about__statement--live');
    const spans = $$('.w', el);

    let top = 0, h = 0;
    Scroll.onMeasure(() => {
      const r = el.getBoundingClientRect();
      top = r.top + scrollY; h = r.height;
    });

    let visible = false;
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) { Scroll.measure(); Scroll.run(); } }, { rootMargin: '25% 0px' }).observe(el);

    let lastLit = -1;
    Scroll.on(({ y, vh }) => {
      if (!visible) return;
      const p = clamp((y + vh * 0.82 - top) / (h + vh * 0.28), 0, 1);
      const lit = Math.round(p * spans.length);
      if (lit === lastLit) return;
      lastLit = lit;
      for (let i = 0; i < spans.length; i++) spans[i].classList.toggle('on', i < lit);
    });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   11. RECOGNITION — sticky frame follows the item at the viewport centre
   ══════════════════════════════════════════════════════════════════════ */
const Certs = {
  init() {
    const list = $('#certsList');
    if (!list) return;
    const items = $$('.certs__item', list);
    const shots = $$('.certs__img, .certs__open');   // image + its outbound link swap together
    const idx = $('#certsIdx');
    if (!items.length) return;

    if (innerWidth <= 1024) { items.forEach((i) => i.classList.add('is-on')); return; }

    let cache = [];
    Scroll.onMeasure(() => {
      cache = items.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, mid: r.top + scrollY + r.height / 2, h: r.height };
      });
    });

    let visible = false;
    /* Refresh the moment the list comes into view, so a direct jump (a nav
       link, a restored scroll position) lands on the right item instead of
       waiting for the next scroll event. */
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) { Scroll.measure(); Scroll.run(); } }, { rootMargin: '15% 0px' })
      .observe(list);

    let active = -1;
    Scroll.on(({ y, vh }) => {
      if (!visible || !cache.length) return;
      const centre = y + vh / 2;

      let best = 0, bestD = Infinity;
      for (let i = 0; i < cache.length; i++) {
        const c = cache[i];
        const d = Math.abs(c.mid - centre);
        /* Proximity drives a 0→1 custom property, so neighbours fade
           rather than snap between states. */
        c.el.style.setProperty('--prox', clamp(1 - d / (c.h * 1.15), 0, 1).toFixed(3));
        if (d < bestD) { bestD = d; best = i; }
      }

      if (best === active) return;
      active = best;
      for (let i = 0; i < items.length; i++) items[i].classList.toggle('is-on', i === best);
      const n = items[best].dataset.cert;
      for (const s of shots) s.classList.toggle('is-on', s.dataset.cert === n);
      if (idx) idx.textContent = String(best + 1).padStart(2, '0');
    });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   12. PANEL — capability detail sheet
   ══════════════════════════════════════════════════════════════════════ */
const Panel = {
  init() {
    const panel = $('#cs'), body = $('#csBody');
    if (!panel || !body) return;
    let opener = null;

    const close = () => {
      panel.hidden = true;
      document.body.classList.remove('lock');
      opener?.focus();
      opener = null;
    };

    const open = (key) => {
      const c = CAPABILITIES[key];
      if (!c) return;
      body.innerHTML = `
        <div class="csv">
          <header class="csv__head">
            <p class="csv__n">Capability</p>
            <h2 class="csv__t" id="csTitle">${esc(c.title)}</h2>
            <p class="csv__d">${esc(c.lede)}</p>
          </header>
          <section class="csv__sec">
            <p class="csv__k">What that involves</p>
            <ul class="csv__list">${c.what.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
          </section>
          <section class="csv__sec">
            <p class="csv__k">In practice</p>
            <p>${esc(c.proof)}</p>
          </section>
          <div class="csv__cta">
            <a class="btn btn--fill" href="#work" data-close>See the work
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a class="btn btn--out" href="mailto:guptaprasadadhikari@gmail.com">Get in touch</a>
          </div>
        </div>`;
      panel.hidden = false;
      document.body.classList.add('lock');
      panel.querySelector('.cs__sheet').scrollTop = 0;
      panel.querySelector('.cs__x')?.focus();
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-service]');
      if (trigger) {
        opener = trigger;
        open(trigger.dataset.service);
        return;
      }
      if (e.target.closest('[data-close]') && e.target.closest('#cs')) close();
    });

    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   13. LIGHTBOX
   ══════════════════════════════════════════════════════════════════════ */
const Lightbox = {
  init() {
    const lb = $('#lb'), img = $('#lbImg');
    if (!lb || !img) return;
    let opener = null;

    const close = () => {
      lb.hidden = true;
      document.body.classList.remove('lock');
      img.src = '';
      opener?.focus();
      opener = null;
    };

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-lightbox]');
      if (t) {
        opener = t;
        img.src = t.dataset.lightbox;
        img.alt = t.dataset.lightboxAlt || '';
        lb.hidden = false;
        document.body.classList.add('lock');
        lb.querySelector('.lb__x')?.focus();
        return;
      }
      if (e.target.closest('[data-close]') && e.target.closest('#lb')) close();
    });

    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) close(); });
  }
};


/* ══════════════════════════════════════════════════════════════════════
   14. AMBIENT — dust, marquee, clock
   ══════════════════════════════════════════════════════════════════════ */
const Dust = {
  init() {
    const host = $('#dust');
    if (!host || REDUCED || LITE) return;

    const n = DESKTOP() ? 26 : 12;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.style.cssText =
        `left:${(Math.random() * 100).toFixed(2)}%;` +
        `top:${(60 + Math.random() * 50).toFixed(2)}%;` +
        `--o:${(0.16 + Math.random() * 0.28).toFixed(2)};` +
        `animation-duration:${(14 + Math.random() * 16).toFixed(1)}s;` +
        `animation-delay:-${(Math.random() * 22).toFixed(1)}s;`;
      frag.appendChild(el);
    }
    host.appendChild(frag);
  }
};

/* The marquee's second set is cloned rather than written twice, so the
   loop can never desync from an edit to the first. */
const Marquee = {
  init() {
    const rail = $('#toolsRail'), set = $('#toolsSet');
    if (!rail || !set) return;
    const clone = set.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    rail.appendChild(clone);
  }
};

const Clock = {
  init() {
    const y = $('#year');
    if (y) y.textContent = String(new Date().getFullYear());

    const el = $('#localTime');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'
    });
    const tick = () => { el.textContent = `Rourkela, India — ${fmt.format(new Date())} IST`; };
    tick();
    setInterval(tick, 30000);
  }
};


/* ══════════════════════════════════════════════════════════════════════
   15. BOOT
   ══════════════════════════════════════════════════════════════════════ */
function init() {
  if (LITE) document.documentElement.classList.add('lite');

  Scroll.init();

  Intro.init();
  Marquee.init();
  Nav.init();
  Reveal.init();
  Cursor.init();
  Magnetic.init();
  Beams.init();
  Parallax.init();
  Workstage.init();
  Process.init();
  AboutWords.init();
  Certs.init();
  Panel.init();
  Lightbox.init();
  Dust.init();
  Clock.init();

  /* Web fonts change text metrics, which moves every cached offset. */
  document.fonts?.ready.then(() => { Scroll.measure(); Scroll.run(); });
  addEventListener('load', () => { Scroll.measure(); Scroll.run(); }, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
