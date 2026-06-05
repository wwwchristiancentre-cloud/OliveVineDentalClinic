# Olive Vine Dental Clinic — Task 01 Baseline Audit

- **Takomi session:** `orch-20260605-145756`
- **Audit date:** 2026-06-05
- **Scope:** Static baseline audit for security, site integrity, SEO, accessibility, and Next.js assembly correctness.
- **App model found:** Mostly static Next.js App Router marketing/booking site. Booking is client-side only and prepares a WhatsApp message.
- **Backend/auth/API/database status:** **No backend, auth, API route, database, payment, middleware, rate-limit, or RLS implementation found.** There are no `src/app/**/route.ts` files, no `middleware.ts`, and no source references to Supabase/Firebase/Prisma/Mongo/Postgres/MySQL/NextAuth/JWT/session/cookies.
- **Crawler status:** `squirrel` was not installed/available via `command -v squirrel` or `npx --no-install squirrel`; no local crawler audit was run. Recommend Lighthouse/axe or squirrel after Task 02 fixes.

## Route inventory

- `/` -> `src/app/page.tsx`
- `/about` -> `src/app/about/page.tsx`
- `/booking` -> `src/app/booking/page.tsx`
- `/privacy` -> `src/app/privacy/page.tsx`
- `/services` -> `src/app/services/page.tsx`
- Root layout -> `src/app/layout.tsx`

## CRITICAL findings

None found in the static code reviewed. No exposed secrets, dangerous HTML injection, public API, auth bypass, database rules, or payment flows were discovered.

## HIGH findings

### HIGH-1 — Vulnerable dependency posture, especially Next.js

- **Location:** `package.json` (`next@16.1.1`, `postcss@^8.4.49`, lint transitive dependencies); `pnpm-lock.yaml`
- **Issue:** `pnpm audit --audit-level low` reports **39 vulnerabilities**: **19 high**, **17 moderate**, **3 low**. Multiple advisories affect `next` with patched versions at `>=16.2.5`; others affect `postcss`, `picomatch`, `brace-expansion`, `minimatch`, `flatted`, and `ajv`.
- **Why it matters:** Even a static marketing site ships the Next runtime/build toolchain. The reported Next advisories include DoS, cache poisoning, XSS-related, request smuggling, and middleware/proxy bypass classes.
- **Recommendation:** In Task 02, upgrade `next` and `eslint-config-next` to a patched compatible version (`>=16.2.5` per audit), update `postcss` to `>=8.5.10`, refresh `pnpm-lock.yaml`, then rerun audit/lint/typecheck/build.

### HIGH-2 — Missing production security headers

