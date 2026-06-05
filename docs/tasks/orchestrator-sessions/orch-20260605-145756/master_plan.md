# Orchestrator Master Plan

## Overview
- **Session ID:** `orch-20260605-145756`
- **Product / Project:** Olive Vine Dental Clinic — Next.js App Router marketing and booking website
- **Mission:** Harden the application for a production-quality launch with emphasis on web security, site integrity, SEO, accessibility, and Next.js assembly correctness.
- **Current Phase:** Build / Review hardening pass, building on existing Genesis and design artifacts.

## Context Intake
- **Source of truth:** local Next.js project in `C:/CreativeOS/01_Projects/Clients/OliveVineDental/2026-05-22_OliveVineDentalClinic`, plus `docs/Project_Requirements.md`, `docs/Coding_Guidelines.md`, existing design docs, and production checklist.
- **Known stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind, 3D/animation dependencies, static/local clinic content.
- **Known constraints:** repo has pre-existing uncommitted work; all edits must preserve current user changes and avoid unrelated rewrites. This pass must not add backend/auth/payment complexity unless the app already exposes it.
- **Initial risks:** limited root metadata, no visible sitemap/robots/manifest files, broad client-side homepage, possible missing security headers, potential external iframe/link hardening needs, and unverified package/security posture.

## Skills Registry
| Overlay | Why it applies |
| :--- | :--- |
| `nextjs-standards` | Enforces App Router conventions, type checking after TS/TSX edits, and build/lint verification. |
| `security-audit` | Provides full static and guardrail audit: dependency audit, secret scanning, auth/rate-limit/RLS checks, and report severity model. |
| `seo-ready` | Required for metadata, structured data, sitemap, robots, manifest, semantic HTML, and page SEO readiness. |
| `audit-website` | Enables local/live site scan when the site can be served; use `squirrel` if available, otherwise document fallback verification. |
| `web-design-guidelines` | Supports accessibility and UI integrity checks while preserving the existing design. |

## Workflows Registry
| Stage | Workflow | Purpose |
| :--- | :--- | :--- |
| Genesis reference | `vibe-genesis` | Existing docs and requirements remain context for scope and acceptance. |
| Design review | `vibe-design` | Used only to preserve UX/accessibility intent, not redesign the site. |
| Build hardening | `vibe-build` | Implement security/SEO/site-integrity fixes and run verification. |
| Review / Finalize | reviewer pass | Confirm fixes, residual risks, and launch readiness. |

## Task Table
| # | Subtask | Mode / Role | Workflow | Overlays | Dependency | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | Security, integrity, and SEO audit baseline | Review / Security + SEO auditor | `vibe-build` | `security-audit`, `nextjs-standards`, `seo-ready`, `audit-website` | None | pending |
| 02 | Implement hardening and SEO assembly fixes | Code | `vibe-build` | `nextjs-standards`, `security-audit`, `seo-ready` | Task 01 | pending |
| 03 | Verification and final review | Review | `vibe-build` | `security-audit`, `web-design-guidelines`, `audit-website` | Task 02 | pending |

## Progress Checklist
- [x] Detected Next.js App Router project and loaded relevant standards/security/SEO audit overlays.
- [x] Confirmed existing project docs and current dirty git state.
- [x] Created tracked orchestration session for production hardening work.
- [ ] Complete static audit baseline and identify high-confidence fixes.
- [ ] Apply scoped security, SEO, accessibility, and assembly improvements.
- [ ] Run TypeScript, lint, production build, dependency audit, and local site audit where available.
- [ ] Produce final report with changed files, verification evidence, and residual risks.

## Notes
- Preserve existing uncommitted user changes. Do not remove content, images, or design direction unless clearly unsafe.
- Prefer native Next.js metadata and route files over ad hoc head tags.
- Any external navigation must use safe `rel` attributes and validated href construction.
- If `scripts/vibe-verify.py` is absent, use `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` as the practical verification set and note the missing project script.
