# App-Wide Bundle Cleanup

Date: 2026-04-18
Project: `mui-greyscale-admin-dashboard`
Status: Approved for planning

## Summary

The current app already uses route `lazy` loading, but the actual bundle shape still hurts Lighthouse because:

- section-level route barrels cause one page to pull sibling pages
- the default `/dashboard` route eagerly loads heavy charting code
- heavyweight dependencies such as `@mui/x-data-grid` and `@react-pdf/renderer` are allowed to participate in large shared chunks

The approved direction is an app-wide bundle cleanup that favors Lighthouse performance over immediate eager rendering:

- split routes at the page level instead of the section level
- defer heavy widgets behind fixed-size skeleton states
- keep the page shell interactive while expensive panels hydrate later
- isolate heavy vendor families into explicit chunks so they do not bloat the entry path

This is an app-wide delivery optimization pass, not a visual redesign.

## Problem

Fresh build and browser inspection show several structural issues:

- the main entry bundle is large enough to harm first-load performance on its own
- first load of `/dashboard` immediately downloads the app shell, the dashboard route chunk, and the charting chunk
- `react-pdf.browser` is emitted as a very large chunk even though PDF rendering is only needed for specific invoice/export flows
- `DataGrid` is also heavy and should not be paid for by routes that do not need it

Measured evidence from the current build:

- entry bundle: about `590 kB` minified
- dashboard route chunk: about `141 kB`
- chart chunk used on dashboard: about `292 kB`
- `DataGrid` chunk: about `411 kB`
- `react-pdf.browser` chunk: about `1.6 MB`

The root cause is not one bad component. It is the interaction of:

- route grouping by feature barrels
- eager imports inside reusable heavy components
- insufficiently deliberate vendor chunk boundaries

## Goals

- Reduce JavaScript required for first paint on the default `/dashboard` route.
- Reduce unnecessary code transfer across the rest of the app.
- Preserve current route URLs, page responsibilities, and user workflows.
- Use skeleton-backed deferred loading instead of blank panels.
- Prevent heavy vendor libraries from bloating unrelated routes.
- Create a predictable loading strategy that future pages can follow.

## Non-Goals

- No redesign of dashboard layout or information architecture.
- No change to route URLs or navigation semantics.
- No rewrite of charts, tables, or PDF features to different libraries.
- No attempt to optimize backend or data-fetching performance in this pass.
- No broad refactor of unrelated feature logic while touching pages for bundle cleanup.

## Approved Direction

The approved direction is a hybrid split strategy:

- page-level route splitting
- widget-level deferral for heavy panels
- explicit vendor chunk shaping in Vite

This direction was selected because it improves both:

- the critical `/dashboard` Lighthouse path
- secondary heavy routes such as reports, finance, apps, invoices, and export flows

## Design Decisions

### 1. Replace section barrel route loaders with page-level loaders

`src/routes/index.tsx` currently lazy-loads grouped page barrels such as:

- `../pages/dashboard`
- `../pages/reports`
- `../pages/apps`

That pattern means visiting one page in a section can load code for sibling pages in the same section.

The cleanup will replace those grouped loaders with per-page dynamic imports so each route loads only the page it needs.

Examples:

- `/dashboard` loads `OverviewPage` only
- `/dashboard/analytics` loads `AnalyticsPage` only
- `/reports/new` loads `ReportBuilderPage` only

This keeps route behavior unchanged while removing unnecessary sibling-page coupling.

### 2. Treat heavy widgets as deferred content, not required first paint

For the default `/dashboard` route, the page shell should render immediately:

- page title and copy
- stat cards
- layout chrome

Heavy widgets should render through local lazy boundaries with fixed-size skeletons:

- chart cards
- other non-critical visualization blocks added later

The same rule applies to other heavy pages:

- `DataGrid` tables do not block page shell render
- PDF rendering/download components do not load until the interaction needs them
- specialized panels such as drag-and-drop boards can defer their expensive internals

The page remains usable while heavy code is fetched.

### 3. Keep skeletons dimensionally stable

Deferred panels must reserve the same space as their eventual content.

Rules:

- chart cards keep their title, subtitle, and card container immediately visible
- table pages reserve the table region with a loading shell of similar height
- panel fallbacks use fixed heights where the final component has predictable dimensions

This protects CLS and keeps the UI from looking broken while chunks load.

### 4. Move PDF code behind explicit interaction boundaries

`@react-pdf/renderer` should not load on invoice or export pages just because the user opened a page containing a PDF-related action.

PDF rendering should be triggered only when the user:

- opens a PDF preview flow
- clicks a PDF download action
- otherwise enters a PDF-specific surface

