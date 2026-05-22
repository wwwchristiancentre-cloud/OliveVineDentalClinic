# Project Context: Olive Vine Dental

## Overview
Launch-focused website for Olive Vine Dental Clinic. Immediate goal is a secure, polished, booking-first public website rather than a full digital platform.

## Current Stage
- Genesis complete enough to proceed into Design
- Recommended next stage: Design

## Core Decisions
- Use the present Next.js repo as the launch project
- Homepage should be a single-page conversion-focused landing page
- Supporting launch routes: `/booking` and `/privacy`
- Hero should be doctor-led
- Existing hand/shield animation should stay in a supporting role, not as a blocking intro
- Animation must not fully replay on every refresh; use session-based or resting-state behavior
- 21st.dev components may be used selectively to accelerate design
- Security, hosting readiness, and direct booking access take priority over ambitious platform features

## Launch Scope
### In Scope
- doctor-led homepage
- services preview
- trust and testimonials
- doctor story section
- WhatsApp CTA
- booking pathway
- privacy page
- hosting/security readiness

### Deferred
- full portal/auth/admin systems
- browser-side AI tools
- heavy 3D-first homepage as the main experience
- CMS and advanced integrations unless re-approved

## Architecture
- `src/app`: routes and page entry points
- `src/components`: shared UI
- `src/features`: larger behavior or visual sections
- `docs/design`: homepage spec and design references
- `docs/tasks/orchestrator-sessions`: orchestration plans and task packets

## Design Direction
Warm premium, calm clinical, human, reassuring. Use subtle motion and strong photography rather than a forced full-screen intro gimmick.
