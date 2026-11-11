'use client'
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import type { SiteSettings, StoreOutlet } from '@/lib/types'
import { DEFAULT_OUTLETS } from '@/lib/data/site-settings'
import ImageUploaderWithCropper from './ImageUploaderWithCropper'

export default function StoreSettingsView() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [activePolicySlug, setActivePolicySlug] = useState('shipping-delivery')
  const [savingPolicy, setSavingPolicy] = useState(false)

  const loadSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleTogglePrices = async () => {
    if (!settings) return
    const updatedValue = !settings.show_prices
    setSettings({ ...settings, show_prices: updatedValue })

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_prices: updatedValue }),
      })
      setMessage(
        updatedValue
          ? 'Prices enabled website-wide! Visitors can now see retail and wholesale rates.'
          : 'Prices disabled website-wide! The site is now in "Quote / Inquire on WhatsApp" mode.'
      )
      setTimeout(() => setMessage(null), 4000)
    } catch {
      alert('Error updating price visibility')
    }
  }

  const handleToggleWholesalePrices = async () => {
    if (!settings) return
    const updatedValue = !settings.show_wholesale_prices
    setSettings({ ...settings, show_wholesale_prices: updatedValue })

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_wholesale_prices: updatedValue }),
      })
      setMessage(
        updatedValue
          ? 'Wholesale prices enabled for all catalog items!'
          : 'Wholesale prices hidden from public display.'
      )
      setTimeout(() => setMessage(null), 4000)
    } catch {
      alert('Error updating wholesale price visibility')
    }
  }

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setMessage('Store details & parent company configuration saved!')
        setTimeout(() => setMessage(null), 4000)
      } else {
        alert('Failed to save settings')
      }
    } catch {
      alert('Error connecting to server')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !settings) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '28px', color: '#D4AF37' }}></i>
        <div style={{ marginTop: '12px' }}>Loading store configuration...</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#111827', margin: 0 }}>
          Store Configuration & Global Price Master
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '4px 0 0' }}>
          Control price visibility across the entire website, manage brand titles, and enterprise details.
        </p>
      </div>

      {message && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            background: '#F0F7F2',
            border: '1.5px solid rgba(45, 106, 79, 0.3)',
            color: '#2D6A4F',
            marginBottom: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.94rem',
            fontWeight: 600,
          }}
        >
          <i className="fas fa-check-circle" style={{ fontSize: '18px' }}></i>
          <span>{message}</span>
        </div>
      )}

      {/* Website-Wide Price Toggle Master Card */}
      <div
        className="pastel-card"
        style={{
          padding: '32px',
          borderRadius: '24px',
          background: settings.show_prices
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF9E6 100%)'
            : '#FFFFFF',
          border: '2px solid rgba(212, 175, 55, 0.45)',
          boxShadow: '0 12px 32px rgba(17, 24, 39, 0.08)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '520px' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#B38728',
                fontWeight: 700,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Master Commercial Switch
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
              Website-Wide Product Pricing
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              {settings.show_prices
                ? 'PRICES ENABLED: Visitors and wholesale clients see retail rates (₹) and wholesale tiers across all pages.'
                : 'PRICES DISABLED: All catalog prices are hidden across the entire website. Product cards will display "Price on Request / Inquire on WhatsApp". Ideal for quote-only or export trade.'}
            </p>
          </div>

          {/* Toggle Switch */}
          <div
            onClick={handleTogglePrices}
            style={{
              width: '74px',
              height: '40px',
              borderRadius: '20px',
              background: settings.show_prices
                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                : '#D1D5DB',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              boxShadow: settings.show_prices ? '0 4px 14px rgba(16, 185, 129, 0.4)' : 'none',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                transform: settings.show_prices ? 'translateX(34px)' : 'translateX(0px)',
                transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />
          </div>
        </div>

        {/* Wholesale Price Sub-toggle */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(197, 160, 89, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
              Display Wholesale Tiers alongside Retail
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              Shows minimum order quantity and bulk bolt rates on product cards.
            </div>
          </div>

          <div
            onClick={handleToggleWholesalePrices}
            style={{
              width: '56px',
              height: '30px',
              borderRadius: '15px',
              background: settings.show_wholesale_prices ? '#D4AF37' : '#D1D5DB',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FFFFFF',
                transform: settings.show_wholesale_prices ? 'translateX(26px)' : 'translateX(0px)',
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Brand & Store Details Form */}
      <div
        className="pastel-card"
        style={{
          padding: '32px',
          borderRadius: '24px',
          background: '#FFFFFF',
          border: '1.5px solid rgba(197, 160, 89, 0.25)',
        }}
      >
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
          Brand Identity & Parent Enterprise
        </h3>

        <form onSubmit={handleSaveDetails} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Store Brand Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Flagship retail & wholesale store brand (e.g. Linen Galaxy)</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Parent Manufacturing Company
              </label>
              <input
                type="text"
                value={settings.parent_company || 'A S Handloom'}
                onChange={(e) => setSettings({ ...settings, parent_company: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  background: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Ancestral weaving house & parent firm in Bhagalpur (Est. 2007)</span>
            </div>
          </div>

          {/* Hero Section Abstract Showcase Image */}
          <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)', paddingTop: '18px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
              <i className="fas fa-image" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
              Hero Section Abstract Silhouette Showcase
            </h4>

            {/* Abstract Arch Showcase Preview */}
            <div style={{ display: 'flex', gap: '22px', alignItems: 'center', marginBottom: '22px', padding: '16px', background: '#FAF9F6', borderRadius: '16px', border: '1px solid #ECE7E1' }}>
              <div
                style={{
                  position: 'relative',
                  width: '90px',
                  height: '120px',
                  borderRadius: '60px 60px 14px 14px',
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(197, 160, 89, 0.5) 100%)',
                  boxShadow: '0 6px 18px rgba(212, 175, 55, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.4)',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '56px 56px 10px 10px',
                    overflow: 'hidden',
                    background: '#1C1917',
                  }}
                >
                  <img
                    src={settings.shop_image_url || '/assets/images/hero-model-saree.webp'}
                    alt="Hero Showcase Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              <div>
                <span
                  style={{
                    background: '#FFF9E6',
                    color: '#996515',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    borderRadius: '50px',
                    padding: '3px 10px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Abstract Shape Hero Preview
                </span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
                  A S Handloom — Handcrafted Saree Model Showcase
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0', maxWidth: '440px' }}>
                  Framed in an architectural sculpted arch with gold aura. Appears on the homepage Hero section as the primary textile showcase.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <ImageUploaderWithCropper
                value={settings.shop_image_url || '/assets/images/hero-model-saree.webp'}
                onChange={(newUrl) => setSettings({ ...settings, shop_image_url: newUrl })}
                label="Hero Section Showcase Photo"
                description="Upload, crop, or replace the photo featured in the luxury arch container on the homepage."
                initialAspectRatio="3:4"
                enableCircleMask={false}
                presets={[
                  { label: 'Saree Model (Default)', url: '/assets/images/hero-model-saree.webp' },
                  { label: 'A S Handloom Loom Logo', url: '/assets/images/as-handloom-logo.png' },
                ]}
                uploadFolder="ashandloom/hero"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Hero Physical Location Caption
              </label>
              <input
                type="text"
                placeholder="85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004"
                value={settings.shop_address || ''}
                onChange={(e) => setSettings({ ...settings, shop_address: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Location shown in hero caption</span>
            </div>
          </div>

          {/* Outlets Configuration Section */}
          <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  <i className="fas fa-store-alt" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
                  Our Shops & Outlets Configuration
                </h4>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0' }}>
                  Configure physical addresses and showcase photos for your Main Office depot and Linen Galaxy boutique.
                </p>
              </div>
            </div>

            {(() => {
              const currentOutlets = settings.outlets && settings.outlets.length > 0 ? settings.outlets : DEFAULT_OUTLETS

              const updateOutletField = (idx: number, field: keyof StoreOutlet, value: any) => {
                const updated = [...currentOutlets]
                updated[idx] = { ...updated[idx], [field]: value }
                setSettings({ ...settings, outlets: updated })
              }

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {currentOutlets.slice(0, 2).map((outlet, idx) => (
                    <div
                      key={outlet.id || idx}
                      style={{
                        padding: '20px',
                        background: '#FAF9F6',
                        borderRadius: '16px',
                        border: '1.5px solid #E5DFD5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            background: idx === 0 ? '#1C1917' : '#B38728',
                            color: '#FFFFFF',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {idx === 0 ? 'Outlet 1 (Main Office)' : 'Outlet 2 (Boutique)'}
                        </span>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                          <input
                            type="checkbox"
                            checked={outlet.is_active !== false}
                            onChange={(e) => updateOutletField(idx, 'is_active', e.target.checked)}
                          />
                          Active
                        </label>
                      </div>

                      {/* Outlet Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                          Shop / Outlet Name
                        </label>
                        <input
                          type="text"
                          value={outlet.name}
                          onChange={(e) => updateOutletField(idx, 'name', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #D5CEBF',
                            fontSize: '13px',
                            background: '#FFFFFF',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Outlet Tagline */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                          Tagline / Subheading
                        </label>
                        <input
                          type="text"
                          value={outlet.tagline || ''}
                          onChange={(e) => updateOutletField(idx, 'tagline', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #D5CEBF',
                            fontSize: '13px',
                            background: '#FFFFFF',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Outlet Address */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                          Physical Address (Configurable)
                        </label>
                        <textarea
                          rows={2}
                          value={outlet.address}
                          onChange={(e) => updateOutletField(idx, 'address', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #D5CEBF',
                            fontSize: '13px',
                            background: '#FFFFFF',
                            outline: 'none',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Outlet Image Uploader with Built-in Cropper & Remove */}
                      <ImageUploaderWithCropper
                        value={outlet.image_url}
                        onChange={(newUrl) => updateOutletField(idx, 'image_url', newUrl)}
                        label={`${outlet.badge || outlet.name || 'Shop'} Photo`}
                        description="Upload from device or crop and adjust dimensions with round/rect preview."
                        initialAspectRatio={idx === 1 ? '1:1' : '4:3'}
                        enableCircleMask={true}
                        defaultCirclePreview={idx === 1}
                        presets={[
                          { label: 'A S Handloom Loom Logo', url: '/assets/images/as-handloom-logo.png' },
                          { label: 'Linen Galaxy Boutique Front', url: '/assets/images/linen-galaxy-boutique.png' },
                          { label: 'White BG Badge', url: '/assets/images/as-handloom-logo-white-bg.png' },
                        ]}
                        uploadFolder="ashandloom/outlets"
                      />

                      {/* Phone & Timings */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                            Phone / WhatsApp
                          </label>
                          <input
                            type="text"
                            value={outlet.phone || ''}
                            onChange={(e) => updateOutletField(idx, 'phone', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              borderRadius: '6px',
                              border: '1px solid #D5CEBF',
                              fontSize: '12px',
                              background: '#FFFFFF',
                              outline: 'none',
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                            Opening Hours
                          </label>
                          <input
                            type="text"
                            value={outlet.hours || ''}
                            onChange={(e) => updateOutletField(idx, 'hours', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              borderRadius: '6px',
                              border: '1px solid #D5CEBF',
                              fontSize: '12px',
                              background: '#FFFFFF',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Proprietor
              </label>
              <input
                type="text"
                value={settings.proprietor}
                onChange={(e) => setSettings({ ...settings, proprietor: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                GSTIN Number
              </label>
              <input
                type="text"
                value={settings.gstin}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Direct Phone
              </label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                WhatsApp Dispatch Order Number
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-pastel-primary"
            style={{
              padding: '14px 28px',
              alignSelf: 'flex-start',
              marginTop: '10px',
              fontSize: '0.92rem',
            }}
          >
            <i className="fas fa-save"></i>
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </form>
      </div>

      {/* Customer Service & Store Policies Manager */}
      <div
        className="pastel-card"
        style={{
          marginTop: '32px',
          padding: '32px',
          borderRadius: '24px',
          background: '#FFFFFF',
          border: '1.5px solid rgba(197, 160, 89, 0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Customer Service & Store Policies
            </h3>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>
              Edit dynamic policy content rendered under Customer Service in the website footer.
            </p>
          </div>

          <button
            type="button"
            onClick={async () => {
              if (!settings) return
              setSavingPolicy(true)
              setMessage(null)
              try {
                const res = await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ policies: settings.policies }),
                })
                if (res.ok) {
                  setMessage('Customer service policies saved successfully!')
                  setTimeout(() => setMessage(null), 4000)
                } else {
                  alert('Failed to save policies')
                }
              } catch {
                alert('Error connecting to server')
              } finally {
                setSavingPolicy(false)
              }
            }}
            disabled={savingPolicy}
            className="btn-pastel-primary"
            style={{
              padding: '11px 22px',
              fontSize: '13px',
            }}
          >
            <i className="fas fa-save"></i>
            <span>{savingPolicy ? 'Saving...' : 'Save Policy Changes'}</span>
          </button>
        </div>

        {/* Policy Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            { slug: 'shipping-delivery', label: 'Shipping & Delivery' },
            { slug: 'refund-cancellation', label: 'Refund & Cancellation' },
            { slug: 'handloom-disclaimer', label: 'Handloom Disclaimer' },
            { slug: 'privacy-policy', label: 'Privacy Policy' },
            { slug: 'terms-of-service', label: 'Terms of Service' },
          ].map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActivePolicySlug(item.slug)}
              style={{
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: activePolicySlug === item.slug ? 700 : 500,
                border: activePolicySlug === item.slug ? '1.5px solid #D4AF37' : '1px solid #E5E7EB',
                background: activePolicySlug === item.slug ? '#FFF9E6' : '#FFFFFF',
                color: activePolicySlug === item.slug ? '#996515' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Policy Editor Fields */}
        {settings.policies && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Policy Title
                </label>
                <input
                  type="text"
                  value={settings.policies[activePolicySlug]?.title || ''}
                  onChange={(e) => {
                    const currentPolicies = settings.policies || {}
                    const current = currentPolicies[activePolicySlug] || { title: '', content: '' }
                    setSettings({
                      ...settings,
                      policies: {
                        ...currentPolicies,
                        [activePolicySlug]: {
                          ...current,
                          title: e.target.value,
                        },
                      },
                    })
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(197, 160, 89, 0.3)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Last Updated Notice
                </label>
                <input
                  type="text"
                  value={settings.policies[activePolicySlug]?.last_updated || ''}
                  onChange={(e) => {
                    const currentPolicies = settings.policies || {}
                    const current = currentPolicies[activePolicySlug] || { title: '', content: '' }
                    setSettings({
                      ...settings,
                      policies: {
                        ...currentPolicies,
                        [activePolicySlug]: {
                          ...current,
                          last_updated: e.target.value,
                        },
                      },
                    })
                  }}
                  placeholder="e.g. November 2026"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(197, 160, 89, 0.3)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Policy Content (Full text with paragraphs & bullet points)
              </label>
              <textarea
                rows={10}
                value={settings.policies[activePolicySlug]?.content || ''}
                onChange={(e) => {
                  const currentPolicies = settings.policies || {}
                  const current = currentPolicies[activePolicySlug] || { title: '', content: '' }
                  setSettings({
                    ...settings,
                    policies: {
                      ...currentPolicies,
                      [activePolicySlug]: {
                        ...current,
                        content: e.target.value,
                      },
                    },
                  })
                }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 160, 89, 0.3)',
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
