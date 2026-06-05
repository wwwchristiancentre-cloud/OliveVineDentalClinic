import type { ReactNode } from 'react';

import { createPageMetadata } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Book a Dental Visit',
  description:
    'Request a dental visit at The Olive Vine Dental Clinic in Garki, Abuja using our WhatsApp-first booking flow for restorative, cosmetic, and preventive care.',
  path: '/booking',
  keywords: ['book dentist Abuja', 'WhatsApp booking dentist Abuja', 'Garki dental appointment'],
});

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
