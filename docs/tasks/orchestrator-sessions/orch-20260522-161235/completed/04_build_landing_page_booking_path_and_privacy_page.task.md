# Task 04: Build Landing Page, Booking Path, and Privacy Page

## 🔧 Agent Setup (DO THIS FIRST)
### Workflow to Follow
- vibe-build

### Prime Agent Context
- `docs/tasks/orchestrator-sessions/orch-20260522-161235/master_plan.md`
- approved output of Tasks 02 and 03
- `docs/Project_Requirements.md`
- current `src/app` structure
- `docs/Coding_Guidelines.md`

### Optional Skill / Context Overlays
| Overlay | Why it helps |
|---|---|
| none | Standard implementation task once design is approved. |

## Objective
Implement the launch homepage and supporting routes in the present Next.js repo.

## Scope
- replace current homepage structure with the approved launch layout
- build doctor-led hero
- integrate hand/shield section in its new supporting role
- implement services, doctor story, testimonials, contact, CTA, and footer sections
- create or refine `/booking`
- create `/privacy`
- add WhatsApp CTA behavior

## Definition Of Done
- homepage matches approved launch structure
- booking route exists and works as a real next step
- privacy page exists
- no forced intro gate remains on page load
- mobile and desktop layouts are functional

## Expected Artifacts
- updated `src/app/page.tsx` and related components/styles
- updated or new booking route
- privacy route
- any required supporting components/assets

## Constraints
- keep performance in check
- respect reduced motion
- do not expose sensitive or unfinished flows as production-ready

## Dependencies
- Tasks 02 and 03

## Verification
Run build checks and verify that every visible CTA leads to a valid path or external target.
