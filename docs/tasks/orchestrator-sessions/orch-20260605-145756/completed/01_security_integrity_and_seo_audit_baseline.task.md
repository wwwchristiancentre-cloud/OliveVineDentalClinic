# Task 01: Security, Integrity, and SEO Audit Baseline

## 🔧 Agent Setup (DO THIS FIRST)
### Workflow to Follow
- Takomi workflow: `vibe-build` audit/review pass.

### Prime Agent Context
Read these first:
- `docs/tasks/orchestrator-sessions/orch-20260605-145756/master_plan.md`
- `package.json`
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- all route pages under `src/app/**/page.tsx`
- `src/components/**`
- `src/config/constants.ts`
- `docs/Coding_Guidelines.md` if present

### Optional Skill / Context Overlays
| Overlay | Why |
| :--- | :--- |
| `security-audit` | Dependency, secret, auth, rate-limit, RLS, input, and static issue checks. |
| `nextjs-standards` | Next.js App Router quality and verification expectations. |
| `seo-ready` | Metadata, sitemap, robots, manifest, structured data, and semantic HTML checks. |
| `audit-website` | Use local/live crawler if available. |

## Objective
Create a high-confidence baseline report of security, site-integrity, SEO, accessibility, and production assembly issues, prioritizing actionable fixes for the current codebase.

## Scope
- Static analysis of dependencies, configs, route files, client components, metadata, links, images, iframe usage, and public assets.
- Run safe read-only commands where useful: `pnpm audit`, grep security patterns, route inventory, and checks for sitemap/robots/manifest/security headers.
- If `squirrel` is installed and a dev server can be used safely, run an LLM-format local audit; otherwise document that the crawler was unavailable.

## Context
This is a dental clinic marketing/booking site. Do not assume auth, database, payments, or public API routes unless discovered in code. Focus on production hardening without expanding product scope.

## Definition Of Done
- Findings are grouped by severity: CRITICAL, HIGH, WARNING, INFO.
- Each finding includes file/location and specific recommendation.
- Identify which findings should be fixed in Task 02.
- Explicitly state if no backend/auth/API/database exists.

## Expected Artifacts
- `.jstar/audit_report.md` or equivalent markdown report content.
- Concise implementation checklist for Task 02.

## Constraints
- Read-only unless creating/updating audit report artifacts.
- Do not modify app code in this task.

## Verification
- Include commands run and relevant outputs/summaries.
