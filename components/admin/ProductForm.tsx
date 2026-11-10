'use client'

import { useState, useEffect, useMemo, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, ProductCategory } from '@/lib/types'
import { DEFAULT_CATEGORIES } from '@/lib/data/categories'
import CloudinaryUpload from './CloudinaryUpload'

interface ProductFormProps {
  initialValues?: Partial<Product>
  productId?: string
}

export default function ProductForm({ initialValues, productId }: ProductFormProps) {
  const router = useRouter()

  // Form State
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url || '')
  const [secondaryImageUrl, setSecondaryImageUrl] = useState(initialValues?.secondary_image_url || '')
  const [code, setCode] = useState(initialValues?.code || '')
  const [title, setTitle] = useState(initialValues?.title || initialValues?.description || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [category, setCategory] = useState<string>(initialValues?.category || 'saree')
  const [productType, setProductType] = useState<string>(initialValues?.product_type || '')
  const [customType, setCustomType] = useState<string>('')
  const [isCustomType, setIsCustomType] = useState(false)

  // Pricing, Sale & Commercial
  const [price, setPrice] = useState<string>(initialValues?.price ? String(initialValues.price) : '')
  const [compareAtPrice, setCompareAtPrice] = useState<string>(
    initialValues?.compare_at_price ? String(initialValues.compare_at_price) : ''
  )
  const [wholesalePrice, setWholesalePrice] = useState<string>(
    initialValues?.wholesale_price ? String(initialValues.wholesale_price) : ''
  )
  const [minWholesaleQty, setMinWholesaleQty] = useState(initialValues?.min_wholesale_qty || '10 Pieces')
  const [isOnSale, setIsOnSale] = useState(Boolean(initialValues?.is_on_sale))
  const [isNdd, setIsNdd] = useState(Boolean(initialValues?.is_ndd))
  const [isOutOfStock, setIsOutOfStock] = useState(Boolean(initialValues?.is_out_of_stock))

  // Weave Specifications
  const [gsm, setGsm] = useState(initialValues?.gsm || '')
  const [weight, setWeight] = useState(initialValues?.weight || '')
  const [colors, setColors] = useState(
    initialValues?.colors ? initialValues.colors.join(', ') : 'Natural Gold, Off-White'
  )
  const [sizes, setSizes] = useState(
    initialValues?.sizes ? initialValues.sizes.join(', ') : 'Standard Saree 6.3m (with blouse)'
  )

  const [isActive, setIsActive] = useState(initialValues?.is_active ?? true)
  const [sortOrder, setSortOrder] = useState(initialValues?.sort_order ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Categories list
  const [categoriesList, setCategoriesList] = useState<ProductCategory[]>(DEFAULT_CATEGORIES)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setCategoriesList(data)
          }
        }
      } catch {}
    }
    fetchCategories()
  }, [])

  // Current sub-types for selected category
  const activeCategoryObj = useMemo(
    () => categoriesList.find((c) => c.slug === category),
    [categoriesList, category]
  )
  const availableTypes = useMemo(
    () => activeCategoryObj?.types || [],
    [activeCategoryObj]
  )

  // Default first type if empty
  useEffect(() => {
    if (!productType && availableTypes.length > 0) {
      setProductType(availableTypes[0])
    }
  }, [category, availableTypes, productType])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!imageUrl) {
      setError('Please provide or upload a product image.')
      return
    }
    if (!code.trim()) {
      setError('Product code is required (e.g. SAR1001, FAB3001).')
      return
    }
    if (!description.trim()) {
      setError('Description is required.')
      return
    }

    setLoading(true)

    try {
      const selectedFinalType = isCustomType && customType.trim() ? customType.trim() : productType

      const body: Partial<Product> = {
        image_url: imageUrl,
        secondary_image_url: secondaryImageUrl.trim() || undefined,
        code: code.trim().toUpperCase(),
        title: title.trim() || description.trim(),
        description: description.trim(),
        category,
        product_type: selectedFinalType,
        price: price ? parseFloat(price) : undefined,
        compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        wholesale_price: wholesalePrice ? parseFloat(wholesalePrice) : undefined,
        min_wholesale_qty: minWholesaleQty.trim(),
        is_on_sale: isOnSale,
        is_ndd: isNdd,
        is_out_of_stock: isOutOfStock,
        gsm: gsm.trim(),
        weight: weight.trim(),
        colors: colors.split(',').map((c) => c.trim()).filter(Boolean),
        sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
        is_active: isActive,
        sort_order: sortOrder,
      }

      const url = productId ? `/api/products/${productId}` : '/api/products'
      const method = productId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save product')
      }

      router.refresh()
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong while saving')
    } finally {
      setLoading(false)
    }
  }

  const inputContainerStyle = (fieldName: string): React.CSSProperties => ({
    borderRadius: '12px',
    border: focusedField === fieldName ? '2px solid #D4AF37' : '1px solid #e2e8f0',
    background: focusedField === fieldName ? 'rgba(212, 175, 55, 0.05)' : '#fafafa',
    transition: 'all 0.3s ease',
  })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: 'transparent',
    outline: 'none',
    color: '#111827',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '820px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.06)',
        border: '1.5px solid rgba(197, 160, 89, 0.25)',
        overflow: 'hidden',
      }}
    >
      {/* Form Header */}
      <div
        style={{
          padding: '24px 32px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(194, 89, 106, 0.06) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #B38728 0%, #D4AF37 50%, #C2596A 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
            }}
          >
            <i className={productId ? 'fas fa-edit' : 'fas fa-plus'} style={{ color: 'white', fontSize: '18px' }}></i>
          </div>
          <div>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: 0 }}>
              {productId ? 'Edit Masterpiece Weave' : 'Register New Masterpiece'}
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '2px 0 0' }}>
              Linen Galaxy by A S Handloom • Authentic Bhagalpur Catalog
            </p>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div style={{ padding: '32px' }}>
        {error && (
          <div
            style={{
              padding: '14px 18px',
              background: '#FEF2F2',
              color: '#DC2626',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid #FCA5A5',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
            <i className="fas fa-image" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
            Product Image *
          </label>
          <CloudinaryUpload onUpload={setImageUrl} currentImageUrl={imageUrl} />

          <div style={{ marginTop: '14px' }}>
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>
              Or enter direct Image URL (e.g. Supabase Storage, Cloudinary, or local static path):
            </span>
            <div style={inputContainerStyle('imageUrl')}>
              <input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onFocus={() => setFocusedField('imageUrl')}
                onBlur={() => setFocusedField(null)}
                placeholder="/assets/images/sarees/saree1.webp or https://..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Secondary Hover Image (Linen World card switch effect) */}
          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '13px', fontWeight: 700, color: '#374151' }}>
              <i className="fas fa-magic" style={{ color: '#D4AF37', fontSize: '12px' }}></i>
              Secondary Hover Image (Card Switch Effect)
            </label>
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>
              Revealed smoothly when users hover over this product card:
            </span>
            <div style={inputContainerStyle('secondaryImageUrl')}>
              <input
                id="secondaryImageUrl"
                type="text"
                value={secondaryImageUrl}
                onChange={(e) => setSecondaryImageUrl(e.target.value)}
                onFocus={() => setFocusedField('secondaryImageUrl')}
                onBlur={() => setFocusedField(null)}
                placeholder="/assets/images/sarees/saree2.webp or https://..."
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Code & Title Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
              <i className="fas fa-barcode" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
              Product Code *
            </label>
            <div style={inputContainerStyle('code')}>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onFocus={() => setFocusedField('code')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. SAR1001, FAB3001, CHD5001"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
              <i className="fas fa-heading" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
              Title / Short Name
            </label>
            <div style={inputContainerStyle('title')}>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Pure Desi Silk Handloom Saree"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Category & Product Sub-type Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
              <i className="fas fa-layer-group" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
              Category *
            </label>
            <div style={inputContainerStyle('category')}>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setIsCustomType(false)
                }}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.slug})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
              <i className="fas fa-feather-alt" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
              Weave Sub-Type
            </label>
            <div style={inputContainerStyle('productType')}>
              <select
                id="productType"
                value={isCustomType ? '__custom__' : productType}
                onChange={(e) => {
                  if (e.target.value === '__custom__') {
                    setIsCustomType(true)
                  } else {
                    setIsCustomType(false)
                    setProductType(e.target.value)
                  }
                }}
                onFocus={() => setFocusedField('productType')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {availableTypes.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
                <option value="__custom__">+ Enter Custom Type...</option>
              </select>
            </div>
            {isCustomType && (
              <div style={{ marginTop: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter custom weave type..."
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D4AF37',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Pricing Row (Retail Price & Wholesale B2B Price) */}
        <div style={{ padding: '20px', background: '#FFFDF9', borderRadius: '16px', border: '1.5px solid rgba(212, 175, 55, 0.3)', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B38728', marginBottom: '14px' }}>
            Commercial Pricing (INR ₹)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Retail Sale Price (₹)
              </label>
              <div style={inputContainerStyle('price')}>
                <input
                  id="price"
                  type="number"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 3850"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Original MRP / Strike Price (₹)
              </label>
              <div style={inputContainerStyle('compareAtPrice')}>
                <input
                  id="compareAtPrice"
                  type="number"
                  step="1"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  onFocus={() => setFocusedField('compareAtPrice')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 5200 (crossed out)"
                  style={inputStyle}
                />
              </div>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Shown with strikethrough if higher than retail price</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Wholesale Price (₹)
              </label>
              <div style={inputContainerStyle('wholesalePrice')}>
                <input
                  id="wholesalePrice"
                  type="number"
                  step="1"
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  onFocus={() => setFocusedField('wholesalePrice')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 2450"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Min Wholesale Qty
              </label>
              <div style={inputContainerStyle('minWholesaleQty')}>
                <input
                  id="minWholesaleQty"
                  type="text"
                  value={minWholesaleQty}
                  onChange={(e) => setMinWholesaleQty(e.target.value)}
                  onFocus={() => setFocusedField('minWholesaleQty')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 10 Pieces / 50 Meters"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Sale & NDD Badges Row */}
          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid rgba(212, 175, 55, 0.2)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {/* Sale Switch */}
            <div
              onClick={() => setIsOnSale(!isOnSale)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: isOnSale ? '1.5px solid #DC2626' : '1px solid #E5E7EB',
                background: isOnSale ? '#FEE2E2' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: isOnSale ? '2px solid #DC2626' : '2px solid #D1D5DB',
                  background: isOnSale ? '#DC2626' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '11px',
                }}
              >
                {isOnSale && <i className="fas fa-check"></i>}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: isOnSale ? '#991B1B' : '#374151' }}>
                  🔥 Flash Sale / Clearance Item
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                  Features in Sale section with red SALE badge
                </div>
              </div>
            </div>

            {/* NDD Switch */}
            <div
              onClick={() => setIsNdd(!isNdd)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: isNdd ? '1.5px solid #059669' : '1px solid #E5E7EB',
                background: isNdd ? '#D1FAE5' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: isNdd ? '2px solid #059669' : '2px solid #D1D5DB',
                  background: isNdd ? '#059669' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '11px',
                }}
              >
                {isNdd && <i className="fas fa-check"></i>}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: isNdd ? '#065F46' : '#374151' }}>
                  ⚡ Next Day Dispatch (NDD)
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                  Pre-woven loft inventory, ready to dispatch within 24h
                </div>
              </div>
            </div>

            {/* Out of Stock Switch */}
            <div
              onClick={() => setIsOutOfStock(!isOutOfStock)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: isOutOfStock ? '1.5px solid #1F2937' : '1px solid #E5E7EB',
                background: isOutOfStock ? '#F3F4F6' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: isOutOfStock ? '2px solid #1F2937' : '2px solid #D1D5DB',
                  background: isOutOfStock ? '#1F2937' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '11px',
                }}
              >
                {isOutOfStock && <i className="fas fa-check"></i>}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: isOutOfStock ? '#111827' : '#374151' }}>
                  📦 Mark as Out of Stock
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                  Displays OUT OF STOCK tag & restock inquiry WhatsApp action
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications (GSM, Weight, Colors, Sizes) */}
        <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', marginBottom: '14px' }}>
            Weave Specifications & Attributes
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                GSM / Yarn Count
              </label>
              <div style={inputContainerStyle('gsm')}>
                <input
                  id="gsm"
                  type="text"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  onFocus={() => setFocusedField('gsm')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 80 LEA, 140 GSM, 25 LEA"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Item Weight
              </label>
              <div style={inputContainerStyle('weight')}>
                <input
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onFocus={() => setFocusedField('weight')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 480g, 580g, 160g"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Available Colors (Comma separated)
              </label>
              <div style={inputContainerStyle('colors')}>
                <input
                  id="colors"
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  onFocus={() => setFocusedField('colors')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Tussar Gold, Blush Pink, Indigo"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Available Sizes / Dimensions
              </label>
              <div style={inputContainerStyle('sizes')}>
                <input
                  id="sizes"
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  onFocus={() => setFocusedField('sizes')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 6.3m (with blouse), 2.45m x 1.35m"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
            <i className="fas fa-align-left" style={{ color: '#D4AF37', fontSize: '13px' }}></i>
            Detailed Weave Description *
          </label>
          <div style={inputContainerStyle('description')}>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter product description, pit-loom details, warp/weft specifics..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
              required
            />
          </div>
        </div>

        {/* Sort Order & Active Status */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div style={{ width: '160px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Sort Order
            </label>
            <div style={inputContainerStyle('sortOrder')}>
              <input
                id="sort_order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                onFocus={() => setFocusedField('sortOrder')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '14px 20px',
              background: isActive ? '#ECFDF5' : '#F9FAFB',
              borderRadius: '12px',
              border: isActive ? '1.5px solid #10B981' : '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              marginTop: '22px',
            }}
            onClick={() => setIsActive(!isActive)}
          >
            <div
              style={{
                width: '46px',
                height: '24px',
                borderRadius: '12px',
                background: isActive ? '#10B981' : '#CBD5E1',
                position: 'relative',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: isActive ? '24px' : '2px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                {isActive ? 'Active & Visible in Catalog' : 'Hidden from Storefront'}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                Toggle online visibility for retail and wholesale
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-pastel-primary"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '15px',
            boxShadow: '0 10px 25px -5px rgba(212, 175, 55, 0.45)',
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              Saving Masterpiece...
            </>
          ) : (
            <>
              <i className={productId ? 'fas fa-save' : 'fas fa-plus-circle'}></i>
              <span>{productId ? 'Update Product Details' : 'Create & Publish Product'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
