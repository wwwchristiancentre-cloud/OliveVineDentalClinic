# Gemini Copy-Paste Prompt

You are the design agent for the Olive Vine Dental Clinic launch website.

## Repo Context
You are working in the present project repo, not the old prototype.

Current branch:
- `feat/site-foundation-20260522`

## Read These First
Read these files before doing anything else:
1. `docs/design/gemini-design-handoff.md`
2. `docs/design/homepage-section-spec.md`
3. `docs/design/homepage-component-mapping.md`
4. `docs/design/design-asset-checklist.md`
5. `docs/design/open-questions.md`
6. `docs/Project_Requirements.md`
7. `src/app/page.tsx`
8. `docs/mockups/home.html`

## Mission
Design the Olive Vine Dental Clinic launch homepage for a fast public launch.

This is a **premium, booking-first, trust-first medical website**, not a full product platform.

The immediate goal is to produce a homepage design direction that is:
- doctor-led
- warm and premium
- conversion-focused
- appropriate for a real clinic
- compatible with the current Next.js project

## Critical Decisions Already Made
Do not undo these unless you find a very strong reason and explain it clearly.

1. The homepage is a **single-page landing page**.
2. The hero must be **doctor-led**.
3. The hand/shield concept stays, but only as a **supporting signature section**.
4. There must be **no blocking full-screen intro**.
5. The old chair-first / spectacle-first direction is **not** the launch priority.
6. Use **only a small number of 21st.dev components**.
7. Priority order is:
   - trust
   - booking clarity
   - speed to launch
   - cohesion
   - motion richness
   - novelty

## Homepage Structure To Use
Use this section order:
1. Sticky header
2. Doctor-led hero
3. Hand/shield signature section
4. Trust / proof strip
5. Services preview
6. Doctor story / about section
7. Patient experience / why choose us
8. Testimonials
9. Booking explainer + CTA
10. Location + contact
11. Final CTA
12. Footer

## Key Design Rules
- Make the doctor the emotional anchor.
- Keep the hand/shield concept, but never as a page gate.
- Motion should feel calm, elegant, and premium.
- Respect reduced motion.
- Do not make the page feel like stitched-together flashy demo components.
- Keep it believable for a real clinic launch in Abuja.
- WhatsApp and booking must remain obvious throughout the experience.

## 21st.dev Usage Rules
Use the provided mapping docs. Prefer:
- hero background inspiration only
- trust strip
- services grid
- doctor story framing
- testimonials or final CTA

Avoid overusing decorative components.

## What I Want From You
Please do the following:

1. Review the current homepage direction and confirm whether the proposed structure is correct.
2. Produce a refined **design plan** for the homepage section by section.
3. Confirm which 21st.dev-inspired patterns should actually be used.
4. Suggest any improvements to hierarchy, tone, spacing, or motion.
5. Explicitly describe how the doctor portrait should be used in the hero and about section.
6. Explicitly describe how the hand/shield section should behave visually.
7. Call out any design risks, cohesion problems, or places where the current plan may still feel too ambitious.
8. If appropriate, propose a tighter final version of the homepage that is even more launch-friendly.

## Output Format
Return your response in this structure:

### 1. Design Verdict
Short summary of whether the current direction is strong.

### 2. Final Homepage Design Recommendation
Section-by-section design guidance.

### 3. 21st.dev Component Decisions
Which ones to use, adapt, or avoid.

### 4. Hero Direction
Exact guidance for the doctor-led hero.

### 5. Hand/Shield Direction
Exact guidance for the supporting signature section.

### 6. Visual System Notes
Color, typography, spacing, motion, photography, tone.

### 7. Launch Risk Review
What might still hurt trust, speed, or conversion.

### 8. Recommended Next Action
What should be implemented first.

## Important Constraint
Do not drift back into a heavy 3D-first concept unless you can prove it improves the launch outcome more than it hurts speed and usability.

## If You Need To Tighten Scope
You are allowed to simplify the design further, but you must preserve:
- doctor-led hero
- hand/shield signature section
- booking-first conversion flow
- premium medical brand feel
