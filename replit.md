# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Clock Out Time Calculator (`artifacts/clock-out`)
- **Kind**: React + Vite static site (no backend needed)
- **Preview path**: `/` (root)
- **Port**: 22780
- **Domain target**: clockouttime.com
- **Package**: `@workspace/clock-out`

**Calculator tools:**
1. Clock-out time calculator — start time + shift length → departure time
2. Hours between two times — start + end → duration (handles overnight)
3. Weekly timecard — up to 7 days, daily + weekly totals, overtime summary
4. Overtime pay calculator — hours, rate, state → regular/OT/DT pay
5. Time-and-a-half calculator — rate + OT hours → 1.5x pay
6. Double-time calculator — rate + DT hours → 2x pay
7. Break time reference — state-by-state break requirements

**Pages (20+ routes):**
- `/` — Home with all three calculators
- `/8-hour-shift-calculator`, `/10-hour-shift-calculator`, `/12-hour-shift-calculator`, `/6-hour-shift-calculator`, `/4-hour-shift-calculator` — pre-filled shift pages
- `/night-shift-calculator` — overnight shift (defaults to 11 PM start)
- `/what-time-do-i-clock-out`, `/shift-end-time-calculator` — synonym pages for SEO
- `/work-hours-calculator`, `/how-many-hours-did-i-work` — hours-between tool
- `/timecard-calculator` — weekly timecard
- `/overtime-calculator` — overtime pay with state rules
- `/time-and-a-half-calculator`, `/double-time-calculator` — pay rate tools
- `/break-time-calculator` — state break law reference
- `/what-time-is-it-in-4-hours`, `/what-time-is-it-in-8-hours`, `/what-time-is-it-in-12-hours`
- `/work-schedule-calculator` — schedule patterns
- `/about`, `/privacy-policy`, `/contact`

**SEO assets:**
- `public/sitemap.xml` — 22 URLs with priorities
- `public/robots.txt` — allows all crawlers including AI bots
- `public/llms.txt` — comprehensive tool description for AI crawlers
- JSON-LD: FAQPage, BreadcrumbList, WebApplication, WebSite schemas on every page

**Design:**
- Navy primary `hsl(215 60% 25%)`, emerald accent `hsl(160 84% 39%)`
- Overtime flagged orange (>8h paid), double-time flagged red (>12h)
- `+1 day` badge for overnight shifts
- 12h/24h toggle on main calculator

**Key files:**
- `src/lib/calculations.ts` — all pure calculation functions
- `src/data/pageContent.ts` — all 17 page configs (title, description, H1, FAQs, related pages)
- `src/components/ClockOutCalculator.tsx` — main calculator widget
- `src/components/TimecardCalculator.tsx` — weekly timecard widget
- `src/components/HoursBetweenCalculator.tsx` — hours-between widget
- `src/components/Layout.tsx` — header + footer with navigation
- `src/pages/ShiftPage.tsx` — reusable template for all shift-specific pages
