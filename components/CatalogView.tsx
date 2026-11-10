'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import type { Product, SiteSettings, ProductCategory } from '@/lib/types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/data/site-settings'
import { DEFAULT_CATEGORIES } from '@/lib/data/categories'

const CATEGORY_META: Record<string, { title: string; subtitle: string; icon: string }> = {
  all: {
    title: 'THE COMPLETE CATALOG COLLECTION',
    subtitle: 'Direct Pit-Loom Weaves & Pure Flax Yardage • Bhagalpur, India',
    icon: 'fas fa-layer-group',
  },
  saree: {
    title: 'HANDLOOM SAREE MASTERPIECES',
    subtitle: 'Pure Desi Silk, Pure Linen, Moonga, Organza, Viscose & Kota Sarees',
    icon: 'fas fa-tshirt',
  },
  fabric: {
    title: 'PURE RUNNING FABRICS & YARDAGE',
    subtitle: 'Linen Shirting (80/70/60 LEA), Suiting (25/33 LEA), Cotton, Khadi & Tussar',
    icon: 'fas fa-scroll',
  },
  chadar: {
    title: 'BHAGALPURI DULL CHADAR',
    subtitle: 'World-Famous All-Season Traditional Andi & Viscose Dull Weaves',
    icon: 'fas fa-bed',
  },
  gamcha: {
    title: 'HANDLOOM GAMCHAS',
    subtitle: 'Authentic Bhagalpuri Pure Cotton & Resham Modi Gamchas',
    icon: 'fas fa-spa',
  },
  lungi: {
    title: 'TRADITIONAL LUNGIS',
    subtitle: 'Soft Silky Viscose & Breathable Pure Cotton Handloom Lungis',
    icon: 'fas fa-male',
  },
  'suit-salwar': {
    title: 'BANARSI SUIT SALWAR & DUPATTAS',
    subtitle: 'Artisanal 3-Piece Unstitched Suit Sets & Handloom Zari Stoles',
    icon: 'fas fa-female',
  },
  'dupatta-stole': {
    title: 'PURE DUPATTAS & ARTISAN STOLES',
    subtitle: 'Lightweight Festive Handloom Wraps with Delicate Zari Butis',
    icon: 'fas fa-feather',
  },
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES)
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [loading, setLoading] = useState(true)

  // Filters from URL
  const initialCategory = searchParams.get('category') || (searchParams.get('sale') === 'true' ? 'sale' : searchParams.get('ndd') === 'true' ? 'ndd' : 'all')
  const initialType = searchParams.get('type') || 'all'
  const initialSale = searchParams.get('sale') === 'true'
  const initialNdd = searchParams.get('ndd') === 'true'
  const initialSearch = searchParams.get('search') || ''

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedType, setSelectedType] = useState<string>(initialType)
  const [isSaleOnly, setIsSaleOnly] = useState<boolean>(initialSale)
  const [isNddOnly, setIsNddOnly] = useState<boolean>(initialNdd)
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'code'>('featured')

  // Sync state with URL params if user navigates back/forward
  useEffect(() => {
    const cat = searchParams.get('category')
    const sale = searchParams.get('sale') === 'true'
    const ndd = searchParams.get('ndd') === 'true'
    const type = searchParams.get('type')
    const q = searchParams.get('search')

    if (sale) {
      setIsSaleOnly(true)
      setIsNddOnly(false)
      setSelectedCategory('all')
    } else if (ndd) {
      setIsNddOnly(true)
      setIsSaleOnly(false)
      setSelectedCategory('all')
    } else if (cat) {
      setSelectedCategory(cat)
      setIsSaleOnly(false)
      setIsNddOnly(false)
    } else {
      setSelectedCategory('all')
      setIsSaleOnly(false)
      setIsNddOnly(false)
    }

    if (type) setSelectedType(type)
    else setSelectedType('all')

    if (q) setSearchQuery(q)
  }, [searchParams])

  // Fetch products & settings
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [pRes, sRes, cRes] = await Promise.all([
          fetch('/api/products?limit=200'),
          fetch('/api/settings'),
          fetch('/api/categories'),
        ])

        if (pRes.ok) {
          const pData = await pRes.json()
          setProducts(pData.products || [])
        }
        if (sRes.ok) {
          const sData = await sRes.json()
          setSettings(sData)
        }
        if (cRes.ok) {
          const cData = await cRes.json()
          if (Array.isArray(cData) && cData.length > 0) {
            setCategories(cData)
          }
        }
      } catch (err) {
        console.error('Error loading catalog data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Update URL helper
  const updateFilter = (cat: string, type: string = 'all', sale: boolean = false, ndd: boolean = false) => {
    setSelectedCategory(cat)
    setSelectedType(type)
    setIsSaleOnly(sale)
    setIsNddOnly(ndd)

    const params = new URLSearchParams()
    if (sale) {
      params.set('sale', 'true')
    } else if (ndd) {
      params.set('ndd', 'true')
    } else if (cat !== 'all') {
      params.set('category', cat)
    }
    if (type !== 'all') {
      params.set('type', type)
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    }

    const qs = params.toString()
    router.push(`/products${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  // Determine available sub-types for active category
  const availableTypes = useMemo(() => {
    if (selectedCategory === 'all' || isSaleOnly || isNddOnly) {
      // Collect distinct types across products
      const set = new Set<string>()
      products.forEach((p) => {
        if (p.product_type) set.add(p.product_type)
      })
      return Array.from(set)
    }
    const catObj = categories.find((c) => c.slug === selectedCategory)
    return catObj?.types || []
  }, [selectedCategory, isSaleOnly, isNddOnly, categories, products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.is_active) return false

        // Sale filter
        if (isSaleOnly && !p.is_on_sale && (!p.compare_at_price || p.compare_at_price <= (p.price || 0))) {
          return false
        }

        // NDD filter
        if (isNddOnly && !p.is_ndd) {
          return false
        }

        // Category filter
        if (!isSaleOnly && !isNddOnly && selectedCategory !== 'all') {
          if (p.category !== selectedCategory) return false
        }

        // Sub-type filter
        if (selectedType !== 'all') {
          const pType = (p.product_type || '').toLowerCase()
          const target = selectedType.toLowerCase()
          if (!pType.includes(target) && !target.includes(pType)) {
            return false
          }
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchCode = (p.code || '').toLowerCase().includes(q)
          const matchTitle = (p.title || '').toLowerCase().includes(q)
          const matchDesc = (p.description || '').toLowerCase().includes(q)
          const matchType = (p.product_type || '').toLowerCase().includes(q)
          if (!matchCode && !matchTitle && !matchDesc && !matchType) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0)
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0)
        if (sortBy === 'code') return (a.code || '').localeCompare(b.code || '')
        return (a.sort_order || 0) - (b.sort_order || 0)
      })
  }, [products, selectedCategory, selectedType, isSaleOnly, isNddOnly, searchQuery, sortBy])

  // Header meta info
  const currentMeta = isSaleOnly
    ? {
        title: 'CLEARANCE & FLASH SALE',
        subtitle: 'Special discounts and offers on sarees, linen fabrics, and traditional weaves',
        icon: 'fas fa-fire',
      }
    : isNddOnly
    ? {
        title: '⚡ NEXT DAY DISPATCH (NDD) WEAVES',
        subtitle: 'Ready-in-Loft Handloom Sarees & Fabrics Dispatched Within 24 Hours Across India',
        icon: 'fas fa-bolt',
      }
    : CATEGORY_META[selectedCategory] || CATEGORY_META.all

  const tabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'saree', label: 'Sarees' },
    { id: 'fabric', label: 'Fabrics (LEA)' },
    { id: 'chadar', label: 'Bhagalpuri Chadar' },
    { id: 'gamcha', label: 'Gamchas' },
    { id: 'lungi', label: 'Lungis' },
    { id: 'suit-salwar', label: 'Suit Salwar' },
    { id: 'dupatta-stole', label: 'Dupattas' },
    { id: 'ndd', label: '⚡ NDD Dispatch', isSpecial: true },
    { id: 'sale', label: '🔥 Clearance Sale', isRed: true },
  ]

  return (
    <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 20px 80px' }}>
      
      {/* Editorial Breadcrumbs */}
      <div
        style={{
          padding: '24px 0 16px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#8A7B6D',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Link href="/" style={{ color: '#8A7B6D', textDecoration: 'none' }}>
          HOME
        </Link>
        <span>/</span>
        <span style={{ color: '#1C1917' }}>COLLECTIONS</span>
        {selectedCategory !== 'all' && (
          <>
            <span>/</span>
            <span style={{ color: '#1C1917' }}>{selectedCategory.replace('-', ' ').toUpperCase()}</span>
          </>
        )}
        {selectedType !== 'all' && (
          <>
            <span>/</span>
            <span style={{ color: '#B89668' }}>{selectedType.toUpperCase()}</span>
          </>
        )}
      </div>

      {/* Main Page Editorial Header */}
      <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 36px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8A7B6D',
            display: 'inline-block',
            marginBottom: '8px',
          }}
        >
          Linen Galaxy by A S Handloom • Bhagalpur Loft
        </span>
        {isSaleOnly && (
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              margin: '0 auto 12px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1.5px solid #FCA5A5',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.16)',
            }}
          >
            <Image
              src="/assets/images/sale-circle.png"
              alt="Sale"
              fill
              sizes="64px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        <h1
          style={{
            fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#1C1917',
            margin: '0 0 10px',
            textTransform: 'uppercase',
          }}
        >
          {currentMeta.title}
        </h1>
        <p style={{ fontSize: '14.5px', color: '#6E6259', margin: 0, lineHeight: 1.6 }}>
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Primary Category Selector Tabs (Linen World Style) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #ECE7E1',
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            (tab.id === 'sale' && isSaleOnly) ||
            (tab.id === 'ndd' && isNddOnly) ||
            (!isSaleOnly && !isNddOnly && selectedCategory === tab.id)

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'sale') updateFilter('all', 'all', true, false)
                else if (tab.id === 'ndd') updateFilter('all', 'all', false, true)
                else updateFilter(tab.id, 'all', false, false)
              }}
              style={{
                padding: '9px 18px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: isActive ? '1px solid #1C1917' : '1px solid #E5E7EB',
                background: isActive ? '#1C1917' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : tab.isRed ? '#DC2626' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#1C1917'
                  e.currentTarget.style.color = '#1C1917'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.color = tab.isRed ? '#DC2626' : '#4B5563'
                }
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Secondary Sub-Type Filter Pills (When category has sub-types) */}
      {availableTypes.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <button
            onClick={() => updateFilter(selectedCategory, 'all', isSaleOnly, isNddOnly)}
            style={{
              padding: '6px 14px',
              borderRadius: '50px',
              fontSize: '11px',
              fontWeight: selectedType === 'all' ? 700 : 500,
              border: selectedType === 'all' ? '1px solid #1C1917' : '1px solid #E5E7EB',
              background: selectedType === 'all' ? '#FAF8F5' : '#FFFFFF',
              color: selectedType === 'all' ? '#1C1917' : '#6B7280',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            All Sub-Types
          </button>
          {availableTypes.map((type) => {
            const isTypeActive = selectedType.toLowerCase() === type.toLowerCase()
            return (
              <button
                key={type}
                onClick={() => updateFilter(selectedCategory, type, isSaleOnly, isNddOnly)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: isTypeActive ? 700 : 500,
                  border: isTypeActive ? '1px solid #1C1917' : '1px solid #E5E7EB',
                  background: isTypeActive ? '#FAF8F5' : '#FFFFFF',
                  color: isTypeActive ? '#1C1917' : '#6B7280',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {type}
              </button>
            )
          })}
        </div>
      )}

      {/* Search & Sort Tool Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '32px',
          padding: '14px 18px',
          background: '#FAF9F6',
          borderRadius: '4px',
          border: '1px solid #ECE7E1',
        }}
      >
        {/* Count Indicator */}
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6E6259', letterSpacing: '0.04em' }}>
          SHOWING{' '}
          <strong style={{ color: '#1C1917' }}>{filteredProducts.length}</strong>{' '}
          {filteredProducts.length === 1 ? 'WEAVE' : 'WEAVES'}
        </div>

        {/* Search Input & Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <i
              className="fas fa-search"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                fontSize: '12px',
              }}
            ></i>
            <input
              type="text"
              placeholder="Search code or weave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                borderRadius: '4px',
                border: '1px solid #D7D0C6',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1C1917',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, textTransform: 'uppercase', color: '#8A7B6D' }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '7px 12px',
                borderRadius: '4px',
                border: '1px solid #D7D0C6',
                background: '#FFFFFF',
                fontSize: '12px',
                color: '#1C1917',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="code">Product Code (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8A7B6D' }}>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '28px', color: '#1C1917' }}></i>
          <p style={{ marginTop: '14px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Retrieving Master Catalog...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '70px 24px',
            background: '#FAF9F6',
            borderRadius: '6px',
            border: '1px dashed #D7D0C6',
            maxWidth: '640px',
            margin: '20px auto 0',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #ECE7E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              color: '#8A7B6D',
              fontSize: '20px',
            }}
          >
            <i className="fas fa-scroll"></i>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              color: '#1C1917',
              margin: '0 0 10px',
            }}
          >
            No products yet
          </h3>
          <p style={{ color: '#6E6259', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>
            New handcrafted handloom weaves are currently being updated. Please check back soon or browse all collections.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => updateFilter('all', 'all', false, false)}
              style={{
                padding: '11px 22px',
                borderRadius: '4px',
                background: '#1C1917',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {!loading && filteredProducts.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px 20px',
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showPrices={settings.show_prices}
              showWholesalePrices={settings.show_wholesale_prices}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CatalogView() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: '120px 20px', color: '#8A7B6D' }}>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '28px', color: '#1C1917' }}></i>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  )
}