- **Location:** `next.config.ts:3-6`
- **Issue:** `next.config.ts` only enables `reactCompiler`; there are no global security headers.
- **Why it matters:** Public healthcare-adjacent sites should not depend solely on host defaults for clickjacking, MIME-sniffing, referrer, permissions, and transport-policy protections.
- **Recommendation:** Add `headers()` or host config for `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS when HTTPS-only, and either `X-Frame-Options` or CSP `frame-ancestors`. Consider a CSP compatible with Next, Google Fonts, Google Maps iframe, local images, and WhatsApp/Maps links.

### HIGH-3 — WhatsApp booking handles personal/health-adjacent data without explicit consent/context at submission

- **Location:** `src/app/booking/page.tsx:245-269`, `src/app/booking/page.tsx:523-570`, `src/components/WhatsAppPrompt.tsx:20-27`
- **Issue:** The booking form collects name, phone, optional email, and “Symptoms or Special Requests.” Submission prepares a third-party WhatsApp handoff containing name, phone, procedure, date, and time. There is no clear consent/notice beside the submit action explaining that the request will leave the site and be sent through WhatsApp. Email and notes are collected in UI state but not included in the WhatsApp text.
- **Why it matters:** Patients may enter sensitive clinical details. The privacy page warns users to avoid highly sensitive histories over open chat, but the booking form prompts for symptoms. This is a healthcare trust/privacy risk even without a backend.
- **Recommendation:** Add a clear consent/notice near the booking button, link to `/privacy`, state WhatsApp is third-party and this remains a request, and either remove/relabel the symptoms field as optional non-sensitive comfort notes or explicitly avoid transmitting it. Align collected fields with submitted data.

## WARNING findings

### WARNING-1 — SEO metadata is minimal and not route-specific

- **Location:** `src/app/layout.tsx:9-12`; all route pages
- **Issue:** Only root `title` and `description` are defined. No `metadataBase`, canonical URLs, Open Graph, Twitter card metadata, robots metadata, or route-specific metadata were found.
- **Why it matters:** Search engines and social previews will have weak/duplicated metadata across `/`, `/about`, `/booking`, `/privacy`, and `/services`.
- **Recommendation:** Add robust root metadata and route-level metadata or `generateMetadata` for important pages. Include canonicals, location keywords, OG image/title/description, and sensible robots directives.

### WARNING-2 — Missing sitemap, robots, and web app manifest

- **Location:** Missing `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`; no `public/sitemap.xml`, `public/robots.txt`, or web manifest found
- **Issue:** No crawl directives or route discovery artifacts exist.
- **Why it matters:** Launch SEO readiness is incomplete and crawlers may not discover all pages efficiently.
- **Recommendation:** Add Next App Router metadata route files for `sitemap.ts`, `robots.ts`, and `manifest.ts` using the final production domain.

### WARNING-3 — Google Maps iframe lacks sandbox/title hardening

- **Location:** `src/app/page.tsx:685-694`
- **Issue:** Google Maps iframe is embedded without a `title` and without `sandbox`. It uses `referrerPolicy="no-referrer-when-downgrade"`.
- **Why it matters:** Missing `title` harms assistive technologies; un-sandboxed iframes increase third-party embed blast radius.
- **Recommendation:** Add a descriptive `title`, consider a compatible `sandbox` policy or static map/link fallback, and consider `referrerPolicy="strict-origin-when-cross-origin"`.

### WARNING-4 — Heavy raw images and `<img>` usage hurt performance/SEO assembly

- **Location:** `src/app/page.tsx` multiple `<img>` usages, `src/app/about/page.tsx:13`, `src/app/booking/page.tsx:636`; `public/*`
- **Issue:** ESLint reports 13 `@next/next/no-img-element` warnings. Large assets include `dr-oke.png` 2.3 MB, `cosmetic-artistry.png` 2.0 MB, `treatment-suite.png` 1.9 MB, HDR 1.5 MB, and `public/assets/hand` ~16 MB.
- **Why it matters:** Larger payloads and lack of optimization can degrade LCP, Core Web Vitals, mobile performance, and crawl quality.
- **Recommendation:** Convert content images to `next/image` with dimensions/sizes/priority for hero-critical images. Compress/resize assets and remove unused public assets if not needed.

### WARNING-5 — Invalid/nested interactive elements in navigation CTAs

- **Location:** `src/components/Navbar.tsx:65-68`; `src/app/page.tsx:101-104`, `446-449`, `619-622`, `723-726`
- **Issue:** Multiple `Link` components wrap `<button>` elements, creating nested interactive controls (`a > button`).
- **Why it matters:** Invalid HTML can cause inconsistent keyboard/screen-reader behavior.
- **Recommendation:** Style the `Link` itself as the button, or use a real `<button>` only for non-navigation actions.

### WARNING-6 — Several pages are unnecessarily broad client components

- **Location:** `src/app/page.tsx:1`, `src/app/booking/page.tsx:1`, `src/app/privacy/page.tsx:1`, `src/app/services/page.tsx:1`
- **Issue:** Entire route pages are marked `'use client'`, including mostly static content and privacy copy.
- **Why it matters:** This increases client bundle size and reduces server-first maintainability expected in App Router projects.
- **Recommendation:** Split interactive widgets into client components and keep page shells/static content as Server Components where practical. Privacy should likely be a Server Component.

### WARNING-7 — Services page has non-functional CTA buttons

- **Location:** `src/app/services/page.tsx` around “View Gallery” and “Pricing” buttons
- **Issue:** Buttons render with no click handler, link, disabled state, or explanation.
- **Why it matters:** Users can interact with controls that do nothing, reducing trust and perceived site integrity.
- **Recommendation:** Replace with links to real content, remove until content exists, or mark unavailable with clear copy.

### WARNING-8 — Booking field behavior is inconsistent with submitted WhatsApp message

- **Location:** `src/app/booking/page.tsx:261-269`, `552-570`
- **Issue:** `patientEmail` and `patientNotes` are collected but not included in the generated WhatsApp text or otherwise stored/submitted.
- **Why it matters:** Patients may believe those details were sent to the clinic when they were not.
- **Recommendation:** Remove unused fields, explicitly label them as local-only/not sent, or include appropriate non-sensitive data in the generated message with user consent.

### WARNING-9 — Package manager is implied but not pinned

- **Location:** `package.json`
- **Issue:** The repo has `pnpm-lock.yaml` and `pnpm-workspace.yaml`, but `package.json` has no `packageManager` field.
- **Why it matters:** Different package manager/version usage can alter lockfile resolution and dependency posture.
- **Recommendation:** Add `"packageManager": "pnpm@10.33.2"` or the project-approved version.

## INFO findings

### INFO-1 — External links are generally hardened

- **Location:** `src/app/page.tsx`, `src/app/booking/page.tsx`, `src/app/privacy/page.tsx`, `src/components/Navbar.tsx`
- **Observation:** All reviewed `target="_blank"` anchors include `rel="noopener noreferrer"`.
- **Recommendation:** Preserve this convention.

### INFO-2 — No obvious source-level secrets or dangerous HTML injection patterns found

- **Location:** Source scan across `src`, `package.json`, and `next.config.ts`
- **Observation:** No `dangerouslySetInnerHTML`, `eval`, `new Function`, `innerHTML`, or source-level API secret patterns were found.
- **Recommendation:** Continue keeping secrets out of the client. If future APIs are added, introduce validation, CSRF/origin protections, rate limits, and server-side secret management.

### INFO-3 — TypeScript and lint are basically healthy, with performance warnings

- **Location:** Project-wide
- **Observation:** `npx tsc --noEmit --incremental false` completed without visible errors. `pnpm lint` completed with 0 errors and 13 warnings, all for raw `<img>` usage.
- **Recommendation:** Treat image warnings as Task 02 performance/SEO remediation.

### INFO-4 — Unused or questionable dependencies/assets increase maintenance surface

- **Location:** `package.json`, `public/assets/hand`, `src/features/intro/*`, `src/features/3d/Chair.tsx`
- **Observation:** `@gsap/react`, `leva`, and `sans-serif` are not imported in `src`; `IPCShieldIntro`/intro assets and `Chair.tsx` appear unused. Public hand assets total ~16 MB.
- **Recommendation:** Remove unused dependencies/assets/components if not part of the approved launch scope, or document why they remain.

### INFO-5 — Current repo has pre-existing uncommitted work

- **Location:** Git working tree
- **Observation:** `git status --short` shows staged and unstaged changes, including route/content changes, public images/icons, docs, and a deleted test image route.
- **Recommendation:** Task 02 should preserve current user work and keep remediation changes scoped.

## Commands run and key outputs

```text
Read: master_plan.md, Task 01 packet, package.json, next.config.ts, src/app/layout.tsx, all src/app/**/page.tsx, src/components/**, src/config/constants.ts, docs/Coding_Guidelines.md, and relevant 3D feature files.
```

```text
git status --short
Key output: staged/unstaged work exists; notable files include src/app/layout.tsx, src/app/page.tsx, src/config/constants.ts, public images/icons, docs, and docs/tasks/orchestrator-sessions/orch-20260605-145756/.
```

```text
git diff --stat / git diff --cached --stat
Key output: unstaged diff includes src/app/page.tsx (+9) and src/app/test-images/page.tsx deletion (-19); staged diff includes docs/final-production-checklist.md, public images/icons, src/app/layout.tsx, src/app/page.tsx, src/app/test-images/page.tsx, src/config/constants.ts.
```

```text
Route/file inventory commands
Key output: app page/layout files only; no route handlers, middleware, sitemap, robots, or manifest files.
```

```text
node -v && pnpm -v && corepack --version
Key output: node v24.16.0, pnpm 10.33.2, corepack 0.35.0.
```

```text
packageManager field check
Key output: packageManager not set.
```

```text
pnpm audit --audit-level low
Key output: command exited non-zero; 39 vulnerabilities found (3 low, 17 moderate, 19 high). Multiple Next.js advisories patched by >=16.2.5.
```

```text
pnpm audit --json | summary parser
Key output: metadata vulnerabilities={low:3, moderate:17, high:19, critical:0}; dependencies=546; unique advisories=38.
```

```text
source-only secret/auth/db/API grep
Key output: no actionable source findings; no backend/auth/db/API references found.
```

```text
external links / iframes / raw img usage grep
Key output: wa.me links, Google Maps search/embed, tel link, 1 iframe, and multiple raw <img> usages found.
```

```text
metadata exports grep
Key output: only src/app/layout.tsx exports metadata.
```

```text
dangerous React/HTML pattern grep
Key output: no dangerouslySetInnerHTML/eval/new Function/innerHTML/document.write/localStorage/sessionStorage findings.
```

```text
pnpm lint
Key output: 0 errors, 13 warnings, all @next/next/no-img-element.
```

```text
npx tsc --noEmit --incremental false
Key output: completed without visible TypeScript errors.
```

```text
squirrel availability check
Key output: squirrel not installed/available via command path or no-install npx.
```

```text
sitemap/robots/manifest check
Key output: missing src/app/sitemap.ts, src/app/robots.ts, src/app/manifest.ts, public/sitemap.xml, public/robots.txt, public/manifest.webmanifest, public/site.webmanifest.
```

```text
public asset size inventory
Key output: public/assets/hand ~16 MB; dr-oke.png 2.3 MB; cosmetic-artistry.png 2.0 MB; treatment-suite.png 1.9 MB; potsdamer_platz_1k.hdr 1.5 MB.
```

## Task 02 remediation checklist

1. Upgrade vulnerable dependencies: `next`/`eslint-config-next` to patched compatible versions and `postcss` to patched version; refresh lockfile; rerun audit.
2. Add security headers in `next.config.ts` or hosting config; evaluate CSP.
3. Add SEO assembly: root/route metadata, canonicals, Open Graph/Twitter metadata, `sitemap.ts`, `robots.ts`, and `manifest.ts`.
4. Fix booking privacy/integrity: explicit WhatsApp third-party consent, align collected fields with submitted data, avoid prompting for sensitive symptoms without clear warning.
5. Harden map iframe with `title`, stricter referrer policy, and sandbox/static fallback if compatible.
6. Convert critical raw images to `next/image`, set dimensions/sizes/priority, and compress large public assets.
7. Replace `Link > button` patterns with styled links or proper buttons.
8. Remove/disable non-functional Services buttons or link them to real destinations.
9. Split broad client pages into Server Component shells plus smaller client widgets where practical.
10. Pin `packageManager` in `package.json` and remove unused dependencies/assets/components not needed for launch.
11. Verification after remediation: `pnpm audit --audit-level low`, `pnpm lint`, `npx tsc --noEmit --incremental false`, `pnpm build`, and Lighthouse/axe/squirrel crawler if available.

## Baseline verdict

**NEEDS CHANGES before production launch.** Task 02 can proceed with the checklist above; no backend/auth/API/database remediation is required unless new server routes are introduced.
