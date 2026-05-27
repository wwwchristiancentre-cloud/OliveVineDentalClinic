# Gemini Design Handoff

## Project
Olive Vine Dental Clinic launch website

## Mission
Design a secure, premium, booking-first public website that can launch quickly and help visitors:
- trust the clinic
- understand services
- book a visit
- message via WhatsApp if needed

This is **not** a full platform redesign. It is a focused launch-site design handoff for the present Next.js project.

## Current Strategic Decision
The old 3D-first concept has been intentionally reduced for launch.

### What changed
- The homepage is now **doctor-led**, not chair-led.
- The hand/shield concept remains, but only as a **supporting signature section**.
- The site must feel premium and distinctive **without** forcing users through a blocking intro.
- Booking, trust, and launch speed are higher priority than maximal visual experimentation.

## Primary Outcomes
The design should help the final implementation achieve:
1. immediate trust
2. clear service understanding
3. obvious booking path
4. clear WhatsApp/contact path
5. polished public-launch readiness

## Product Constraints
- timeline is short: 1–2 days to launch direction
- design quality still matters
- avoid risky unfinished product patterns
- avoid overbuilt flows that slow launch
- copy is not fully locked yet; structure should allow later copy refinement

## Technical Context
- current project: Next.js + React + CSS Modules
- current repo already contains some 3D work and premium styling direction
- design should remain adaptable to the current structure rather than assuming a Tailwind-only rebuild
- 21st.dev components may be used selectively and adapted

## Non-Goals
Do **not** design around these as launch requirements:
- patient portal
- admin dashboard
- browser-side AI tools
- payment system
- full CMS workflow
- heavy scrollytelling as the main homepage experience
- full-screen forced intros

## Core Brand Direction
The homepage should feel:
- warm premium
- calm clinical
- human and reassuring
- editorial rather than templated
- distinct but not theatrical

### Keywords
- trust
- care
- precision
- calm
- premium
- personal
- refined

### Avoid
- generic stock-dental look
- hyper-tech sci-fi visuals dominating the doctor
- flashy effects that feel gimmicky for healthcare
- too many unrelated visual systems on one page

## Homepage Structure
Use this exact section order unless a very strong reason emerges to merge two adjacent sections.

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

## Section Notes

### 1. Sticky Header
Must include:
- branding
- Services
- About
- Location
- FAQ or equivalent utility link if space allows
- Book Now CTA
- WhatsApp CTA

Design intent:
- clean
- readable
- trust-first
- compact on scroll

### 2. Doctor-Led Hero
This is the emotional anchor of the homepage.

Must include:
- doctor portrait as the main visual anchor
- strong trust-building headline
- short supporting copy
- primary CTA: Book Appointment
- secondary CTA: WhatsApp / Quick Enquiry
- optional small credentials row below the CTAs

Preferred layout:
- left: content
- right: doctor portrait + subtle premium motion/background

Important:
- the doctor should feel welcoming, credible, and premium
- no chair-first or abstract-first hero
- the doctor image should not be treated like generic filler photography

### 3. Hand / Shield Signature Section
This section preserves the old identity without harming conversion.

Purpose:
- connect the clinic to precision, safety, and care
- retain the symbolic hand/shield concept

Preferred layout:
- left: copy about safety, standards, precision, gentle care, or infection control
- right: hand/shield visual or motion piece

Behavior rules:
- not a blocking intro
- not a forced replay on refresh
- should either animate once per session or load in a resting state
- must respect reduced motion
- mobile can use simplified or mostly static treatment

### 4. Trust / Proof Strip
Compact reassurance band.

Content options:
- Abuja location
- patient-centered care
- modern tools/equipment
- clear booking process
- responsive support
- trust badges or review cues if available

### 5. Services Preview
Show 4–6 top services.

Recommended service categories:
- General dentistry
- Cleaning
- Cosmetic dentistry / whitening
- Restorative care
- Orthodontics
- Emergency dental care

Design intent:
- clean cards
- clear labels
- plain-language descriptions
- obvious path to learn more or book

### 6. Doctor Story / About Section
This section gives the site soul.

Should include:
- larger portrait or editorial image
- philosophy of care
- short bio
- credentials or leadership highlights
- one quote or signature line
- CTA to book or learn more

