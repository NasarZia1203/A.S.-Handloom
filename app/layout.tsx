import type { Metadata, Viewport } from 'next'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ashandloom.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'A S Handloom | Premium Handloom Sarees & Fabrics from Bhagalpur',
    template: '%s | A S Handloom',
  },
  description:
    'A S Handloom - Weaving Heritage Since 2007. Shop exquisite handloom sarees and premium fabrics including Linen, Silk, and Cotton textiles from Bhagalpur, Bihar. Authentic Indian handloom with traditional craftsmanship.',
  keywords: [
    'handloom sarees',
    'Bhagalpur sarees',
    'Bhagalpur silk',
    'linen sarees',
    'silk sarees',
    'cotton fabrics',
    'Indian textiles',
    'traditional sarees',
    'handwoven fabrics',
    'A S Handloom',
  ],
  authors: [{ name: 'A S Handloom' }],
  creator: 'A S Handloom',
  publisher: 'A S Handloom',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/browser-tab-logo.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/assets/images/as-handloom-logo-white-bg.png', sizes: '1024x1024', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'A S Handloom | Premium Handloom Sarees & Fabrics',
    description: 'Weaving Heritage Since 2007. Exquisite handloom sarees and premium fabrics from Bhagalpur, Bihar.',
    url: siteUrl,
    siteName: 'A S Handloom',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/images/herosec1.webp',
        width: 1200,
        height: 630,
        alt: 'A S Handloom - Heritage Sarees and Handwoven Fabrics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A S Handloom | Premium Handloom Sarees & Fabrics',
    description: 'Weaving Heritage Since 2007. Exquisite handloom sarees and premium fabrics from Bhagalpur, Bihar.',
    images: ['/assets/images/herosec1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#E91E63',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'A S Handloom',
    legalName: 'A S Handloom',
    description:
      'Weaving Heritage Since 2007. Manufacturer and wholesaler of exquisite handloom sarees, Bhagalpuri silk, pure linen, and fine cotton fabrics in Bhagalpur, Bihar.',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo.png`,
    image: `${siteUrl}/assets/images/herosec1.webp`,
    telephone: '+919430908657',
    email: 'ashandloombgp@gmail.com',
    taxID: '10AJXPA6956B1ZD',
    founder: {
      '@type': 'Person',
      name: 'MD RAZA ALAM',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '85 M T N Ghosh Road, Hasnabad, Champanagar',
      addressLocality: 'Bhagalpur',
      addressRegion: 'Bihar',
      postalCode: '812004',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.2425',
      longitude: '86.9842',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    sameAs: [
      'https://maps.app.goo.gl/hYaGfcFaaA2Jhzus5',
      'https://wa.me/919798141494',
    ],
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/herosec1.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/herosec2.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/herosec3.webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
