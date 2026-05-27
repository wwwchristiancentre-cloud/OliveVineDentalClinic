# Homepage Component Mapping

## Purpose
Translate the approved homepage structure into a practical design plan using a small, curated set of 21st.dev components plus selective custom implementation inside the current Next.js project.

## Design Position
This homepage should feel:
- premium but human
- calm, warm, and medically trustworthy
- distinct without becoming overly theatrical
- conversion-led, not animation-led

The site should **not** feel like a generic dental template, but it also should **not** behave like an art installation that delays booking.

## Overall Recommendation
Use a **hybrid approach**:
- **custom build** for the doctor-led hero and the hand/shield signature section because they define the brand
- **21st.dev components** for supporting layout acceleration: proof strip, services grid, about/editorial framing, testimonials, CTA, and possibly location treatment
- preserve existing 3D work only where it reinforces trust and identity

## Recommended Component Budget
Use only **5 core 21st.dev insertions/adaptations** for v1:
1. hero background treatment
2. trust/proof strip or logo cloud
3. services/features grid
4. editorial/about section framing
5. testimonials or final CTA

Everything else should be custom or lightly adapted to keep the page cohesive.

---

## Section-by-Section Mapping

| Section | Build Type | 21st.dev Candidate(s) | Recommendation |
|---|---|---|---|
| Sticky header | Custom | `animated-menu-1` as inspiration only | Build custom header; keep medical tone clean and avoid over-animated nav behavior. |
| Doctor-led hero | Custom + selective background inspiration | `cinematic-landing-hero`, `aurora-section-hero`, `interactive-hero-backgrounds`, `aurora-borealis-shader` | Custom hero layout with doctor portrait; borrow only the background/motion language, not the full component structure. |
| Hand/shield signature section | Custom | `parallax-scroll-feature-section`, `geometric-sphere` as optional supporting inspiration | Keep custom because it must integrate existing shield/hand visual logic and new replay behavior rules. |
| Trust / proof strip | 21st-adapted | `logo-cloud-2`, `bundled/901`, `bundled/1068` | Use a compact proof strip or logo-style trust band, adapted for trust badges, review stats, or care principles. |
| Services preview | 21st-adapted | `grid-feature-cards`, `features`, `bundled/1766` | Best fit for 4–6 services with elegant icon/card treatment and clear CTAs. |
| Doctor story / about | 21st-adapted | `about-us-section`, `parallax-scroll-feature-section`, `clip-path-image` | Use editorial framing here; this is the best place for personality and portrait storytelling. |
| Patient experience / why choose us | 21st-adapted or custom | `features`, `grid-feature-cards`, `ringlabs/animated-check-box` | Prefer a restrained custom or lightly adapted features block; avoid noisy animations. |
| Testimonials | 21st-adapted | `retro-testimonial`, `bundled/2053` | Use a restrained testimonial layout; simplify styling if the retro look is too playful. |
| Booking explainer + CTA | Custom + 21st accent | `cta-with-marquee`, `lightning-split`, `bundled/653` | Keep structure custom; use marquee or split-light treatment sparingly for energy near conversion. |
| Location + contact | Custom + optional 21st enhancement | `interactive-map`, `globe` | Use only if integration stays lightweight; otherwise use a clean custom location block with map embed/link. |
| Final CTA | 21st-adapted | `cta-with-marquee`, `cta-with-video` | Prefer marquee version; video version only if assets and performance justify it. |
| Footer | Custom or lightly adapted | `flickering-footer` | Likely custom. The flicker treatment may be too aggressive for a clinic unless heavily softened. |

---

## Exact Recommendations by Section

### 1. Sticky Header
**Recommendation:** custom build.

**Why:**
- The header is a trust element, not an entertainment element.
- Medical sites benefit from clear navigation and immediate CTA access.
- Existing `Navbar` should be reviewed for reuse, but the structure likely needs refinement.

**Keep / Adapt / Replace:**
- **Keep:** idea of simple top-level nav and strong booking CTA.
- **Replace:** any overly cinematic or blend-mode-heavy behavior if it reduces readability.

**Notes:**
- Include Book Now and WhatsApp visibly.
- Mobile menu should prioritize contact, booking, and directions.

---

### 2. Doctor-Led Hero
**Recommendation:** custom hero using 21st background inspiration.

**Primary candidate references:**
- `https://cdn.21st.dev/easemize/cinematic-landing-hero/default/bundle.1774169408294.html?theme=light`
- `https://cdn.21st.dev/dhileepkumargm/aurora-section-hero/default/bundle.1759140631930.html?theme=light`
- `https://cdn.21st.dev/ravikatiyar162/interactive-hero-backgrounds/default/bundle.1755167312016.html?theme=light`
- `https://cdn.21st.dev/dhileepkumargm/aurora-borealis-shader/default/bundle.1756052616664.html?theme=light`

