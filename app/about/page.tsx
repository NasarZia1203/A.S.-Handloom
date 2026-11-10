import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { getSiteSettings } from '@/lib/data/store-manager'

export const metadata = {
  title: 'About Us | Linen Galaxy by A S Handloom',
  description: 'Ancestral handloom pit-loom weaving house since 2007. Sustainable pure linen and silk textiles from Bhagalpur, Bihar.',
}

export default function AboutPage() {
  const settings = getSiteSettings()
  const shopName = settings.business_name || 'Linen Galaxy'
  const parentCompany = settings.parent_company || 'A S Handloom'

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '130px', paddingBottom: '90px', background: '#FFFFFF', minHeight: '90vh' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          
          <h1
            style={{
              fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1C1917',
              marginBottom: '36px',
            }}
          >
            About Us
          </h1>

          <div
            style={{
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#4B433E',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <p>
              Welcome to {shopName}, a family-owned clothing and textile house weaving the finest linen and handloom silks for generations. As the flagship boutique of {parentCompany} (Est. 2007), we are proud to continue our ancestral tradition of pit-loom weaving and creating the highest quality natural textiles with a refined modern touch.
            </p>

            <p>
              Our story began many years ago when our ancestors started weaving pure linen and desi silk for regional patrons. Over time, their passion for this craft grew, transforming local pit-loom workshops into an artisan manufacturing house. This marked the beginning of our journey in the world of enduring textile fashion.
            </p>

            <p>
              Today, we are proud to carry on this living heritage, crafting sustainable handloom sarees, high-count pure linen yardage (80 LEA, 70 LEA, 60 LEA), and authentic Bhagalpuri weaves that are cherished by connoisseurs across India. We source only the purest natural yarn, ensuring that every meter honors the dignity of traditional craft.
            </p>

            <p>
              Our master weavers and artisan tailors dedicate hours of disciplined craftsmanship to every drape. We believe in creating garments that are not only supremely comfortable but also stylish and timeless. Our collections are a harmonious blend of classic handloom mastery and contemporary design.
            </p>

            <p>
              At {shopName}, we are dedicated to providing our retail patrons and wholesale partners with an exceptional experience. From individual orders sent directly to doorsteps nationwide, to customized roll production for boutiques and designers, we foster enduring relationships built on trust and authenticity.
            </p>

            <p>
              We are passionate about sustainability and environmental stewardship. Our commitment to pure natural fibers ensures that our products are biodegradable, long-lasting, and kind to the earth. Thank you for choosing {shopName} by {parentCompany} as your trusted destination for handcrafted luxury.
            </p>

            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#8A7B6D',
                marginTop: '16px',
              }}
            >
              #InnativWeaver • HandloomHeritage
            </div>

            {/* Social Icons (Linen World Style) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '14px',
                marginTop: '28px',
              }}
            >
              {[
                { icon: 'fas fa-envelope', href: 'mailto:ashandloombgp@gmail.com', label: 'Email' },
                { icon: 'fab fa-facebook-f', href: 'https://facebook.com', label: 'Facebook' },
                { icon: 'fab fa-instagram', href: 'https://instagram.com', label: 'Instagram' },
                { icon: 'fab fa-whatsapp', href: 'https://wa.me/919798141494', label: 'WhatsApp' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-circle-btn"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
