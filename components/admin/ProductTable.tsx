'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Product, ProductCategory } from '@/lib/types'
import { DEFAULT_CATEGORIES } from '@/lib/data/categories'

interface ProductResponse {
  products: Product[]
  total: number
  page: number
  perPage: number
  totalPages: number
  hasMore: boolean
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  // Filter and Search
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeType, setActiveType] = useState<string>('all')
  const [search, setSearch] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage, setPerPage] = useState(15)

  // Sorting
  const [sortBy, setSortBy] = useState('sort_order')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const router = useRouter()

  // Load categories
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data)
          }
        }
      } catch {}
    }
    loadCats()
  }, [])

  // Sub-types for active category
  const selectedCatObj = categories.find((c) => c.slug === activeCategory)
  const subTypes = selectedCatObj?.types || []

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        admin: 'true',
        page: currentPage.toString(),
        per_page: perPage.toString(),
        sort_by: sortBy,
        sort_order: sortOrder,
        ...(activeCategory !== 'all' && { category: activeCategory }),
        ...(activeType !== 'all' && { product_type: activeType }),
        ...(search && { search }),
      })

      const res = await fetch(`/api/products?${params}`)
      if (!res.ok) throw new Error('Failed to fetch products')

      const data: ProductResponse = await res.json()
      setProducts(data.products)
      setTotalPages(data.totalPages)
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [currentPage, perPage, activeCategory, activeType, search, sortBy, sortOrder])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeType, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete masterpiece [${code}]?`)) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchProducts()
      } else {
        alert('Failed to delete product.')
      }
    } catch {
      alert('Error deleting product')
    }
  }

  const handleToggleActive = async (id: string, currentlyActive: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentlyActive }),
      })
      if (res.ok) {
        await fetchProducts()
      } else {
        alert('Failed to update status.')
      }
    } catch {
      alert('Error updating product')
    }
  }

  const handleToggleStock = async (id: string, currentlyOutOfStock: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_out_of_stock: !currentlyOutOfStock }),
      })
      if (res.ok) {
        await fetchProducts()
      } else {
        alert('Failed to update stock status.')
      }
    } catch {
      alert('Error updating stock status')
    }
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'saree':
        return { bg: '#FDF2F4', text: '#C2596A', border: 'rgba(194, 89, 106, 0.35)' }
      case 'fabric':
        return { bg: '#F0F7F2', text: '#2D6A4F', border: 'rgba(77, 124, 95, 0.35)' }
      case 'chadar':
        return { bg: '#FFF9E6', text: '#996515', border: 'rgba(212, 175, 55, 0.4)' }
      case 'gamcha':
        return { bg: '#FAECE6', text: '#C05634', border: 'rgba(192, 86, 52, 0.35)' }
      case 'lungi':
        return { bg: '#F5F3FF', text: '#6D28D9', border: 'rgba(109, 40, 217, 0.3)' }
      case 'suit-salwar':
        return { bg: '#FDF4F5', text: '#BE185D', border: 'rgba(190, 24, 93, 0.3)' }
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' }
    }
  }

  return (
    <div className="pastel-card" style={{ padding: '28px', background: '#FFFFFF' }}>
      {/* Category Pills Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
          <button
            onClick={() => {
              setActiveCategory('all')
              setActiveType('all')
            }}
            style={{
              padding: '9px 18px',
              borderRadius: '50px',
              border: activeCategory === 'all' ? 'none' : '1px solid rgba(197, 160, 89, 0.3)',
              background: activeCategory === 'all' ? 'linear-gradient(135deg, #B38728 0%, #D4AF37 50%, #C59B27 100%)' : '#FFFFFF',
              color: activeCategory === 'all' ? '#FFFFFF' : '#374151',
              fontWeight: activeCategory === 'all' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeCategory === 'all' ? '0 4px 12px rgba(212, 175, 55, 0.35)' : 'none',
            }}
          >
            All Products
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.slug)
                setActiveType('all')
              }}
              style={{
                padding: '9px 18px',
                borderRadius: '50px',
                border: activeCategory === cat.slug ? 'none' : '1px solid rgba(197, 160, 89, 0.3)',
                background: activeCategory === cat.slug ? 'linear-gradient(135deg, #B38728 0%, #D4AF37 50%, #C59B27 100%)' : '#FFFFFF',
                color: activeCategory === cat.slug ? '#FFFFFF' : '#374151',
                fontWeight: activeCategory === cat.slug ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: activeCategory === cat.slug ? '0 4px 12px rgba(212, 175, 55, 0.35)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className={cat.icon} style={{ fontSize: '11px' }}></i>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Sub-types row if available */}
        {subTypes.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#996515', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Weave Types:
            </span>
            <button
              onClick={() => setActiveType('all')}
              style={{
                padding: '4px 12px',
                borderRadius: '50px',
                border: activeType === 'all' ? '1px solid #D4AF37' : '1px solid #E5E7EB',
                background: activeType === 'all' ? '#FFF9E6' : '#FFFFFF',
                color: activeType === 'all' ? '#996515' : '#6B7280',
                fontSize: '11px',
                fontWeight: activeType === 'all' ? 700 : 500,
                cursor: 'pointer',
              }}
            >
              All Types
            </button>
            {subTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setActiveType(type)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '50px',
                  border: activeType === type ? '1px solid #D4AF37' : '1px solid #E5E7EB',
                  background: activeType === type ? '#FFF9E6' : '#FFFFFF',
                  color: activeType === type ? '#996515' : '#6B7280',
                  fontSize: '11px',
                  fontWeight: activeType === type ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search and Controls Row */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative' }}>
            <i
              className="fas fa-search"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                fontSize: '14px',
              }}
            />
            <input
              type="text"
              placeholder="Search by code (e.g., SAR1001), weave (Desi Silk, 80 LEA), or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                border: '1.5px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                background: '#FAF8F5',
                color: '#111827',
              }}
            />
          </div>
        </div>

        {/* Per Page Selector */}
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(parseInt(e.target.value))
            setCurrentPage(1)
          }}
          style={{
            padding: '12px 14px',
            border: '1.5px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '12px',
            fontSize: '13px',
            cursor: 'pointer',
            background: '#FFFFFF',
            color: '#111827',
            outline: 'none',
          }}
        >
          <option value={15}>15 items / page</option>
          <option value={30}>30 items / page</option>
          <option value={50}>50 items / page</option>
        </select>
      </div>

      {error && (
        <div
          style={{
            padding: '14px 18px',
            background: '#FEF2F2',
            color: '#DC2626',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #FCA5A5',
          }}
        >
          <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
          {error}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#FAF8F5' }}>
              {[
                { label: 'Masterpiece & Image', key: 'description', sortable: true },
                { label: 'Code', key: 'code', sortable: true },
                { label: 'Category & Sub-Type', key: 'category', sortable: true },
                { label: 'Retail Price', key: 'price', sortable: true },
                { label: 'Wholesale B2B', key: 'wholesale_price', sortable: true },
                { label: 'GSM / Weight', key: 'gsm', sortable: false },
                { label: 'Stock', key: 'is_out_of_stock', sortable: true },
                { label: 'Status', key: 'is_active', sortable: true },
                { label: 'Actions', key: 'actions', sortable: false },
              ].map((header) => (
                <th
                  key={header.key}
                  onClick={() => header.sortable && handleSort(header.key)}
                  style={{
                    padding: '14px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#4B5563',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
                    cursor: header.sortable ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {header.label}
                    {header.sortable && (
                      <i
                        className="fas fa-sort"
                        style={{ fontSize: '10px', opacity: sortBy === header.key ? 1 : 0.35, color: '#D4AF37' }}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
                  <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', color: '#D4AF37' }}></i>
                  <div style={{ marginTop: '10px' }}>Loading catalog items...</div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
                  No masterpieces found matching your search.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const badgeStyle = getCategoryColor(product.category)

                return (
                  <tr
                    key={product.id}
                    onMouseEnter={() => setHoveredRow(product.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === product.id ? '#FAF8F5' : 'transparent',
                      borderBottom: '1px solid rgba(197, 160, 89, 0.15)',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {/* Image & Description */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: '#F5EFEB',
                            flexShrink: 0,
                            position: 'relative',
                            border: '1px solid rgba(197, 160, 89, 0.25)',
                          }}
                        >
                          <Image
                            src={product.image_url}
                            alt={product.code}
                            fill
                            sizes="52px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>
                            {product.title || product.description}
                          </div>
                          {product.title && product.description !== product.title && (
                            <div style={{ fontSize: '12px', color: '#6B7280', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {product.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            background: '#FFF9E6',
                            color: '#996515',
                            border: '1px solid rgba(212, 175, 55, 0.45)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                          }}
                        >
                          {product.code}
                        </span>

                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {product.is_on_sale && (
                            <span style={{ background: '#FEE2E2', color: '#B91C1C', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                              SALE
                            </span>
                          )}
                          {product.is_ndd && (
                            <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                              ⚡ NDD
                            </span>
                          )}
                          {product.secondary_image_url && (
                            <span title="Secondary hover image active" style={{ color: '#D4AF37', fontSize: '10px' }}>
                              <i className="fas fa-magic"></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td style={{ padding: '14px 16px' }}>
                      <div>
                        <span
                          style={{
                            background: badgeStyle.bg,
                            color: badgeStyle.text,
                            border: `1px solid ${badgeStyle.border}`,
                            padding: '3px 10px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'inline-block',
                            marginBottom: '4px',
                          }}
                        >
                          {product.category.toUpperCase()}
                        </span>
                        {product.product_type && (
                          <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600 }}>
                            {product.product_type}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Retail Price */}
                    <td style={{ padding: '14px 16px' }}>
                      {product.price ? (
                        <div>
                          {product.compare_at_price && product.compare_at_price > product.price && (
                            <div style={{ textDecoration: 'line-through', fontSize: '11px', color: '#9CA3AF' }}>
                              ₹{product.compare_at_price.toLocaleString('en-IN')}
                            </div>
                          )}
                          <div style={{ fontWeight: 700, fontSize: '14px', color: product.is_on_sale ? '#DC2626' : '#111827' }}>
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
                          Quote basis
                        </span>
                      )}
                    </td>

                    {/* Wholesale Price */}
                    <td style={{ padding: '14px 16px' }}>
                      {product.wholesale_price ? (
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13px', color: '#059669' }}>
                            ₹{product.wholesale_price.toLocaleString('en-IN')}
                          </div>
                          {product.min_wholesale_qty && (
                            <div style={{ fontSize: '10px', color: '#6B7280' }}>
                              Min: {product.min_wholesale_qty}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>—</span>
                      )}
                    </td>

                    {/* GSM / Weight */}
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#4B5563' }}>
                      {product.gsm && (
                        <div>
                          <strong>GSM:</strong> {product.gsm}
                        </div>
                      )}
                      {product.weight && (
                        <div>
                          <strong>Wt:</strong> {product.weight}
                        </div>
                      )}
                      {!product.gsm && !product.weight && <span style={{ color: '#9CA3AF' }}>—</span>}
                    </td>

                    {/* Stock Toggle */}
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleStock(product.id, Boolean(product.is_out_of_stock))}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '50px',
                          border: product.is_out_of_stock ? '1px solid #D1D5DB' : '1px solid #A7F3D0',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: product.is_out_of_stock ? '#F3F4F6' : '#ECFDF5',
                          color: product.is_out_of_stock ? '#4B5563' : '#059669',
                        }}
                      >
                        {product.is_out_of_stock ? '● Sold Out' : '✓ In Stock'}
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleActive(product.id, product.is_active)}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '50px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: product.is_active ? '#ECFDF5' : '#F3F4F6',
                          color: product.is_active ? '#059669' : '#6B7280',
                        }}
                      >
                        {product.is_active ? '● Active' : '○ Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(197, 160, 89, 0.4)',
                            background: '#FFFFFF',
                            color: '#B38728',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          <i className="fas fa-edit" style={{ marginRight: '4px' }}></i>
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product.id, product.code)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            background: '#FEF2F2',
                            color: '#DC2626',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
          <div style={{ fontSize: '13px', color: '#6B7280' }}>
            Page {currentPage} of {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: currentPage <= 1 ? '#F3F4F6' : '#FFFFFF',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '12px',
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: currentPage >= totalPages ? '#F3F4F6' : '#FFFFFF',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                fontSize: '12px',
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
