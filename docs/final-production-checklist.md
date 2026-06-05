# Final Production Checklist

## Status Summary
- Build status: **pass**
- Lint status: **pass with warnings only**
- Hosting target: **Vercel**
- Booking mode: **WhatsApp request flow**
- Critical exploit/security blockers found: **none directly exploitable**

## Must Confirm Before Public Launch
### 1. Claims and compliance sign-off
Review and approve all public-facing trust, medical, and credential claims, especially on:
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/privacy/page.tsx`

Focus on:
- MDCN-related wording
- safety / sterilisation wording
- doctor credentials / titles
- any “high standard” or “guided” assurance language

### 2. WhatsApp flow clarity
Current booking flow is a **request handoff**, not a confirmed booking.

Before launch, confirm the UX wording is acceptable:
- the user fills the booking form
- a short prompt appears
- the user is redirected to WhatsApp
- the clinic then reviews availability manually

### 3. Privacy-policy alignment
The booking form currently asks for:
- name
- phone
- email
- notes

But the WhatsApp payload does not currently include every optional field.

Decide one of these:
- include email/notes in the outbound WhatsApp request, or
- clearly label them as optional fields not currently transmitted

Also make sure the privacy page clearly states that booking/contact requests may be sent through WhatsApp.

## Recommended Security / Production Improvements
### High priority
- Add security headers via Next/Vercel config:
  - Content-Security-Policy
  - Referrer-Policy
  - Permissions-Policy
  - Strict-Transport-Security
  - X-Content-Type-Options
- Keep all sensitive data out of query params beyond the intentional WhatsApp handoff
- Reconfirm no hidden debug/admin routes remain public

### Medium priority
- Add reduced-motion handling for motion-heavy UI
- Standardize phone, address, and hours across all pages
- Expand metadata in `src/app/layout.tsx`:
  - `metadataBase`
  - Open Graph
  - Twitter cards
  - shared preview image

### Performance priority
- Replace key `<img>` usages with `next/image` where appropriate, especially large hero images
- Check the homepage hero and major cards for LCP impact

## Deployment Verification Steps
1. Open production or preview deploy on Vercel
2. Test homepage CTAs
3. Test booking form
4. Let WhatsApp countdown reach zero and verify redirect
5. Test Cancel behavior in the prompt
6. Test direct WhatsApp CTA from header/footer/floating button
7. Test `/privacy`
8. Test phone `tel:` links on mobile
9. Test Google Maps embed/link
10. Test on desktop + mobile browsers
11. Run Lighthouse
12. Confirm final copy/claims approval

## Current Reviewer Verdict
- Security review: **Needs minor changes / policy alignment, no direct exploit blockers**
- Production review: **Approve with suggestions**

## Recommended Launch Decision
If clinic copy/claims are approved, the site is close to launch-ready on Vercel.
The remaining work is mostly:
- wording/compliance confirmation
- privacy-flow alignment
- optional hardening and polish
