import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import { Suspense } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const siteUrl = 'https://fionasdesigns.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fionas Designs — Turning Ideas into Timeless Designs',
    template: '%s | Fionas Designs',
  },
  description:
    'Fionas Designs is a premium creative studio crafting timeless logo design, brand identity, packaging, and premium visual experiences that help businesses build unforgettable brands.',
  keywords: [
    'Fionas Designs',
    'logo design',
    'brand identity',
    'creative branding',
    'packaging design',
    'business cards',
    'flyers',
    'brochures',
    'print design',
    'digital graphics',
    'social media design',
    'banner design',
    'premium design studio',
  ],
  authors: [{ name: 'Fionas Designs' }],
  creator: 'Fionas Designs',
  publisher: 'Fionas Designs',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Fionas Designs',
    title: 'Fionas Designs — Turning Ideas into Timeless Designs',
    description:
      'A premium creative studio crafting timeless logo design, brand identity, packaging, and premium visual experiences.',
    images: [
      {
        url: '/images/Fionas_Designs_original_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Fionas Designs — Turning Ideas into Timeless Designs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fionas Designs — Turning Ideas into Timeless Designs',
    description:
      'A premium creative studio crafting timeless logo design, brand identity, packaging, and premium visual experiences.',
    images: ['/images/Fionas_Designs_original_logo.jpg'],
  },
  icons: {
    icon: '/images/Fionas_Designs_original_logo.jpg',
    apple: '/images/Fionas_Designs_original_logo.jpg',
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
  category: 'design',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Fionas Designs',
  description:
    'Premium creative studio crafting timeless logo design, brand identity, packaging, and premium visual experiences.',
  url: siteUrl,
  logo: `${siteUrl}/images/Fionas_Designs_original_logo.jpg`,
  image: `${siteUrl}/images/Fionas_Designs_original_logo.jpg`,
  email: 'fionasdesigns@gmail.com',
  foundingDate: '2005',
  priceRange: '$$$',
  sameAs: [
    'https://www.instagram.com/fionasdesigns/',
    'https://www.facebook.com/fionasdesgins',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Logo Design',
    'Brand Identity',
    'Packaging Design',
    'Social Media Design',
    'Print Design',
    'Creative Branding',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#111111]">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
