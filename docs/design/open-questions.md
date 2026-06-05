# Open Questions

## External Decisions
1. **Booking mechanism for launch:** Resolved — use the WhatsApp request flow. The site should present this as a request handoff, not an instantly confirmed appointment.
2. **Hosting target:** Resolved — use Vercel.
3. **Domain / DNS:** Pending launch-ops confirmation — `https://www.olivevinedental.com` is the configured production URL. Confirm it is connected to the Vercel project and DNS is resolving correctly before public launch. If not ready, launch first with the Vercel production or preview URL.

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
If speed is the priority, the safest path is:
- use the current WhatsApp request flow for launch
- host on Vercel
- launch with a temporary Vercel link first if custom-domain DNS is not ready
- keep WhatsApp both in the header and as a floating action button
- defer `/services` as a lightweight future page unless content is already ready
- let the hand/shield section animate only in-view or once per session, never as a full-screen gate
