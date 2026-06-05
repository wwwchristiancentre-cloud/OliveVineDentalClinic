import type { MetadataRoute } from 'next';

import { CLINIC_DESCRIPTION, CLINIC_NAME } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CLINIC_NAME,
    short_name: 'The Olive Vine Dental',
    description: CLINIC_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f3ea',
    theme_color: '#2d3b2d',
    icons: [
      {
        src: '/icon.png',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        type: 'image/png',
      },
    ],
  };
}
