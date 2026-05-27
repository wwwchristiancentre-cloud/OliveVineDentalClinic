# Open Questions

## External Decisions
1. Which booking provider should be used for launch?
2. Which hosting target should be used for launch?
3. Will there be a direct public domain immediately, or a temporary hosted link first?

## Content / Brand Questions
4. Which doctor portrait(s) are approved for use?
5. Is there a preferred exact clinic positioning line or headline direction?
6. Are there approved testimonials ready for publication?
7. Are before/after images allowed or preferred?

## UX Questions
8. Should WhatsApp be a floating action button, header CTA only, or both?
9. Should `/services` be present in launch v1 or deferred until later?
10. Should FAQ appear in the homepage body, the nav only, or be deferred?

## Motion Questions
11. Should the hand/shield section animate automatically once per session, or start in a resting state and animate only when in view?
12. Should the hero include any subtle hand/shield visual echo behind the doctor, or keep that concept entirely in section 2?

## Practical Recommendation
If speed is the priority, the safest answers are:
- use a hosted booking provider
- use a managed host like Vercel or Netlify
- launch with a temporary hosted link first if needed
- keep WhatsApp both in the header and as a floating action button
- defer `/services` as a lightweight future page unless content is already ready
- let the hand/shield section animate only in-view or once per session, never as a full-screen gate
