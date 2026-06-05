import type { ReactNode } from 'react';

import { createPageMetadata } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Privacy & Confidentiality',
  description:
    'Review Olive Vine Dental Clinic privacy, confidentiality, and WhatsApp communication guidance before sharing booking or patient details.',
  path: '/privacy',
  keywords: ['dental privacy policy Abuja', 'patient confidentiality Olive Vine Dental Clinic'],
});

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
