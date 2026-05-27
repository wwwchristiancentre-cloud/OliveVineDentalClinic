# Homepage Section Spec

## Purpose
Create a conversion-first landing page that feels premium, human, and trustworthy while keeping the existing Olive Vine visual personality. The page should help visitors quickly understand the clinic, trust the doctor, and book a visit.

## Structural Decision
- Primary experience: single-page landing page at `/`
- Supporting routes: `/booking`, `/services` (optional lightweight detail), `/privacy`
- Conversion goals: book appointment, open WhatsApp, call clinic

## Visual Direction
- Tone: warm premium, calm clinical, human, reassuring
- Style: editorial photography + subtle motion, not heavy forced intro theatrics
- Palette: olive, cream, soft gold, deep neutral
- Motion: elegant and lightweight; avoid blocking page access

## Section Order

### 1. Sticky Header
**Purpose:** Immediate navigation and conversion.

**Content:**
- Olive Vine branding
- Nav links: Services, About, Location, FAQ
- Primary CTA: Book Now
- Secondary CTA: WhatsApp

**Notes:**
- Keep compact and clean
- Mobile menu should prioritize booking/contact actions

### 2. Doctor-Led Hero
**Purpose:** Build trust and personality immediately.

**Content:**
- Strong headline
- Short trust-building subcopy
- Primary CTA: Book Appointment
- Secondary CTA: WhatsApp / Quick Enquiry
- Doctor portrait as the main visual anchor
- Optional small credentials row under CTAs

**Layout:**
- Left: copy and CTAs
- Right: doctor image with subtle animated background or motion accent

**Notes:**
- This replaces the old idea of a full-screen forced intro
- The doctor image should feel premium and welcoming, not generic stock photography

**21st.dev candidates:**
- Cinematic landing hero
- Aurora section hero
- Interactive hero backgrounds

### 3. Signature Care / Hand-Animation Section
**Purpose:** Preserve brand personality and visual distinctiveness without harming conversion.

**Content:**
- Hand/shield animation tied to care, precision, and safety
- Supporting copy around infection control, clinical standards, or gentle hands
- Optional short label such as “Precision You Can Feel” or “Safety With Grace”

**Behavior rules:**
- Must not hard-block page entry
- Must not fully replay on every reload
- Play once per session or appear in final resting state on return visits
- Include reduced-motion/static fallback
- Optional “Replay” or “Skip motion” affordance if needed

**Placement recommendation:**
- Full section directly after hero
- Subtle hero-side/background usage is allowed, but the full motion moment belongs here

### 4. Trust / Proof Strip
**Purpose:** Reinforce credibility quickly.

**Content ideas:**
- Abuja location
- modern equipment
- patient-centered care
- transparent booking
- emergency support / rapid response where appropriate

**Optional proof:**
- review snippets
- partner logos / trust badges

**21st.dev candidates:**
- Logo cloud
- compact feature strip

### 5. Services Preview
**Purpose:** Show what visitors can actually book.

**Content:**
- 4–6 top services
- short plain-language descriptions
- link or CTA per service

**Recommended services:**
- General dentistry
- Professional cleaning
- Cosmetic dentistry / whitening
- Restorative care
- Orthodontics
- Emergency dental care

**21st.dev candidates:**
- Grid feature cards
- Features section

### 6. Doctor Story / About Section
**Purpose:** Give the site soul and make the clinic memorable.

**Content:**
- Larger doctor portrait or editorial image
- Philosophy of care
- short bio
- credentials / years of practice / leadership highlights
- quote or personal statement
- CTA: Book with the doctor / Meet the clinic

**21st.dev candidates:**
- About-us section
- Parallax scroll feature section

### 7. Patient Experience / Why Choose Us
**Purpose:** Explain how the clinic experience feels.

**Content:**
- gentle care
- clear communication
- modern tools
- clean environment
- thoughtful follow-through

**Notes:**
- Keep emotional and patient-centered, not overly technical

### 8. Testimonials / Social Proof
**Purpose:** Reduce hesitation before booking.

**Content:**
- 2–4 testimonial cards
- emphasis on comfort, professionalism, trust, and outcomes

**21st.dev candidates:**
- Retro testimonial

### 9. Booking Explainer + CTA
**Purpose:** Make booking feel easy.

**Content:**
- 3 simple steps: choose service, choose time, confirm
- support via WhatsApp for questions
- strong CTA to `/booking`

**Notes:**
- This should bridge naturally into the dedicated booking page

### 10. Location + Contact
**Purpose:** Make the clinic easy to reach.

**Content:**
- address
- phone
- WhatsApp
- hours
- map / directions link

**21st.dev candidates:**
- Interactive map
- Simple contact/location layout

### 11. Final Conversion CTA
**Purpose:** Capture users who reached the bottom.

**Content:**
- short conversion headline
- Book Appointment
- WhatsApp
- Call Clinic

**21st.dev candidates:**
- CTA with marquee
- CTA with video (only if performance remains strong)

### 12. Footer
**Purpose:** Utility and reassurance.

**Content:**
- nav links
- clinic details
- privacy page
- social/contact

**Notes:**
- Keep tasteful; do not let footer effects overpower the medical brand

## Component Use Rules
- Use only 4–6 strong 21st.dev sections, not every interesting component
- Prioritize conversion, speed, and consistency over novelty
- Keep heavy 3D limited and purposeful
- Reuse the hand/shield idea as a signature accent, not as a blocking intro gimmick

## Acceptance Criteria
- Hero is doctor-led and trust-first
- Hand animation is present but non-blocking
- Booking CTA is visible above the fold
- WhatsApp CTA is persistent and clear
- Homepage feels premium and human, not generic or over-engineered
- Layout supports a fast design handoff to Gemini in the next stage
