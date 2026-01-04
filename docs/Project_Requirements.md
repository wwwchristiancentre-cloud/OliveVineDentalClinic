# Project Requirements Document (PRD)

## Project Overview
**Name:** Olive Vine Dental Clinic - Digital Experience
**Mission:** Create an immersive, 3D-first digital experience that reflects the "Pastor-Surgeon" duality of Dr. Emmanuel Oke—blending high-tech clinical precision with high-touch pastoral care.
**Tech Stack:** Next.js 14, React Three Fiber (R3F), GSAP, Sanity.io, CSS Modules.

## Functional Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | **3D IPC Shield Intro** | As a visitor, I want to see a reassuring visual of safety immediately, so that I feel safe from infection. | Page loads with particle chaos that is pushed away by a glowing shield, revealing the clinic. | MUS |
| FR-002 | **Morphing Dental Chair** | As a potential patient, I want to see the quality of equipment, so that I trust the clinic's technology. | 3D chair "assembles" from particles/shards on scroll. Functional 360° rotation. | MUS |
| FR-003 | **Crystal Jaw Experience** | As a patient, I want to visualize my procedure on a model, so that I understand what will happen. | Translucent 3D jaw orbits on scroll. Specific teeth glow when "Implants" or "Whitening" is selected. | MUS |
| FR-004 | **Smart Scheduling System** | As the Surgeon, I want the system to block Sundays and Wed evenings automatically, so that my pastoral duties are respected. | Calendar visuals grey out Sundays and Wed > 4PM. Selection is disabled for these times. | MUS |
| FR-005 | **Floating Tools Orbit** | As a user, I want subtle interactions, so that the site feels "alive". | Dental tools (mirror, probe) float in background and pause/inspect when hovered. | MUS |
| FR-006 | **Pastor-Surgeon Editorial** | As a patient, I want to know who the doctor is, so that I feel a personal connection. | Parallax scrolling section with "Vogue-style" typography and timeline of his career. | MUS |
| FR-007 | **Headless CMS Integration** | As a clinic staff member, I want to update prices and bios easily, so that I don't need a developer for text changes. | Sanity.io dashboard connected to frontend. Updates reflect instantly. | MUS |
| FR-008 | **Draco Compression Pipeline** | As a mobile user, I want the 3D site to load fast, so that I don't leave before it opens. | All 3D assets compressed (max 1MB). Loading screen shows progress. | MUS |
| FR-009 | **Email Notification System** | As the receptionist, I want to get emails when bookings occur, so that I can confirm them. | Automated email sent via Resend/Nodemailer upon booking completion. | Future |
| FR-010 | **Patient Portal** | As a returning patient, I want to see my history, so that I can track my oral health. | Login area with appointments history and 3D jaw chart update. | Future |
