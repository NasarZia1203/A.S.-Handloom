'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Product } from '@/lib/types'

interface ProductTableProps {
  initialProducts: Product[]
}

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } else {
      alert('Failed to delete product.')
    }
  }

  const handleToggleActive = async (id: string, currentlyActive: boolean) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !currentlyActive }),
    })
    if (res.ok) {
      const updated = await res.json()
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      )
    } else {
      alert('Failed to update product.')
    }
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            {['Product', 'Code', 'Category', 'Status', 'Sort', 'Actions'].map((header) => (
              <th
                key={header}
                style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
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
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 87, 34, 0.1))',
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
                  No products yet
                </div>
                <div style={{ fontSize: '14px' }}>Add your first product to get started</div>
              </td>
            </tr>
          )}
          {products.map((product) => (
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
          ))}
        </tbody>
      </table>
    </div>
  )
}
