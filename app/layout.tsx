import type { Metadata, Viewport } from 'next'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'A S Handloom | Premium Handloom Sarees & Fabrics from Bhagalpur',
  description:
    'A S Handloom - Weaving Heritage Since 2007. Shop exquisite handloom sarees and premium fabrics including Linen, Silk, and Cotton textiles from Bhagalpur, Bihar. Authentic Indian handloom with traditional craftsmanship.',
  keywords: 'handloom sarees, Bhagalpur sarees, linen sarees, silk sarees, cotton fabrics, Indian textiles, traditional sarees, handwoven fabrics',
  authors: [{ name: 'A S Handloom' }],
  openGraph: {
    title: 'A S Handloom | Premium Handloom Sarees & Fabrics',
    description: 'Weaving Heritage Since 2007. Exquisite handloom sarees and premium fabrics from Bhagalpur, Bihar.',
    type: 'website',
    locale: 'en_IN',
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
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