### 7. Patient Experience / Why Choose Us
This should feel empathetic, not overly technical.

Themes:
- gentle care
- clear communication
- clean environment
- modern treatment tools
- thoughtful follow-through

### 8. Testimonials
Use 2–4 concise testimonial cards.

Themes to emphasize:
- comfort
- professionalism
- trust
- clarity
- results

### 9. Booking Explainer + CTA
Explain the booking flow simply.

Suggested structure:
- choose service
- choose time
- confirm visit
- WhatsApp for help

### 10. Location + Contact
Must make the clinic easy to reach.

Include:
- address
- phone
- WhatsApp
- hours
- directions / map link

### 11. Final CTA
Short, direct conversion close.

Buttons:
- Book Appointment
- WhatsApp
- Call Clinic

### 12. Footer
Must be stable, clear, and tasteful.

Include:
- navigation
- clinic details
- privacy page
- contact links

## Approved 21st.dev Direction
Use only a **small number** of 21st.dev patterns.

### Best uses
- hero background inspiration
- trust/proof strip
- services grid
- editorial/about framing
- testimonial structure or final CTA

### Use custom builds for
- header
- hero layout itself
- hand/shield section
- booking explainer
- location block
- footer

## Recommended 21st.dev Candidates

### Hero background inspiration
- cinematic landing hero
- aurora section hero
- interactive hero backgrounds
- aurora borealis shader

### Trust / proof strip
- logo-cloud-2
- bundled/901
- bundled/1068

### Services
- grid-feature-cards
- features
- bundled/1766

### Doctor story / about
- about-us-section
- parallax-scroll-feature-section
- clip-path-image

### Testimonials
- retro-testimonial
- bundled/2053

### Final CTA
- cta-with-marquee
- cta-with-video only if performance and assets justify it

## Components to Avoid or Downplay
- flickering-footer
- globe-heavy location visual if it adds noise
- pricing components for the homepage
- login/signup components
- overly decorative components without a clear medical-brand fit

## Motion Rules
- motion must feel calm and premium
- no full-screen gating intro
- no aggressive repeated autoplay
- hero motion must stay behind the doctor and CTAs
- hand/shield motion is section-level, not page-gating
- mobile motion must be simplified
- reduced motion support is mandatory

## Keep / Adapt / Replace Guidance

### Keep
- olive/gold premium direction
- safety/protocol positioning
- hand/shield concept at a symbolic level
- premium editorial intent

### Adapt
- current navbar into a cleaner launch header
- shield concept into a section after the hero
- premium copy tone into clearer launch messaging
- any useful 3D work into supporting accents only

### Replace
- blocking `IPCShieldIntro`
- chair-first hero
- spectacle-first homepage logic
- any interaction that delays booking or weakens trust

## Deliverables Expected From Design Work
The downstream design output should ideally provide:
- final section-by-section visual direction
- component choice confirmations
- spacing and hierarchy cues
- motion guidance
- styling notes that can be implemented in the Next.js repo
- any specific notes for adapting 21st.dev sections into the existing project

## Design Success Criteria
A strong design result will:
- make the doctor the immediate trust anchor
- preserve the hand/shield concept without annoyance
- feel premium and human
- make booking obvious above the fold
- remain believable for a real clinic launch
- avoid looking like stitched-together demo components

## Priority Order
When tradeoffs appear, prioritize in this order:
1. trust
2. booking clarity
3. speed to launch
4. cohesion
5. motion richness
6. novelty

## Files to Review First
- `docs/Project_Requirements.md`
- `docs/design/homepage-section-spec.md`
- `docs/design/homepage-component-mapping.md`
- `src/app/page.tsx`
- `docs/mockups/home.html`

## Open Inputs Still Missing
- final doctor portrait assets
- final copy pass
- final clinic details/hours confirmation
- booking provider choice
- hosting target
- whether real testimonials are approved for use

## Final Direction Summary
Design a homepage that feels like a premium private clinic with real human care at the center. The doctor should lead the experience. The hand/shield concept should survive as a memorable signature layer, but not as a barrier. Keep the page elegant, grounded, conversion-first, and ready for a fast public launch.