This prevents a very large dependency from polluting the app’s normal browsing path.

### 5. Defer `DataGrid` at the page/widget boundary

`@mui/x-data-grid` should be loaded only by pages that actually render grid-heavy views.

Where a page contains:

- heading
- filters
- actions
- summary content
- a large grid region

the shell should render first, and the grid region should hydrate after.

The objective is not to hide an entire page behind suspense. The objective is to keep expensive table infrastructure out of initial route execution when it is not needed.

### 6. Add explicit vendor chunk boundaries in Vite

The build should separate major heavy families into stable chunks so they do not collapse into oversized mixed bundles.

Target chunk groups:

- charts
- data grid
- PDF rendering
- drag-and-drop

Manual chunking should stay focused on these heavy families only. This pass should not create dozens of micro-chunk rules.

### 7. Keep failures local to deferred panels

If a deferred widget import fails, the route shell should still render.

Deferred regions should have local failure fallbacks with:

- concise error copy
- retry affordance where reasonable

Route-wide failures should continue to use the existing router error handling. A failed chart import must not blank the dashboard.

## Implementation Shape

### Route Layer

Files:

- `src/routes/index.tsx`

Changes:

- replace grouped section loaders with page-specific dynamic imports
- keep existing route paths and layout structure intact

### Widget Layer

Target areas:

- dashboard chart surfaces
- grid-heavy pages
- invoice or export flows that pull PDF rendering
- other pages with obvious heavyweight widget boundaries discovered during implementation

Likely touchpoints:

- `src/pages/dashboard/OverviewPage.tsx`
- `src/components/charts/ChartCard.tsx`
- grid-heavy pages and shared table surfaces
- `src/components/drawers/InvoiceDetailDrawer.tsx`
- shared PDF components under `src/components/pdf/`

Changes:

- introduce route-local or feature-local deferred wrappers
- render page chrome immediately
- render heavy widget bodies through skeleton-backed lazy boundaries

### Build Layer

Files:

- `vite.config.*` if missing or minimal today

Changes:

- add Rollup manual chunk rules for heavy vendor families
- preserve simple defaults for the rest of the app

## Migration Strategy

1. Fix route-level splitting first so page boundaries are real.
2. Optimize the default `/dashboard` route next because it has the highest Lighthouse impact.
3. Move `DataGrid` loading behind deferred page regions.
4. Move PDF rendering behind explicit interaction boundaries.
5. Add focused vendor chunk rules once the import graph is cleaner.

This order keeps the work measurable and avoids tuning the bundler before the import graph is corrected.

## Risks

### 1. Overusing suspense boundaries

If every page creates too many tiny lazy boundaries, the app can become operationally noisy and harder to reason about.

Mitigation:

- defer only heavyweight regions
- keep boundaries coarse and intentional

### 2. Layout instability from poor fallbacks

If skeletons do not preserve footprint, the UI will shift and Lighthouse gains may be offset by worse visual stability.

Mitigation:

- use fixed-height placeholders for chart and table regions
- keep surrounding card and page structure eager

### 3. Broken interactions due to deferred feature wiring

Moving PDF or grid code behind lazy boundaries can break actions if handlers assume eager availability.

Mitigation:

- defer at clear UI boundaries
- keep loading and retry behavior explicit in the surface that owns the feature

### 4. Manual chunk rules that fight natural caching

Poorly chosen chunk groups can make caching or parallel loading worse instead of better.

Mitigation:

- keep chunk rules limited to confirmed heavy vendor families
- verify emitted chunk sizes and first-load requests after the change

## Verification

Minimum verification:

- `npm run lint`
- `npm run build`

Bundle verification:

- compare the largest emitted chunks before and after
- confirm the default `/dashboard` load no longer pulls unrelated sibling-page code
- confirm PDF-related code is absent from routes that do not invoke PDF flows

Manual smoke-check targets:

- `/dashboard`
  - shell renders immediately
  - chart panels show stable skeletons, then hydrate
- one `DataGrid` page
  - shell renders immediately
  - grid region loads after without breaking controls
- one PDF-related flow
  - page loads without PDF code upfront
  - PDF action still works when explicitly triggered

## Success Criteria

- The default `/dashboard` route loads materially less JavaScript on first visit.
- Routes do not load sibling pages from section barrel modules.
- Heavy widgets render behind stable skeletons instead of blocking first paint.
- `DataGrid` and PDF rendering are no longer paid for by unrelated browsing flows.
- The emitted build no longer contains the current oversized mixed loading pattern for critical routes.
- The app remains visually consistent and functionally equivalent from the user’s perspective, aside from deferred widget hydration.
