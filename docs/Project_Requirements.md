# Project Requirements Document (PRD)

## Project Overview
**Name:** Olive Vine Dental Clinic Launch Website  
**Mission:** Launch a secure, polished, booking-focused web presence for Olive Vine Dental Clinic that helps visitors understand the clinic, trust the doctor, and schedule an appointment quickly.  
**Stage:** Genesis foundation preparing for Design  
**Primary Stack:** Next.js, React, CSS Modules, selective 21st.dev components, lightweight motion  

## Product Goal
Deliver a fast launch-ready marketing site within 1–2 days that:
- works reliably
- is safe to host publicly
- gives visitors direct booking access
- presents the clinic with warmth, professionalism, and personality

## Primary User Needs
1. As a visitor, I want to quickly understand what the clinic offers.
2. As a prospective patient, I want to trust the doctor and clinic before booking.
3. As a visitor, I want an easy way to book a time or message via WhatsApp.
4. As the clinic owner, I want a site that can go live fast without shipping risky unfinished systems.

## Product Strategy
### Launch Decision
The launch version will prioritize a **single-page conversion-focused homepage** with a dedicated booking route.

### Supported Routes
- `/` — homepage / landing page
- `/booking` — dedicated booking experience or hosted scheduler handoff
- `/privacy` — privacy/legal page
- optional lightweight detail pages later (`/services`, `/about`)

### Core UX Decision
- The doctor becomes the main visual anchor in the hero
- The existing hand/shield animation is retained as a supporting signature element, not a blocking full-screen intro
- AI/patient portal/admin ambitions are deferred from the launch site unless explicitly re-scoped later

## Functional Requirements

| ID | Requirement | User Story | Expected Outcome | Priority | Launch Status |
|---|---|---|---|---|---|
| FR-L01 | Doctor-led hero | As a visitor, I want to immediately see a credible human face behind the clinic so I can trust the brand. | Hero includes doctor image, strong headline, subcopy, booking CTA, and WhatsApp CTA. | High | In scope |
| FR-L02 | Non-blocking signature animation | As a visitor, I want the site to feel memorable without being slowed down or interrupted. | Hand/shield animation appears as a supporting section or background accent and does not gate entry. | High | In scope |
| FR-L03 | Services preview | As a visitor, I want to see what the clinic offers before booking. | Homepage shows 4–6 core services with clear plain-language descriptions and CTAs. | High | In scope |
| FR-L04 | Doctor story / trust section | As a prospective patient, I want to understand the doctor’s approach and background. | Homepage includes a doctor story/editorial section with image, bio, trust markers, and quote or positioning. | High | In scope |
| FR-L05 | Testimonials / proof | As a visitor, I want reassurance that other patients trust the clinic. | Homepage includes visible testimonials or equivalent social proof. | Medium | In scope |
| FR-L06 | Booking entry point | As a visitor, I want a direct path to schedule a visit. | Persistent and repeated CTAs lead to a dedicated booking experience. | High | In scope |
| FR-L07 | WhatsApp contact flow | As a visitor, I want quick assistance if I am not ready to book immediately. | WhatsApp CTA is available in the header, hero, and/or floating action area. | High | In scope |
| FR-L08 | Location and contact clarity | As a visitor, I want to know where the clinic is and how to reach it. | Address, phone, hours, and map/directions are clearly visible. | High | In scope |
| FR-L09 | Secure public hosting baseline | As the clinic owner, I want the site safe to expose publicly. | Public site contains no exposed secrets, avoids unfinished sensitive flows, and is ready for managed hosting. | High | In scope |
| FR-L10 | Launch-ready deployment path | As the clinic owner, I want the site hosted and shareable quickly. | Site can be deployed on a managed platform with a stable public URL. | High | In scope |
| FR-L11 | Copy refinement handoff | As the team, we want the design and structure ready before final copy polishing. | Layout and content slots are defined cleanly so copy can be refined by the user or another agent. | Medium | In scope |
| FR-L12 | 21st.dev-assisted design acceleration | As the team, we want to move fast without rebuilding common UI from scratch. | Selected 21st.dev sections are integrated or mapped for the design phase. | Medium | In scope |

## Non-Goals for This Launch
The following are intentionally deferred unless re-approved:
- full patient portal
- authentication system
- admin dashboard
- direct browser-side AI features
- heavy 3D-first scrollytelling as the main experience
- CMS integration
- payment workflows
- complex backend scheduling engine beyond the booking handoff needed for launch

## Homepage Requirements
The homepage must include, in order:
1. Sticky header
2. Doctor-led hero
3. Hand/shield signature section
4. Trust/proof strip
5. Services preview
6. Doctor story/about section
7. Patient experience / why choose us
8. Testimonials
9. Booking explainer + CTA
10. Location/contact
11. Final CTA
12. Footer

## Technical Requirements
- Keep the initial page load lightweight
- Avoid forced animation replay on refresh
- Respect reduced-motion preferences
- Do not expose secrets to the client
- Prefer managed hosting and simple configuration
- Keep components adaptable to the current Next.js structure
- Use only a limited set of 21st.dev components that fit the brand and performance goals

## Security Requirements
- No API keys or secrets shipped client-side
- No unfinished auth/admin routes exposed as production-ready features
- No deceptive booking flows; every CTA must lead to a real next step
- Legal/privacy page must exist before launch
- External integrations must be reviewed before publishing

## Content Requirements
The design should support:
- clinic headline and positioning
- doctor biography and portrait
- top services and short descriptions
- testimonials
- contact details
- booking messaging
- WhatsApp support copy

Final copy can be refined later by the user or a dedicated copywriting pass.

## Design Requirements
- Premium but human
- Warm, calm, and trustworthy
- Editorial photography over generic stock style
- Subtle motion instead of overly theatrical intros
- Doctor personality should be visible early in the page

## Success Criteria
The launch version is successful when:
- users can understand the clinic quickly
- users can book or message without friction
- the site feels trustworthy and distinct
- the hand/shield concept survives in a supporting role
- the site is secure enough to host publicly
- the design is ready for a focused Gemini handoff in the next phase

## Open Inputs Still Needed
- final doctor photography / portrait assets
- final copy pass
- preferred booking provider
- preferred hosting platform
- final clinic contact details if different from current research

## Recommended Next Stage
**Design** — finalize section styling, 21st.dev component selection, and Gemini-ready handoff assets before implementation.