**Hero composition:**
- Left: headline, supporting copy, Book Appointment CTA, WhatsApp CTA, optional credential chips
- Right: doctor portrait with soft ambient glow / aurora / premium background gradient
- Optional subtle hand/shield silhouette behind portrait on large screens only

**Why custom:**
- The doctor portrait is the emotional center of the page.
- A generic full hero import will likely fight the brand voice and content structure.

**Motion rule:**
- motion should support the portrait, not compete with it
- no blocking intro
- no autoplay sequence that prevents interaction

---

### 3. Hand / Shield Signature Section
**Recommendation:** custom build using the existing concept, repositioned as a trust section.

**Supporting inspiration:**
- `https://cdn.21st.dev/sumonadotwork/parallax-scroll-feature-section/default/bundle.1751685953253.html?theme=light`
- `https://cdn.21st.dev/dhileepkumargm/geometric-sphere/default/bundle.1759930495872.html?theme=light`

**Placement:**
- immediately after the hero
- two-column section works best: left = trust/safety copy, right = hand/shield animation

**Behavior decision:**
- do not use `IPCShieldIntro` as a full-screen gate before content
- animation should either:
  - play once per session and then rest in a completed state, or
  - render directly into a subtle idle state unless user triggers motion
- add reduced-motion fallback
- on mobile, consider static or simplified canvas state

**Keep / Adapt / Replace:**
- **Keep:** the symbolic hand/shield signature and safety framing
- **Adapt:** transform intro into a section-level experience
- **Replace:** forced replay on refresh

---

### 4. Trust / Proof Strip
**Recommendation:** adapt a lightweight trust-band pattern.

**Candidates:**
- `https://cdn.21st.dev/sshahaider/logo-cloud-2/default/bundle.1761136047930.html?theme=light`
- `https://cdn.21st.dev/bundled/901.html?theme=light`
- `https://cdn.21st.dev/bundled/1068.html?theme=light`

**Use case:**
- not literal client logos unless available
- instead adapt for:
  - Abuja location
  - patient-first care
  - modern equipment
  - clear booking process
  - emergency responsiveness if accurate

**Note:**
- This section should be compact and reassure quickly.

---

### 5. Services Preview
**Recommendation:** use a curated feature-card layout.

**Best candidates:**
- `https://cdn.21st.dev/sshahaider/grid-feature-cards/default/bundle.1747156095291.html?theme=light`
- `https://cdn.21st.dev/sehajbindra/features/default/bundle.1749387619299.html?theme=light`
- `https://cdn.21st.dev/bundled/1766.html?theme=light`

**Why:**
- clean grid structures map naturally to dental services
- easy to adapt icons, card copy, and CTAs
- better than rebuilding a bland card grid from scratch

**Recommended content:**
- general dentistry
- cleaning
- cosmetic dentistry / whitening
- restorative care
- orthodontics
- emergency dental care

**Keep / Adapt / Replace:**
- **Keep:** existing “Curated Treatments” idea as a tone reference
- **Replace:** the current copy and card framing with more patient-readable launch content

---

### 6. Doctor Story / About Section
**Recommendation:** adapt an editorial about section.

**Best candidates:**
- `https://cdn.21st.dev/uniquesonu/about-us-section/default/bundle.1749719069056.html?theme=light`
- `https://cdn.21st.dev/sumonadotwork/parallax-scroll-feature-section/default/bundle.1751685953253.html?theme=light`
- `https://cdn.21st.dev/larsen66/clip-path-image/default/bundle.1749989658399.html?theme=light`

**Why:**
- this is the right place for warmth and personality
- the about-us structure supports portrait + philosophy + credibility
- parallax can be used subtly here without blocking conversion

**Recommended content blocks:**
- portrait
- philosophy of care
- short bio
- credentials / leadership highlights
- quote
- CTA to book or learn more

---

### 7. Patient Experience / Why Choose Us
**Recommendation:** lightweight custom or very restrained feature adaptation.

**Candidates:**
- `https://cdn.21st.dev/sehajbindra/features/default/bundle.1749387619299.html?theme=light`
- `https://cdn.21st.dev/sshahaider/grid-feature-cards/default/bundle.1747156095291.html?theme=light`
- `https://cdn.21st.dev/ringlabs/animated-check-box/default/bundle.1747471846216.html?theme=light`

**Why:**
- This section should feel empathetic and practical.
- Over-animation would cheapen the trust signal.

**Preferred treatment:**
- 3–5 concise reasons to choose the clinic
- soft icons or check treatments
- simple reveal motion only

---

### 8. Testimonials
**Recommendation:** adapt a testimonial component but simplify styling if needed.

**Candidates:**
- `https://cdn.21st.dev/ishamsu/retro-testimonial/default/bundle.1747178884381.html?theme=light`
- `https://cdn.21st.dev/bundled/2053.html?theme=light`

**Why:**
- social proof matters for booking
- card-based testimonial layouts are quick wins

**Caution:**
- If “retro” styling feels too playful, use only the structure and tone it down.

---

