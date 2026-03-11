import { Suspense } from 'react'
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
      <Suspense
        fallback={
          <section className="section collections animate">
            <div className="container-image">
              <h2 className="section-title-saree">Saree Collection</h2>
              <div className="collection-carousel">
                <p style={{ textAlign: 'center', padding: '40px' }}>
                  Loading sarees...
                </p>
              </div>
            </div>
          </section>
        }
      >
        <SareeCollection />
      </Suspense>
      <Suspense
        fallback={
          <section className="section fabrics-collections animate">
            <div className="container-image">
              <h2 className="section-title-fabric">Fabric Collection</h2>
              <div className="collection-carousel">
                <p style={{ textAlign: 'center', padding: '40px' }}>
                  Loading fabrics...
                </p>
              </div>
            </div>
          </section>
        }
      >
        <FabricCollection />
      </Suspense>
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
