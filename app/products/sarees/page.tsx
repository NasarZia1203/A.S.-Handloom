import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CatalogView from '@/components/CatalogView'

export const metadata: Metadata = {
  title: 'Handloom Sarees Collection | Linen Galaxy by A S Handloom',
  description:
    'Discover pure Desi silk, pure linen, Moonga, Organza, Viscose, and Kota handloom sarees woven on traditional wooden pit-looms in Bhagalpur.',
}

export default function AllSareesPage() {
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