### 9. Booking Explainer + CTA
**Recommendation:** custom content block with optional 21st accent treatment.

**Candidates:**
- `https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-reverse/bundle.1759331424507.html?theme=light`
- `https://cdn.21st.dev/cinquinandy/lightning-split/default/bundle.1760802028658.html?theme=light`
- `https://cdn.21st.dev/bundled/653.html?theme=light`

**Why:**
- The conversion path should stay explicit.
- The structure should explain booking in plain language.
- The visual treatment can be more energetic here than in the trust sections.

**Recommended content:**
- Step 1: choose service
- Step 2: choose time
- Step 3: confirm visit
- support note about WhatsApp help

---

### 10. Location + Contact
**Recommendation:** mostly custom with optional map enhancement.

**Candidates:**
- `https://cdn.21st.dev/lovesickfromthe6ix/interactive-map/default/bundle.1752059124545.html?theme=light`
- `https://cdn.21st.dev/ruixen.ui/globe/default/bundle.1755628836403.html?theme=light`

**Recommendation detail:**
- Use a simple clean address block first
- Add a map or direction link only if it stays reliable and fast
- globe effect is optional and likely unnecessary for launch

**Priority:**
clarity over novelty

---

### 11. Final CTA
**Recommendation:** adapt `cta-with-marquee` if it stays tasteful.

**Best candidate:**
- `https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-reverse/bundle.1759331424507.html?theme=light`

**Alternative if assets improve later:**
- `https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-video/bundle.1759331424507.html?theme=light`

**Why:**
- strong closing momentum without requiring a full custom invention
- easy to adapt to “Book your visit / Message on WhatsApp / Call clinic”

---

### 12. Footer
**Recommendation:** custom footer.

**Candidate to avoid unless heavily softened:**
- `https://cdn.21st.dev/aghasisahakyan1/flickering-footer/default/bundle.1759970115840.html?theme=light`

**Why custom:**
- clinics need clarity and stability in the footer
- flicker effects can feel gimmicky or unsettling in a healthcare context

---

## What to Keep, Adapt, or Replace from the Current Homepage

### Keep
- premium olive/gold/serif brand direction
- service-preview concept
- safety/protocol positioning
- existing hand/shield visual idea at a conceptual level

### Adapt
- `Navbar` into a cleaner conversion-first header
- the shield section into the new signature care section
- the existing premium copy tone into clearer launch language
- some existing 3D work into section-level accents instead of page-gating experiences

### Replace
- `IPCShieldIntro` as a required full-screen opener
- chair-first hero composition
- scroll icon as the primary hero interaction cue
- any structure that prioritizes spectacle ahead of booking clarity

---

## Components to Avoid or Use Only as Loose Inspiration
- `flickering-footer` — too unstable/gimmicky for a clinic brand
- `cta-with-video` — only if high-quality assets exist and performance stays strong
- `globe` — visually interesting but not a booking priority
- `pricing-section` components — not aligned with current homepage scope unless the clinic wants transparent price framing immediately
- `login-signup` component — outside launch scope
- any highly decorative bundled components without obvious medical-brand fit

---

## Motion Rules
- No full-screen blocking intro on page load
- No repeated forced replay on refresh
- Motion should feel calm, not hyperactive
- Hand/shield section may animate once per session or load into a resting state
- Respect `prefers-reduced-motion`
- Hero background motion should stay behind the doctor, never compete with the face or CTAs
- Mobile should get simpler animation states than desktop

---

## Performance Risks
1. **Too many imported visual systems** can make the page feel stitched together instead of designed.
2. **Hero + hand/shield + map + marquee + testimonials** can become too motion-heavy if all animate strongly.
3. Imported 21st sections may assume Tailwind/shadcn conventions and require adaptation to the current CSS Modules setup.
4. Keeping chair-heavy 3D in the hero would weaken the new trust-first strategy.

## Trust Risks
1. Overly experimental animation can reduce perceived professionalism.
2. A visually noisy hero can reduce booking conversions.
3. If the doctor image is weak or generic, the entire strategy loses force.
4. If the hand animation still feels like an “unskippable intro,” users may bounce.

---

## Recommended Final Homepage Stack
If we stay disciplined, the best launch mix is:
- **Custom:** header, hero, hand/shield section, booking explainer, location, footer
- **21st-adapted:** trust strip, services grid, doctor story framing, testimonials, final CTA

This gives speed **without** making the page feel borrowed.

---

## Recommended Build Sequence
1. Rebuild header and doctor-led hero
2. Refactor hand/shield intro into a non-blocking section
3. Integrate services grid and trust strip
4. Add doctor story/editorial section
5. Add testimonials and final CTA
6. Add location/contact block
7. Tune motion, reduce replay behavior, and test mobile performance
8. Prepare Gemini handoff or proceed into implementation with this mapping

## Unresolved Inputs
- final doctor portrait(s)
- final clinic contact details/hours confirmation
- booking provider choice
- hosting target
- whether testimonials and before/after imagery are available for real use
