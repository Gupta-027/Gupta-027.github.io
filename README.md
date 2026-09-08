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
assets/covers/      Cinematic cover per project (JPEG, ~70–150 KB) — real screenshot on a laptop scene
assets/screens/     Case-study gallery frames cut from live captures
assets/recognition/ Recognition frames — hackathon award card, LeetCode profile
assets/certificates Real certificates
```

## Editing content

- **Projects:** edit `CASE_STUDIES` in `case-study.js`; the slide cards are in `index.html` under `#work`.
- **Replace a cover:** drop a 1600×1000 JPEG into `assets/covers/` with the same name. Covers are built by rendering a screenshot into a laptop scene (headless Edge), then saved as progressive JPEG.
- **Add gallery frames:** put JPEGs in `assets/screens/` and list them in that study's `screens` array in `case-study.js` (`src`, `alt`, `caption`, optional `wide`).
- **Portrait:** save a photo as `assets/portrait.jpg` (4:5, ~800×1000). The page falls back to `assets/portrait.svg` until it exists.
- **Chatbot answers:** `data/portfolio-data.js`.

## Performance notes

Ambient glows are radial-gradients, not `filter: blur()`, so they cost a transform per frame instead of a re-rasterise. One rAF-throttled scroll hub serves every module with cached offsets (zero layout reads per frame). The pinned work stage reads native `scrollY` — no wheel hijacking. Below-fold sections use `content-visibility: auto`. Low-power devices get a trimmed ambient layer via `.lite`.
