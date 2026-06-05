import type { Metadata } from 'next';

import { CLINIC_PHONE_RAW, CLINIC_PHONE_TEL } from '@/config/constants';

export const CLINIC_NAME = 'Olive Vine Dental Clinic';
export const CLINIC_TAGLINE = 'Clinical Excellence With Gentle Precision';
export const CLINIC_DESCRIPTION =
  'Olive Vine Dental Clinic provides calm, design-led dental care in Garki, Abuja, with restorative, cosmetic, preventive, and WhatsApp-first booking support.';
export const CLINIC_ADDRESS_LINE_1 = 'Suite C108, Garki Mall';
export const CLINIC_ADDRESS_LINE_2 = 'Opposite Garki International Market';
export const CLINIC_LOCALITY = 'Garki Area 11';
export const CLINIC_CITY = 'Abuja';
export const CLINIC_REGION = 'Federal Capital Territory';
export const CLINIC_COUNTRY = 'Nigeria';
export const DEFAULT_OG_IMAGE = '/The Olive Vine1.jpg';
export const GOOGLE_MAPS_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=The+Olive+Vine+Dental+Clinic+Garki+Mall+Abuja';

const DEFAULT_KEYWORDS = [
  'Olive Vine Dental Clinic',
  'dentist Abuja',
  'dental clinic Garki',
  'dentist Garki Mall',
  'cosmetic dentistry Abuja',
  'restorative dentistry Abuja',
  'dental implants Abuja',
  'WhatsApp dentist Abuja',
  'MDCN-guided dental care',
];

const withProtocol = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;

export const resolveSiteUrl = () => {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  const resolved = candidates.find((candidate) => candidate && candidate.trim().length > 0);

  if (!resolved) {
    return 'http://localhost:3000';
  }

  return withProtocol(resolved.trim()).replace(/\/$/, '');
};

const buildAbsoluteUrl = (path: string) => new URL(path, `${resolveSiteUrl()}/`).toString();

export const siteMetadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: CLINIC_NAME,
    template: `%s | ${CLINIC_NAME}`,
  },
  description: CLINIC_DESCRIPTION,
  applicationName: CLINIC_NAME,
  alternates: {
    canonical: '/',
  },
  category: 'healthcare',
  keywords: DEFAULT_KEYWORDS,
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: CLINIC_NAME,
    description: CLINIC_DESCRIPTION,
    url: '/',
    siteName: CLINIC_NAME,
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${CLINIC_NAME} at Garki Mall, Abuja`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CLINIC_NAME,
    description: CLINIC_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        type: 'image/png',
      },
    ],
    shortcut: ['/icon.png'],
  },
};

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export const createPageMetadata = ({
  title,
  description,
  path,
  keywords = [],
}: CreatePageMetadataOptions): Metadata => ({
  title,
  description,
  keywords: [...DEFAULT_KEYWORDS, ...keywords],
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: `${title} | ${CLINIC_NAME}`,
    description,
    url: path,
    siteName: CLINIC_NAME,
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${title} | ${CLINIC_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${CLINIC_NAME}`,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
});

export const buildClinicJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  additionalType: 'https://schema.org/LocalBusiness',
  name: CLINIC_NAME,
  description: CLINIC_DESCRIPTION,
  url: resolveSiteUrl(),
  image: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
  telephone: CLINIC_PHONE_TEL,
  priceRange: '₦₦',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${CLINIC_ADDRESS_LINE_1}, ${CLINIC_ADDRESS_LINE_2}`,
    addressLocality: CLINIC_LOCALITY,
    addressRegion: CLINIC_REGION,
    addressCountry: 'NG',
  },
  areaServed: {
    '@type': 'City',
    name: CLINIC_CITY,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Wednesday',
      opens: '09:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  availableLanguage: ['en'],
  medicalSpecialty: 'Dentistry',
  sameAs: [GOOGLE_MAPS_SEARCH_URL, `https://wa.me/${CLINIC_PHONE_RAW}`],
  hasMap: GOOGLE_MAPS_SEARCH_URL,
  knowsAbout: [
    'General dentistry',
    'Cosmetic dentistry',
    'Dental implants',
    'Clear orthodontics',
    'Dental hygiene',
  ],
});
