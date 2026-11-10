import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { getSiteSettings } from '@/lib/data/store-manager'
import { DEFAULT_POLICIES } from '@/lib/data/site-settings'

const POLICY_TABS = [
  { slug: 'shipping-delivery', label: 'Shipping & Delivery' },
  { slug: 'refund-cancellation', label: 'Refund & Cancellation' },
  { slug: 'handloom-disclaimer', label: 'Handloom Disclaimer' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-of-service', label: 'Terms of Service' },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const settings = getSiteSettings()
  const policies = settings.policies || DEFAULT_POLICIES
  const policy = policies[slug] || DEFAULT_POLICIES[slug]

  if (!policy) {
    return { title: 'Policy Not Found | Linen Galaxy' }
  }

  return {
    title: `${policy.title} | Linen Galaxy by A S Handloom`,
    description: `Official ${policy.title} for Linen Galaxy by A S Handloom. Handcrafted pit-loom sarees and pure linen fabrics from Bhagalpur, Bihar.`,
  }
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const settings = getSiteSettings()
  const policies = settings.policies || DEFAULT_POLICIES
  const policy = policies[slug] || DEFAULT_POLICIES[slug]

  if (!policy) {
    notFound()
  }

  const shopName = settings.business_name || 'Linen Galaxy'
  const parentCompany = settings.parent_company || 'A S Handloom'
  const whatsappNumber = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919798141494'

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '130px', paddingBottom: '90px', background: '#FFFFFF', minHeight: '90vh' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8A7B6D', marginBottom: '24px' }}>
            <Link href="/linengalaxy" style={{ color: '#8A7B6D', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span>Customer Service</span>
            <span>/</span>
            <span style={{ color: '#1C1917', fontWeight: 600 }}>{policy.title}</span>
          </div>

          {/* Policy Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '36px',
              borderBottom: '1px solid #ECE7E1',
            }}
          >
            {POLICY_TABS.map((tab) => (
              <Link
                key={tab.slug}
                href={`/policies/${tab.slug}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  background: slug === tab.slug ? '#1C1917' : '#FAF9F6',
                  color: slug === tab.slug ? '#FFFFFF' : '#4B433E',
                  border: slug === tab.slug ? '1px solid #1C1917' : '1px solid #ECE7E1',
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Policy Title & Subtitle */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                fontSize: 'clamp(2rem, 3.8vw, 2.6rem)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#1C1917',
                marginBottom: '10px',
              }}
            >
              {policy.title}
            </h1>
            <p style={{ fontSize: '13px', color: '#8A7B6D', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              {shopName} by {parentCompany} • {policy.last_updated ? `Updated: ${policy.last_updated}` : 'Official Customer Service Policy'}
            </p>
          </div>

          {/* Policy Content Card */}
          <div
            style={{
              background: '#FAF9F6',
              border: '1px solid #ECE7E1',
              borderRadius: '6px',
              padding: '40px 32px',
              marginBottom: '40px',
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#374151',
              whiteSpace: 'pre-line',
            }}
          >
            {policy.content}
          </div>

          {/* Customer Support Inquiries Block */}
          <div
            style={{
              padding: '24px 28px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid #ECE7E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Need help with your order or have a policy question?
              </div>
              <div style={{ fontSize: '13px', color: '#6E6259' }}>
                Our Bhagalpur artisan desk is available on WhatsApp daily (9 AM – 9 PM IST).
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${shopName}! I have a question regarding your ${policy.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 20px',
                borderRadius: '4px',
                background: '#1C1917',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
              <span>Chat with Support</span>
            </a>
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
