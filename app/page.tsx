import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import SareeCollection from '@/components/SareeCollection'
import FabricCollection from '@/components/FabricCollection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import SectionAnimator from '@/components/SectionAnimator'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionAnimator />
      <About />
      <SareeCollection />
      <FabricCollection />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
