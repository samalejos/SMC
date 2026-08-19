# SMC Decision Lab — Build 12

Commercial-architecture rebuild of the SMC Methodology & Decision Lab, replacing the frozen Build 11.2
single-file HTML export with a routed Next.js app.

## Status

**Phase 1 (this build): Beginner Academy** — the 7-section beginner path, fully ported and rebuilt as
discrete lesson routes with a real interactive chart engine (`lightweight-charts`) instead of static SVG tap
markers: risk/reward shaded zones, a pulsing live-candle overlay, animated long/short trade paths, tappable
real candles, and a step-by-step "Play walkthrough" mode.

**Phase 2 (`/learn`) and Phase 3 (`/labs/cold-chart-assessment`)** are stubbed — the 44 depth modules and the
cold-chart assessment engine still need to be ported from the legacy build.

Progress and recall-check answers persist to `localStorage` under the same `smc_*` key prefix as the legacy
export format, so a future import tool can read `smc-methodology-lab/v2`-shaped exports.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

- `lib/content/` — typed lesson content (concept cards, formula cards, recall checks) and chart scene data
- `lib/chart/` — chart primitive types shared by scene data and the chart component
- `lib/progress.tsx` — localStorage-backed progress/recall-check context
- `components/chart/LessonChart.tsx` — the interactive chart engine
- `components/lesson/` — lesson content block components
- `app/start/beginner-academy/` — Beginner Academy overview + per-lesson routes
