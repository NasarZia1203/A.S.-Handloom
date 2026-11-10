import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'A S Handloom — Bhagalpur Heritage Sarees & Fabrics',
    short_name: 'A S Handloom',
    description: 'Weaving Heritage Since 2007. Premium handloom sarees and luxury fabrics from Bhagalpur, Bihar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF8F5',
    theme_color: '#E91E63',
    icons: [
      {
        src: '/assets/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
