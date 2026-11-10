import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CatalogView from '@/components/CatalogView'

export const metadata: Metadata = {
  title: 'Catalog Collections | Linen Galaxy by A S Handloom',
  description:
    'Explore authentic handloom sarees, pure linen shirting/suiting yardage, Bhagalpuri DULL chadars, and gamchas direct from the ancestral looms in Bhagalpur, Bihar.',
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '105px', background: '#FFFFFF', minHeight: '90vh' }}>
        <CatalogView />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
