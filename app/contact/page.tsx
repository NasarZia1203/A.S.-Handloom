import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { getSiteSettings } from '@/lib/data/store-manager'

export const metadata = {
  title: 'Contact Us | A S Handloom • Bhagalpur Pit-Loom House',
  description: 'Reach our flagship handloom store and wholesale depot in Bhagalpur, Bihar. WhatsApp ordering, wholesale inquiries, and customer service.',
}

export default function ContactPage() {
  const settings = getSiteSettings()
  const shopName = settings.business_name || 'A S Handloom'
  const parentCompany = settings.parent_company || 'A S Handloom'
  const address = settings.shop_address || '85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004'
  const whatsapp = settings.whatsapp_number || '+91 97981 41494'
  const phone = settings.contact_phone || '+91 94309 08657'

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '130px', paddingBottom: '90px', background: '#FFFFFF', minHeight: '90vh' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          
          <h1
            style={{
              fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1C1917',
              marginBottom: '32px',
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#4B433E',
              maxWidth: '720px',
              margin: '0 auto 40px',
            }}
          >
            At {shopName}, we are committed to providing you with the finest handloom textiles and exceptional customer service. If you have any questions regarding retail orders, custom fabric yardage, Next Day Dispatch (NDD), or wholesale partnerships, our team is available to assist you promptly.
          </p>

          {/* Clean Address & Contact Details Block (Linen World Style) */}
          <div
            style={{
              background: '#FAF9F6',
              border: '1px solid #ECE7E1',
              borderRadius: '6px',
              padding: '36px 28px',
              marginBottom: '44px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#8A7B6D',
                marginBottom: '16px',
              }}
            >
              Our Flagship Loft & Address:
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1C1917',
                marginBottom: '8px',
              }}
            >
              {shopName.toUpperCase()}
            </div>
            <div style={{ fontSize: '12px', color: '#8A7B6D', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              PARENT ENTERPRISE: {parentCompany.toUpperCase()} (EST. 2007)
            </div>

            <p style={{ fontSize: '14.5px', color: '#4B433E', lineHeight: 1.6, margin: '0 0 16px' }}>
              📍 {address} 🇮🇳 India
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#1C1917', fontWeight: 600 }}>
              <div>
                📞 Call: <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} style={{ color: '#1C1917', textDecoration: 'none' }}>{phone}</a> / <a href={`tel:${whatsapp.replace(/[^0-9+]/g, '')}`} style={{ color: '#1C1917', textDecoration: 'none' }}>{whatsapp}</a>
              </div>
              <div>
                💬 Direct WhatsApp:{' '}
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${shopName}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#059669', textDecoration: 'none' }}
                >
                  {whatsapp}
                </a>
              </div>
              <div>
                ✉️ Email: <a href="mailto:ashandloombgp@gmail.com" style={{ color: '#1C1917', textDecoration: 'none' }}>ashandloombgp@gmail.com</a>
              </div>
              {settings.gstin && (
                <div style={{ fontSize: '12px', color: '#8A7B6D', marginTop: '6px' }}>
                  GSTIN: {settings.gstin}
                </div>
              )}
            </div>
          </div>

          {/* Social Icons Row (Linen World Style) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {[
              { icon: 'fas fa-envelope', href: 'mailto:ashandloombgp@gmail.com', label: 'Email' },
              { icon: 'fab fa-facebook-f', href: 'https://facebook.com', label: 'Facebook' },
              { icon: 'fab fa-instagram', href: 'https://instagram.com', label: 'Instagram' },
              { icon: 'fab fa-whatsapp', href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, label: 'WhatsApp' },
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
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
