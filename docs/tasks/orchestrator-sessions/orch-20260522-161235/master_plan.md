# Orchestrator Master Plan

## Overview
- **Session ID:** orch-20260522-161235
- **Project:** Olive Vine Dental Clinic launch website
- **Mission:** Reset the project from an over-ambitious 3D-first concept into a fast, premium, secure, booking-focused launch site that can go live within 1–2 days.
- **Current Phase:** Genesis completed enough to unlock Design

## Context Intake
- **Source of truth:** user directives in this session, `docs/21 dev links.md`, revised `docs/Project_Requirements.md`, `docs/design/homepage-section-spec.md`, and current Next.js repo structure.
- **Known constraints:** tight timeline; user wants strong design quality; site must work, be secure, be hosted, and provide direct access for booking.
- **Known preferences:** doctor-led hero; hand/shield concept preserved in a supporting role; avoid annoying forced intro replay; use 21st.dev selectively; copy can be finalized later.
- **Assumptions:** booking will likely rely on a hosted scheduler or simple booking handoff for launch; not all legacy 3D concepts should survive into v1 unchanged.
- **Risks:** design scope creep; overuse of motion-heavy components; domain/DNS confirmation before public launch; exposed client-side secrets from prior prototype patterns.

## Skills Registry
- **21st-dev-components** — useful for mapping provided links into a fast design system and avoiding unnecessary custom section builds.
- Additional skills are optional and not blockers for this session.

## Workflows Registry
- **Genesis / vibe-genesis:** completed for launch scoping, section spec, and PRD reset.
- **Design / vibe-design:** next stage for homepage composition, component mapping, visual rules, and Gemini-ready handoff.
- **Build / vibe-build:** implementation stage for homepage, booking route, privacy page, and deployment/security hardening.
- **Review / Finalize:** verify security, responsiveness, deployment readiness, and CTA integrity before launch.

## Task Table
| Task | Subtask | Mode / Role | Workflow | Overlays | Dependency | Status |
|---|---|---|---|---|---|---|
| 01 | Genesis foundation and scope reset | orchestrator | vibe-genesis | 21st-dev-components | none | completed |
| 02 | Homepage design direction and 21st component mapping | design | vibe-design | 21st-dev-components | 01 | pending |
| 03 | Gemini design handoff packet | design | vibe-design | 21st-dev-components | 02 | pending |
| 04 | Build landing page, booking path, and privacy page | code | vibe-build | none | 02, 03 | pending |
| 05 | Security, hosting, and launch readiness | review / code | vibe-build | none | 04 | pending |
| 06 | Booking provider and hosting decision confirmation | general / user decision | design | none | 01 | completed |

## Progress Checklist
- [x] Confirm current repo and create working branch
- [x] Review old direction and present repo structure
- [x] Decide launch strategy: single-page homepage + booking route
- [x] Decide hero direction: doctor-led
- [x] Decide hand/shield direction: supporting non-blocking section
- [x] Write final homepage section spec
- [x] Rewrite PRD for launch scope
- [x] Initialize orchestration session docs
- [ ] Finalize design system and section/component mapping
- [ ] Prepare Gemini design handoff packet
- [ ] Implement homepage and booking/privacy routes
- [ ] Remove or isolate risky launch-incompatible patterns
- [ ] Configure hosting and deployment flow
- [ ] Validate public launch readiness

## Notes
- The old premium 3D direction still matters as brand inspiration, but it no longer controls launch scope.
- The hand/shield concept is now a signature brand accent rather than a mandatory gate before content.
- The hero must feel premium and human first; animation is subordinate to trust and conversion.
- Only a small set of 21st.dev sections should be used to preserve performance and cohesion.
- Copy is intentionally not over-locked yet so a later copy pass can refine messaging without changing the structure.
