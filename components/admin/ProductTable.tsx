'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Product } from '@/lib/types'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  
  // Filter and Search
  const [activeTab, setActiveTab] = useState<'all' | 'saree' | 'fabric'>('all')
  const [search, setSearch] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage, setPerPage] = useState(10)
  
  // Sorting
  const [sortBy, setSortBy] = useState('sort_order')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  const router = useRouter()

  // Fetch products with filters
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
        ...(activeTab !== 'all' && { category: activeTab }),
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
  }, [currentPage, perPage, activeTab, search, sortBy, sortOrder])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when filters change
  }, [activeTab, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchProducts()
      } else {
        alert('Failed to delete product.')
      }
    } catch (err) {
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
        alert('Failed to update product.')
      }
    } catch (err) {
      alert('Error updating product')
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

  const tabs = [
    { value: 'all' as const, label: 'All Products' },
    { value: 'saree' as const, label: '👗 Sarees' },
    { value: 'fabric' as const, label: '📋 Fabrics' },
  ]

  return (
    <div>
      {/* Tabs and Controls */}
      <div style={{ marginBottom: '24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                padding: '10px 18px',
                background: activeTab === tab.value
                  ? 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)'
                  : 'transparent',
                color: activeTab === tab.value ? 'white' : '#64748b',
                border: activeTab === tab.value
                  ? 'none'
                  : '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.value ? 600 : 500,
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Controls Row */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <i
                className="fas fa-search"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                  fontSize: '14px',
                }}
              />
              <input
                type="text"
                placeholder="Search by code or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#E91E63'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233, 30, 99, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.boxShadow = 'none'
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
              padding: '10px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              background: 'white',
            }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {error && (
        <div
          style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
            color: '#dc2626',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
          {error}
        </div>
      )}

      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[
                { label: 'Product', key: 'description', sortable: true },
                { label: 'Code', key: 'code', sortable: true },
                { label: 'Category', key: 'category', sortable: true },
                { label: 'Status', key: 'is_active', sortable: true },
                { label: 'Sort', key: 'sort_order', sortable: true },
                { label: 'Actions', key: 'actions', sortable: false },
              ].map((header) => (
                <th
                  key={header.key}
                  onClick={() => header.sortable && handleSort(header.key)}
                  style={{
                    padding: '14px 20px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: header.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {header.label}
                    {header.sortable && (
                      <i
                        className={`fas fa-arrow-${sortBy === header.key ? (sortOrder === 'asc' ? 'up' : 'down') : 'down'}`}
                        style={{
                          fontSize: '10px',
                          opacity: sortBy === header.key ? 1 : 0.3,
                          transition: 'all 0.2s ease',
                        }}
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
              <td
                colSpan={6}
                style={{
                  textAlign: 'center',
                  padding: '60px 32px',
                  color: '#94a3b8',
                }}
              >
                <div style={{ animation: 'spin 1s linear infinite' }}>
                  <i className="fas fa-spinner" style={{ fontSize: '24px' }}></i>
                </div>
                <div style={{ marginTop: '12px' }}>Loading products...</div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: 'center',
                  padding: '60px 32px',
                  color: '#94a3b8',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05))',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <i className="fas fa-box-open" style={{ fontSize: '24px', color: '#E91E63' }}></i>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  No products found
                </div>
                <div style={{ fontSize: '14px' }}>
                  {search ? 'Try adjusting your search' : 'Add your first product to get started'}
                </div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
            <tr
              key={product.id}
              onMouseEnter={() => setHoveredRow(product.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                background: hoveredRow === product.id ? '#fafafa' : 'white',
                transition: 'background 0.2s ease',
              }}
            >
              {/* Product with Image */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {product.image_url ? (
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid #f1f5f9',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={product.image_url}
                        alt={product.code}
                        width={56}
                        height={56}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-image" style={{ color: '#cbd5e1', fontSize: '18px' }}></i>
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#475569',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px',
                      }}
                    >
                      {product.description || 'No description'}
                    </div>
                  </div>
                </div>
              </td>

              {/* Code */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <span
                  style={{
                    padding: '6px 12px',
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.08), rgba(255, 87, 34, 0.08))',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#E91E63',
                    fontFamily: 'monospace',
                  }}
                >
                  {product.code}
                </span>
              </td>

              {/* Category */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    background: product.category === 'saree' 
                      ? 'linear-gradient(135deg, #fef3c7, #fef9c3)'
                      : 'linear-gradient(135deg, #dbeafe, #e0f2fe)',
                    color: product.category === 'saree' ? '#b45309' : '#1d4ed8',
                    border: product.category === 'saree' 
                      ? '1px solid #fcd34d'
                      : '1px solid #93c5fd',
                  }}
                >
                  {product.category}
                </span>
              </td>

              {/* Status */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleToggleActive(product.id, product.is_active)}
                  style={{
                    padding: '6px 14px',
                    background: product.is_active
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
                      : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                    color: product.is_active ? '#059669' : '#dc2626',
                    border: product.is_active
                      ? '1px solid rgba(16, 185, 129, 0.3)'
                      : '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: product.is_active ? '#10b981' : '#ef4444',
                    }}
                  />
                  {product.is_active ? 'Active' : 'Inactive'}
                </button>
              </td>

              {/* Sort */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    background: '#f1f5f9',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  {product.sort_order}
                </span>
              </td>

              {/* Actions */}
              <td style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}
                    style={{
                      padding: '8px 14px',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 10px -4px rgba(59, 130, 246, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <i className="fas fa-edit" style={{ fontSize: '11px' }}></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '8px 14px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 10px -4px rgba(239, 68, 68, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <i className="fas fa-trash" style={{ fontSize: '11px' }}></i>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '13px', color: '#64748b' }}>
          Page <span style={{ fontWeight: 600, color: '#1e293b' }}>{currentPage}</span> of{' '}
          <span style={{ fontWeight: 600, color: '#1e293b' }}>{totalPages}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              background: currentPage === 1 ? '#f1f5f9' : 'white',
              color: currentPage === 1 ? '#cbd5e1' : '#1e293b',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              const diff = Math.abs(page - currentPage)
              return diff <= 2 || page === 1 || page === totalPages
            })
            .map((page, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== page - 1) {
                return (
                  <div key={`gap-${page}`} style={{ display: 'flex', alignItems: 'center' }}>
                    ...
                  </div>
                )
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: '8px 12px',
                    background: currentPage === page
                      ? 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)'
                      : 'white',
                    color: currentPage === page ? 'white' : '#1e293b',
                    border: currentPage === page ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    minWidth: '36px',
                  }}
                >
                  {page}
                </button>
              )
            })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              background: currentPage === totalPages ? '#f1f5f9' : 'white',
              color: currentPage === totalPages ? '#cbd5e1' : '#1e293b',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    )}

    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)
}
