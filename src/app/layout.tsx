import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import WhatsAppPrompt from '@/components/WhatsAppPrompt';
import { buildClinicJsonLd, siteMetadata } from '@/config/site';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: '#2d3b2d',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinicJsonLd = buildClinicJsonLd();

  return (
    <html lang="en-NG" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <script type="application/ld+json">{JSON.stringify(clinicJsonLd)}</script>
        {children}
        <WhatsAppPrompt />
      </body>
    </html>
  );
}
