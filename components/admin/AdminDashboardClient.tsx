'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductTable from '@/components/admin/ProductTable'
import CategoryManager from '@/components/admin/CategoryManager'
import SectionBuilder from '@/components/admin/SectionBuilder'
import StoreSettingsView from '@/components/admin/StoreSettingsView'
import ThreeDTilt from '@/components/ThreeDTilt'

interface AdminDashboardClientProps {
  initialCounts: {
    total: number
    active: number
    sarees: number
    fabrics: number
    chadars: number
    suits: number
  }
}

export default function AdminDashboardClient({ initialCounts }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'categories' | 'sections' | 'settings'>('inventory')

  const stats = [
    {
      label: 'Total Catalog Weaves',
      value: initialCounts.total,
      sub: 'Wholesale & Retail Ready',
      icon: 'fas fa-boxes',
      color: '#B38728',
      bg: '#FFF9E6',
      border: 'rgba(212, 175, 55, 0.35)',
    },
    {
      label: 'Active on Storefront',
      value: initialCounts.active,
      sub: 'Visible on Linen Galaxy',
      icon: 'fas fa-check-circle',
      color: '#2D6A4F',
      bg: '#F0F7F2',
      border: 'rgba(45, 106, 79, 0.35)',
    },
    {
      label: 'Handloom Sarees',
      value: initialCounts.sarees,
      sub: 'Desi Silk, Linen, Moonga, Organza',
      icon: 'fas fa-tshirt',
      color: '#C2596A',
      bg: '#FDF2F4',
      border: 'rgba(194, 89, 106, 0.35)',
    },
    {
      label: 'Fabric Yardage Rolls',
      value: initialCounts.fabrics,
      sub: 'Linen 80/70/60 LEA, Khadi, Tussar',
      icon: 'fas fa-scroll',
      color: '#C05634',
      bg: '#FDF4F0',
      border: 'rgba(192, 86, 52, 0.35)',
    },
    {
      label: 'Chadar, Gamcha & Lungi',
      value: initialCounts.chadars,
      sub: 'Bhagalpuri DULL Chadar & Weaves',
      icon: 'fas fa-bed',
      color: '#D4AF37',
      bg: '#FFF9E6',
      border: 'rgba(212, 175, 55, 0.35)',
    },
    {
      label: 'Suit Salwar & Dupatta',
      value: initialCounts.suits,
      sub: 'Banarsi Cut Fabric Sets',
      icon: 'fas fa-female',
      color: '#6D28D9',
      bg: '#F5F3FF',
      border: 'rgba(109, 40, 217, 0.3)',
    },
  ]

  return (
    <div>
      {/* Page Header with Round Boutique Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* Round Boutique Avatar / Showcase */}
          <div
            style={{
              position: 'relative',
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              padding: '4px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(197, 160, 89, 0.5) 100%)',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.4)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#1C1917',
              }}
            >
              <img
                src="/assets/images/linen-galaxy-boutique.png"
                alt="Linen Galaxy Flagship Boutique"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  background: '#FFF9E6',
                  color: '#996515',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '50px',
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Flagship Boutique • Linen Galaxy
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.2rem',
              fontWeight: 700,
              color: '#111827',
              margin: '4px 0 6px',
            }}>
              Linen Galaxy Admin Center
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', margin: 0 }}>
              Manage wholesale rolls, retail sarees, Chadars, custom weave types, modular section layout, and global price controls.
            </p>
          </div>
        </div>

        <Link
          href="/admin/dashboard/products/new"
          className="btn-pastel-primary"
          style={{ padding: '13px 26px' }}
        >
          <i className="fas fa-plus"></i>
          <span>Add New Product</span>
        </Link>
      </div>

      {/* 3D Overview Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '18px',
          marginBottom: '36px',
        }}
      >
        {stats.map((stat, idx) => (
          <ThreeDTilt key={idx} intensity={6}>
            <div
              className="pastel-card"
              style={{
                padding: '20px 18px',
                background: '#FFFFFF',
                borderRadius: '18px',
                border: `1.5px solid ${stat.border}`,
                boxShadow: '0 6px 18px -4px rgba(17, 24, 39, 0.05)',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: stat.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  <i className={stat.icon}></i>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                  {stat.label}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                {stat.sub}
              </div>
            </div>
          </ThreeDTilt>
        ))}
      </div>

      {/* Admin Module Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          background: '#FFFFFF',
          padding: '8px',
          borderRadius: '50px',
          border: '1.5px solid rgba(197, 160, 89, 0.25)',
          boxShadow: '0 4px 16px rgba(17, 24, 39, 0.04)',
          marginBottom: '32px',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'inventory', label: 'Catalog & Products', icon: 'fas fa-boxes' },
          { id: 'categories', label: 'Categories & Weave Types', icon: 'fas fa-layer-group' },
          { id: 'sections', label: 'Homepage Section Builder', icon: 'fas fa-puzzle-piece' },
          { id: 'settings', label: 'Global Prices & Store Settings', icon: 'fas fa-cog' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '12px 20px',
              borderRadius: '50px',
              border: 'none',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, #B38728 0%, #D4AF37 50%, #C59B27 100%)'
                : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : '#4B5563',
              fontWeight: activeTab === tab.id ? 700 : 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: activeTab === tab.id ? '0 4px 14px rgba(212, 175, 55, 0.35)' : 'none',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Module View */}
      {activeTab === 'inventory' && <ProductTable />}
      {activeTab === 'categories' && <CategoryManager />}
      {activeTab === 'sections' && <SectionBuilder />}
      {activeTab === 'settings' && <StoreSettingsView />}
    </div>
  )
}
