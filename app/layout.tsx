import type { Metadata } from 'next'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'A S Handloom',
  description:
    'A S Handloom - Weaving Heritage Since 2007. Exquisite handloom sarees and premium fabrics from Bhagalpur, Bihar. Specializing in Linen, Silk, and Cotton textiles.',
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
