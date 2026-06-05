# Task 02: Implement Hardening and SEO Assembly Fixes

## 🔧 Agent Setup (DO THIS FIRST)
### Workflow to Follow
- Takomi workflow: `vibe-build` implementation pass.

### Prime Agent Context
Read these first:
- `docs/tasks/orchestrator-sessions/orch-20260605-145756/master_plan.md`
- Task 01 audit report
- `docs/Coding_Guidelines.md`
- `package.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, route pages, components, and constants.

### Optional Skill / Context Overlays
| Overlay | Why |
| :--- | :--- |
| `nextjs-standards` | App Router implementation rules and mandatory `npx tsc --noEmit` after TS/TSX edits. |
| `security-audit` | Apply concrete remediation for high-severity security and guardrail findings. |
| `seo-ready` | Implement metadata, sitemap, robots, manifest, JSON-LD, canonical/OpenGraph/Twitter setup. |

## Objective
Apply scoped fixes that make the app more secure, SEO-ready, accessible, and production-assembled while preserving existing design and content intent.

## Scope
Likely fix classes include:
- Security headers and production-safe Next.js configuration.
- Robust global metadata, metadata base, OpenGraph/Twitter metadata, robots, sitemap, manifest, and local-business/dentist structured data.
- Safe external link handling and iframe hardening where needed.
- Accessibility improvements for interactive controls and image usage where low-risk.
- `.gitignore` or documentation updates only if guardrail gaps are found.

## Context
The app currently appears to be primarily static/marketing content with WhatsApp and phone contact flows. Avoid adding auth/rate-limit/database patterns when there are no API routes or sensitive backend flows.

## Definition Of Done
- All Task 01 CRITICAL/HIGH items that are safe to fix locally are fixed.
- New or updated route files use Next.js App Router conventions.
- Existing visual design remains intact.
- TypeScript check passes after TS/TSX edits.
- Lint/build issues are fixed or clearly documented if unrelated/pre-existing.

## Expected Artifacts
- Code/config changes.
- Updated audit/remediation notes if useful.

## Constraints
- Preserve existing uncommitted user work.
- Do not rewrite the homepage wholesale.
- Do not add new third-party packages unless necessary and justified.

## Verification
- `npx tsc --noEmit`
- `pnpm lint`
- `pnpm build`
