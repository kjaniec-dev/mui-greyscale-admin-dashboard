# Greyscale Theme Consistency Cleanup

Date: 2026-04-17
Project: `mui-greyscale-admin-dashboard`
Status: Approved for planning

## Summary

The dashboard already has a strong greyscale shell, but many pages bypass the shared theme with local chip, badge, progress, and chart colors. The result is a UI that feels inconsistent from page to page.

This change standardizes the app around a greyscale-first system with a constrained semantic accent model:

- Greyscale remains the default for layout, surfaces, forms, tables, navigation, and typography.
- Accent color is only allowed where it carries meaning:
  - status chips, badges, inline labels
  - progress indicators with status meaning
  - charts and data visualization
  - alerts, toasts, and live/online indicators
- The default semantic accent set is `success`, `warning`, `error`, and `info`.
- `purple` and `cyan` remain available for chart-series overflow only, not for generic UI state labeling.

## Problem

The repository already contains a central accent module in `src/theme/statusColors.ts`, but app pages still drift because many components:

- define local status color maps
- hardcode chip and badge colors in `sx`
- style `LinearProgress` per component
- use page-specific chart palettes instead of the shared chart palette
- introduce extra hues for labels that are not consistently tied to product meaning

This causes several problems:

- the product stops feeling like one dashboard
- operational states are not encoded the same way everywhere
- visual maintenance gets more expensive as more pages are added
- a greyscale-first brand direction is undermined by scattered exceptions

## Goals

- Make the whole app feel like one admin dashboard.
- Preserve the greyscale brand direction.
- Keep status-heavy screens readable and scannable.
- Centralize color decisions so new pages inherit the system by default.
- Reduce page-level `sx` color overrides for repeated UI patterns.

## Non-Goals

- No layout redesign.
- No information architecture or route changes.
- No broad rebrand or typography overhaul.
- No attempt to remove standard destructive/error affordances from MUI dialogs, validation, or alerts.
- No full semantic token system beyond the needs of this cleanup.

## Approved Direction

The approved direction is:

- Base system: greyscale shell
- Accent policy: semantic accents only where meaning matters
- Default accent set: `success`, `warning`, `error`, `info`
- Extra chart-only series colors: `purple`, `cyan`

This corresponds to a restrained accent model rather than a fully monochrome dashboard or a broadly colorful interface.

## Design Decisions

### 1. Keep theme surfaces neutral

`src/theme/theme.ts` remains the authority for:

- background surfaces
- text
- borders and dividers
- primary and secondary neutral actions
- navigation, cards, and table chrome

No page should introduce extra color for non-semantic decoration.

### 2. Treat `statusColors.ts` as the only sanctioned accent source

`src/theme/statusColors.ts` becomes the single shared source for:

- status chip colors
- status label colors
- chart palettes
- online/live indicators
- notification-type accents

All page-local status color maps should be removed or replaced with shared helpers.

### 3. Add reusable helper coverage for common UI states

The shared theme helpers will be expanded to support the actual usage patterns found in the app. The helper API should cover:

- subtle status chips and labels
- solid status chips
- chart series colors
- semantic progress colors
- typed mappings for known badge or label families when needed

The objective is to stop every page from re-deciding how a status or metric should look.

### 4. Use MUI theme overrides for component consistency

Per MUI theme component customization guidance, repeated visual behavior should be defined in the theme when the customization is light and broadly shared.

The cleanup will add theme-level consistency for:

- `MuiChip`
  - shape
  - height
  - font weight
  - border treatment
  - size rhythm
- `MuiLinearProgress`
  - height
  - radius
  - track treatment

These overrides will standardize component weight and density across the app. Color assignment will still come from shared helpers or standard semantic `color` usage, not arbitrary page styling.

### 5. Normalize chart usage to the shared chart palette

All charted surfaces should pull from `getChartColors()` instead of declaring page-specific arrays.

Rules:

- first four series represent the main semantic spectrum: `info`, `success`, `warning`, `error`
- `purple` and `cyan` are reserved for fifth and sixth series when a chart needs more distinction
- charts should not invent custom brand colors outside this palette in this pass

### 6. Keep destructive actions standard

Critical destructive actions should continue using explicit error affordances from MUI or the shared semantic error palette. This includes:

- delete buttons
- destructive menu items
- validation states
- critical alerts

This cleanup is not intended to neutralize danger states into grey when that would reduce clarity.

## Implementation Shape

### Theme Layer

Files:

- `src/theme/theme.ts`
- `src/theme/statusColors.ts`
- `src/theme/index.ts`

Changes:

- add shared component overrides for `MuiChip` and `MuiLinearProgress`
- expand helper utilities in `statusColors.ts`
- keep exported APIs simple and page-friendly

### Feature Cleanup Layer

Target areas for first-pass normalization:

- dashboards
- reports
- inventory
- finance
- CRM
- shared tables
- shared drawers
- chat history

Expected cleanup patterns:

- replace local `statusColors` objects with `getStatusColor()` or `getStatusSolid()`
- replace local chart arrays with `getChartColors()`
- replace ad hoc progress bar colors with shared semantic progress helpers
- reduce repeated `isDarkMode ? x : y` color forks when the helper already abstracts that decision

## Migration Strategy

1. Stabilize the theme layer first.
2. Update shared components that fan out into many pages.
3. Sweep feature pages with the largest color variance.
4. Leave layout and neutral surfaces untouched unless a local override breaks the system.

This order minimizes churn and ensures page fixes inherit shared behavior instead of embedding more one-off styling.

## Risks

### 1. Over-normalizing charts

If charts are forced into too little variation, readability can regress.

Mitigation:

- keep the 6-color shared chart palette
- reserve `purple` and `cyan` for charts only

### 2. Theme override collisions

Global `MuiChip` or `MuiLinearProgress` overrides can unintentionally affect components that rely on unusual sizing.

Mitigation:

- keep overrides focused on broadly shared shape and density
- preserve escape hatches through local `sx` where a component truly needs a special case

### 3. Incomplete cleanup

Some pages may still carry local hardcoded colors after the first sweep.

Mitigation:

- search the codebase for chip, badge, palette, and status-map patterns
- treat remaining one-off color declarations as cleanup follow-up items

## Verification

Minimum verification:

- `npm run lint`
- `npm run build`

Manual smoke-check targets:

- dashboard pages with charts and live metrics
- reports pages with chips and scheduling labels
- inventory tables and drawers with progress/status
- finance pages with payout/tax/subscription statuses
- CRM pages with deal and stage labels
- chat history page with custom transcript status styling

## Success Criteria

- A representative set of pages no longer define local semantic color maps.
- Shared chips, labels, progress bars, and charts follow one consistent visual model.
- The app still reads as greyscale-first.
- Operational states are easier to distinguish than in a fully monochrome version.
- New pages have an obvious shared API for semantic color instead of inventing new styling locally.
