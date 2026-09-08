# Gupta Prasad Adhikari — Portfolio

UI/UX & product design portfolio. Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.

**Live:** https://gupta-027.github.io/

## Structure

```
index.html          Homepage — hero, work, capabilities, about, process, experience, recognition, contact
case-study.html     One template, rendered from ?p=<key> by case-study.js
style.css           Design system + every homepage section
case-study.css      Case-study page layout
script.js           All behaviour (single scroll hub, pinned work stage, reveals, panels)
case-study.js       Case-study content + renderer
chatbot.js/.css     Local portfolio assistant (reads data/portfolio-data.js)
assets/covers/      SVG cover art per project
assets/certificates Real certificates
```

## Editing content

- **Projects:** edit `CASE_STUDIES` in `case-study.js`; the slide cards are in `index.html` under `#work`.
- **Replace cover art:** drop real screenshots into `assets/covers/` and update the `src` on the matching `<img>` — the `.svg` files are placeholders drawn to hold the layout until real screens exist.
- **Portrait:** replace `assets/portrait.svg` with a photo (4:5 works best).
- **Chatbot answers:** `data/portfolio-data.js`.

## Performance notes

Ambient glows are radial-gradients, not `filter: blur()`, so they cost a transform per frame instead of a re-rasterise. One rAF-throttled scroll hub serves every module with cached offsets (zero layout reads per frame). The pinned work stage reads native `scrollY` — no wheel hijacking. Below-fold sections use `content-visibility: auto`. Low-power devices get a trimmed ambient layer via `.lite`.
