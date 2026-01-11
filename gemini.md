# Project Context: MUI Greyscale Admin Dashboard

## Overview
This project is a React-based Admin Dashboard using Material UI (MUI).
The design philosophy is strictly **Greyscale / Neutral**, inspired by sleek, minimal interfaces like shadcn/ui but built with MUI primitives.

## Technology Stack
- **Framework**: Vite + React (TypeScript)
- **UI Library**: Material UI (MUI) v7
- **Icons**: Iconify / Material Icons
- **State Management**: React Context / Hooks
- **Routing**: React Router

## Design System
- **Colors**: Black, White, Grey tones only. No primary colors like Blue or Green unless strictly needed for semantic status (e.g., success/error), but even then, prefer muted tones.
- **Typography**: Inter (or system default sans-serif).
- **Styling**: Minimalist. Flat design. Subtle borders.

## Directory Structure
- `src/components`: Reusable generic components.
- `src/layouts`: Layout wrappers (DashboardLayout, etc.).
- `src/pages`: Page content.
- `src/theme`: MUI Theme configuration.
- `agents/`: AI Agent definitions.
- `skills/`: Reusable AI skills/workflows.
