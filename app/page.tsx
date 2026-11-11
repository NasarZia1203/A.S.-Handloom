import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WholesaleRetailBanner from '@/components/WholesaleRetailBanner'
import About from '@/components/About'
import SareeCollection from '@/components/SareeCollection'
import FabricCollection from '@/components/FabricCollection'
import HeritageWeavesSection from '@/components/HeritageWeavesSection'
import SuitSalwarSection from '@/components/SuitSalwarSection'
import SaleSection from '@/components/SaleSection'
import NDDSection from '@/components/NDDSection'
import OurShops from '@/components/OurShops'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import SectionAnimator from '@/components/SectionAnimator'
import { getSiteSettings } from '@/lib/data/store-manager'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const settings = getSiteSettings()
  const sections = (settings.homepage_sections || []).slice().sort((a, b) => a.sort_order - b.sort_order)

  return (
    <>
      <Navbar />
      <SectionAnimator />

      {sections.map((section) => {
        if (!section.is_enabled) return null

        switch (section.id) {
          case 'hero':
            return <Hero key={section.id} settings={settings} />

          case 'wholesale-retail':
            return (
              <WholesaleRetailBanner
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
              />
            )

          case 'ndd':
            return (
              <NDDSection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'sale':
            return (
              <SaleSection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'sarees':
            return (
              <SareeCollection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'fabrics':
            return (
              <FabricCollection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'chadar-gamcha':
            return (
              <HeritageWeavesSection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'suit-salwar':
            return (
              <SuitSalwarSection
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                showPrices={settings.show_prices}
                showWholesalePrices={settings.show_wholesale_prices}
              />
            )

          case 'outlets':
          case 'shops':
            return (
              <OurShops
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                outlets={settings.outlets}
              />
            )

          case 'about':
            return (
              <About
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
              />
            )

          case 'contact':
            return (
              <Contact
                key={section.id}
                heading={section.heading}
                subheading={section.subheading}
                settings={settings}
              />
            )

          default:
            return null
        }
      })}

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
