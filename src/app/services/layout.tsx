import type { ReactNode } from 'react';

import { createPageMetadata } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Dental Services',
  description:
    'Explore Olive Vine Dental Clinic services in Abuja, including general dentistry, cosmetic smile design, and implant-focused restorative care.',
  path: '/services',
  keywords: ['dental services Abuja', 'cosmetic dentistry Garki', 'dental implants Abuja'],
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
