import type { ReactNode } from 'react';

import { createPageMetadata } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'About Dr. Emmanuel Oke',
  description:
    'Meet Dr. Emmanuel Oke and learn how Olive Vine Dental Clinic combines calm patient care, clinical precision, and Abuja community trust.',
  path: '/about',
  keywords: ['Dr Emmanuel Oke dentist Abuja', 'about Olive Vine Dental Clinic'],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
