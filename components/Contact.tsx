'use client'

import { useState, type FormEvent } from 'react'
import type { SiteSettings } from '@/lib/types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/data/site-settings'

interface ContactProps {
  heading?: string
  subheading?: string
  settings?: SiteSettings
}

export default function Contact({
  heading = 'Place an Order or Inquire Online',
  subheading = 'Select your order channel below. We dispatch directly from our Champanagar, Bhagalpur weaving facility with tracked doorstep delivery across all Indian pin codes and global air cargo ports.',
  settings = DEFAULT_SITE_SETTINGS,
}: ContactProps = {}) {
  const shopName = settings.business_name || 'Linen Galaxy'
  const parentCompany = settings.parent_company || 'A S Handloom'
  const whatsappNum = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919798141494'

  const [orderType, setOrderType] = useState<'retail' | 'wholesale' | 'swatch'>('retail')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [cityPin, setCityPin] = useState('')
  const [productCodeOrDesc, setProductCodeOrDesc] = useState('')
  const [quantity, setQuantity] = useState('1 Saree')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const orderCategoryTitle =
      orderType === 'retail'
        ? 'Retail Saree / Fabric Order'
        : orderType === 'wholesale'
        ? 'Wholesale / Bulk Manufacturing Order'
        : 'Sample Swatch Book Request'

    const message = [
      `*${shopName.toUpperCase()} (by ${parentCompany}) — ONLINE ORDER / INQUIRY*`,
      `---------------------------------`,
      `*Order Type:* ${orderCategoryTitle}`,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email ? `*Email:* ${email}` : '',
      `*Delivery City & Pin Code:* ${cityPin}`,
      `*Product / Weave Code:* ${productCodeOrDesc || 'Not specified'}`,
      `*Quantity / Meterage:* ${quantity}`,
      notes ? `*Custom Notes:* ${notes}` : '',
      `---------------------------------`,
      `Requesting quotation and online delivery dispatch schedule from Bhagalpur.`,
    ]
      .filter(Boolean)
      .join('\n')

    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    border: focusedField === fieldName ? '1.5px solid #D4AF37' : '1.5px solid rgba(197, 160, 89, 0.3)',
    background: focusedField === fieldName ? '#FFFFFF' : '#FAF8F5',
    boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(212, 175, 55, 0.15)' : 'none',
    fontSize: '0.92rem',
    outline: 'none',
    color: '#111827',
    transition: 'all 0.25s ease',
  })

  return (
    <section id="contact" className="section-lux" style={{ background: '#FAF8F5', padding: '90px 0' }}>
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
          <span className="golden-eyebrow" style={{ color: '#B38728' }}>
            Direct Delivery • Retail & Wholesale Dispatch
          </span>
          <h2 className="golden-h1" style={{ margin: '14px 0 16px', color: '#111827' }}>
            {heading}
          </h2>
          <p className="golden-lead" style={{ color: '#4B5563' }}>
            {subheading}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
        }}>
          {/* Order Calculator & Form */}
          <div 
            className="pastel-card" 
            style={{ 
              padding: '38px 34px', 
              background: '#FFFFFF',
              borderRadius: '28px',
              border: '1.5px solid rgba(197, 160, 89, 0.25)',
              boxShadow: '0 14px 38px -10px rgba(17, 24, 39, 0.08)',
            }}
          >
            {/* Channel Switcher Tabs */}
            <div style={{
              display: 'flex',
              background: '#F5EFEB',
              borderRadius: '50px',
              padding: '5px',
              marginBottom: '30px',
              gap: '6px',
            }}>
              {[
                { id: 'retail', label: 'Retail Order', icon: 'fas fa-shopping-bag' },
                { id: 'wholesale', label: 'Wholesale Bolts', icon: 'fas fa-boxes' },
                { id: 'swatch', label: 'Swatch Book', icon: 'fas fa-swatchbook' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setOrderType(tab.id as any)
                    if (tab.id === 'retail') setQuantity('1 Saree')
                    else if (tab.id === 'wholesale') setQuantity('100 Meters')
                    else setQuantity('Complete Swatch Kit')
                  }}
                  style={{
                    flex: 1,
                    padding: '11px 14px',
                    borderRadius: '50px',
                    border: 'none',
                    background: orderType === tab.id ? '#FFFFFF' : 'transparent',
                    color: orderType === tab.id ? '#111827' : '#6B7280',
                    fontWeight: orderType === tab.id ? 700 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: orderType === tab.id ? '0 4px 14px rgba(17, 24, 39, 0.08)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <i className={tab.icon} style={{ fontSize: '12px', color: orderType === tab.id ? '#D4AF37' : '#9CA3AF' }}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {submitted && (
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: '#F0F7F2',
                  border: '1.5px solid rgba(45, 106, 79, 0.3)',
                  color: '#2D6A4F',
                  marginBottom: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <i className="fas fa-check-circle" style={{ fontSize: '22px' }}></i>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>Order Details Ready on WhatsApp!</div>
                  <div style={{ fontSize: '0.84rem' }}>Our artisan representative will confirm order availability and dispatch schedule.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Priya Sharma / Designer Studio"
                    style={inputStyle('name')}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+91 98765 43210"
                    style={inputStyle('phone')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                    Delivery City & Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={cityPin}
                    onChange={(e) => setCityPin(e.target.value)}
                    onFocus={() => setFocusedField('cityPin')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Mumbai 400001 / New Delhi"
                    style={inputStyle('cityPin')}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                    {orderType === 'retail' ? 'Saree / Fabric Code' : orderType === 'wholesale' ? 'Fabric Weave & Dye Spec' : 'Sample Kit Focus'}
                  </label>
                  <input
                    type="text"
                    value={productCodeOrDesc}
                    onChange={(e) => setProductCodeOrDesc(e.target.value)}
                    onFocus={() => setFocusedField('productCodeOrDesc')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={orderType === 'retail' ? 'e.g. SAR1005 or Linen Saree' : 'e.g. Pure Linen 60s, Tussar Silk'}
                    style={inputStyle('productCodeOrDesc')}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                  Estimated Quantity / Meterage
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onFocus={() => setFocusedField('quantity')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 1 Saree / 50 Meters / 5 Rolls"
                  style={inputStyle('quantity')}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '7px' }}>
                  Special Weaving / Delivery Instructions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Required by next week for a wedding, or please include GST invoice for my business..."
                  style={{
                    ...inputStyle('notes'),
                    resize: 'vertical',
                    minHeight: '80px',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-pastel-whatsapp"
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '8px',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.45)',
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '20px' }}></i>
                <span>Submit & Confirm Order on WhatsApp Direct</span>
              </button>
            </form>
          </div>

          {/* Business Credentials & Artisan Facility */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div 
              className="pastel-card" 
              style={{ 
                padding: '34px 28px', 
                background: '#FFFFFF',
                borderRadius: '28px',
                border: '1.5px solid rgba(197, 160, 89, 0.25)',
                boxShadow: '0 12px 32px -8px rgba(17, 24, 39, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.6) 0%, rgba(197, 160, 89, 0.6) 100%)',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#FFFFFF' }}>
                    <img
                      src="/assets/images/linen-galaxy-logo-white-bg.png"
                      alt="Linen Galaxy — House Of Pure Linen And Silk"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                    />
                  </div>
                </div>
                <div>
                  <span className="golden-eyebrow" style={{ color: '#B38728' }}>
                    Artisanal Facility
                  </span>
                  <h3 style={{ fontSize: '1.35rem', margin: '4px 0 0', color: '#111827', fontWeight: 700 }}>
                    Flagship Boutique & Weaving Loft
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.92rem', color: '#4B5563' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFF9E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    flexShrink: 0,
                  }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#111827' }}>Factory Address:</strong><br />
                    85 M T N Ghosh Road, Hasnabad<br />
                    Champanagar, Bhagalpur, Bihar 812004, India
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFF9E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    flexShrink: 0,
                  }}>
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#111827' }}>Proprietor:</strong> MD RAZA ALAM
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFF9E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    flexShrink: 0,
                  }}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <a href="tel:+919430908657" style={{ color: '#111827', fontWeight: 600, textDecoration: 'none' }}>+91-9430908657</a> / <a href="tel:+919798141494" style={{ color: '#111827', fontWeight: 600, textDecoration: 'none' }}>+91-9798141494</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFF9E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    flexShrink: 0,
                  }}>
                    <i className="fas fa-file-invoice"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#111827' }}>GSTIN:</strong> 10AJXPA6956B1ZD (Verified Business)
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Card */}
            <div
              className="pastel-card"
              style={{
                padding: '28px',
                background: 'linear-gradient(135deg, #FFF9E6 0%, #FAF0D7 100%)',
                borderRadius: '24px',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.12)',
              }}
            >
              <h4 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                <i className="fas fa-shipping-fast" style={{ color: '#B38728' }}></i>
                Pan-India & Global Delivery Promise
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.65, margin: 0 }}>
                Every single piece or wholesale bundle is dispatched with insurance and trackable courier partners (Blue Dart, DTDC, India Post Express, and DHL Global Air Cargo).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
