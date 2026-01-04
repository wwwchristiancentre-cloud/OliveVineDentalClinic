# Coding Guidelines

## The Blueprint and Build Protocol (Mandatory)

This protocol governs the entire lifecycle of creating any non-trivial feature.

### Phase 1: The Blueprint (Planning & Documentation)
Before writing code, a plan MUST be created in `docs/features/FeatureName.md`. This plan must detail:
- High-Level Goal
- Component Breakdown (label "Server" or "Client")
- Logic & Data Breakdown (hooks, API routes)
- Database Schema Changes (if any)
- Step-by-Step Implementation Plan

**This plan requires human approval before proceeding.**

### Phase 2: The Build (Iterative Implementation)
Execute the plan one step at a time. Present code AND updated documentation after each step.
Wait for "proceed" signal before continuing.

### Phase 3: Finalization
Announce completion. Present final documentation. Provide integration instructions.

---

## Tech-Specific Guidelines

### 1. Next.js 14 (App Router)
- **Server First**: Use Server Components by default. Add `'use client'` only when interactivity (hooks, event listeners) is strictly needed.
- **Project Structure**: Feature-based organization where possible, but adhere to the `src/app` routing conventions.
- **Data Fetching**: Fetch data in Server Components. Pass data down to Client Components as props.

### 2. React Three Fiber (R3F) & 3D
- **Performance**:
  - ALWAYS use `glTF` models compressed with **Draco**.
  - Use `instancedMesh` for particles or repetitive elements (do not map over 1000 items to create Mesh components).
  - Use `drei` helpers (`<Html>`, `<Environment>`, `<Float>`) to save time.
- **State Management**: Use **Zustand** for 3D state (camera positions, active animations). Avoid heavy Context API usage in the render loop.
- **Lazy Loading**: Use `React.lazy` and `Suspense` for heavy 3D chunks.

### 3. Styling (CSS Modules)
- **Methodology**: Use standard CSS Modules (`styles.module.css`).
- **Variables**: Leverage `src/styles/design-tokens.css` for consistent colors (`var(--olive-deep)`, `var(--gold-accent)`).
- **Z-Index**: Manage z-index carefully. 3D canvas is usually fixed in background (`z-index: -1`) or overlaid. Content overlays must be explicitly positioned.

### 4. Animation (GSAP)
- **Cleanup**: Always clean up GSAP ScrollTriggers in the `useEffect` return function to prevent memory leaks/glitches on navigation.
- **Context**: Use `gsap.context()` for proper React cleanup.

### 5. Type Safety
- **Strict Mode**: No `any`. Define interfaces for all component props and API responses.
