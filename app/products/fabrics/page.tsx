import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CatalogView from '@/components/CatalogView'

export const metadata: Metadata = {
  title: 'Pure Running Fabrics & Yardage | Linen Galaxy by A S Handloom',
  description:
    'Certified pure linen shirting (80/70/60 LEA), high-density suiting (25/33 LEA), khadi, and handloom cotton running yardage direct from Bhagalpur looms.',
}

export default function AllFabricsPage() {
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
