# Repository Guidelines

## Project Structure & Module Organization
This repo is a React 19 + TypeScript + Vite admin dashboard built around MUI. Application code lives in `src/`. Route definitions are in `src/routes/index.tsx`, layout shells in `src/layouts/`, theme setup in `src/theme/`, and reusable UI in `src/components/` (`cards/`, `charts/`, `drawers/`, `forms/`, `tables/`, `common/`). Feature pages are grouped by domain under `src/pages/` (for example `dashboard/`, `reports/`, `inventory/`, `apps/`). Mock datasets live in `src/data/`. Static assets are in `public/` and `src/assets/`. The `agents/` and `skills/` folders hold AI-assistant docs, not runtime code.

## AI Tooling
Use the `mui-mcp` server for Material UI and MUI X questions before falling back to broader documentation search. Prefer it for component APIs, theming guidance, supported props, migration details, and official examples.

## Build, Test, and Development Commands
Use `npm install` to sync dependencies from `package-lock.json`.

- `npm run dev` starts the Vite dev server with HMR.
- `npm run build` runs TypeScript project builds, then creates the production bundle in `dist/`.
- `npm run lint` runs ESLint across the repo.
- `npm run preview` serves the production build locally.

For contributor checks, run `npm run lint && npm run build` before opening a PR.

## Coding Style & Naming Conventions
Use TypeScript with strict compiler settings; avoid unused locals, unused parameters, and untyped escape hatches. Follow the existing style: semicolons enabled, single quotes, and functional React components. Use PascalCase for page and component files (`ScheduledReportsPage.tsx`, `EmptyState.tsx`), camelCase for hooks and utilities, and `index.ts` barrel exports for feature folders where that pattern already exists. Keep new code inside the relevant domain folder instead of growing `src/routes/index.tsx` or unrelated shared modules.

## Testing Guidelines
There is currently no automated test suite or coverage gate configured in `package.json`. Until one is added, treat `npm run lint` and `npm run build` as the minimum validation step and manually smoke-test affected routes in `npm run dev`. If you introduce tests, keep them close to the feature as `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commit prefixes such as `feat:`, `docs:`, and `refactor:`; continue that format and keep subjects concise. PRs should describe the user-facing change, list affected routes/components, and include screenshots or short recordings for dashboard UI updates. Link related issues when applicable and note that lint/build passed before requesting review.
