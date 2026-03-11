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

  const thStyle: React.CSSProperties = {
    padding: '10px 12px',
    textAlign: 'left',
    borderBottom: '2px solid #e5e7eb',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    verticalAlign: 'middle',
  }

  const btnStyle = (bg: string): React.CSSProperties => ({
    padding: '4px 10px',
    backgroundColor: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    marginRight: '4px',
  })

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Code</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Active</th>
            <th style={thStyle}>Sort</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td
                colSpan={7}
                style={{ ...tdStyle, textAlign: 'center', padding: '32px', color: '#9ca3af' }}
              >
                No products found. Add your first product.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td style={tdStyle}>
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.code}
                    width={60}
                    height={60}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: '#9ca3af',
                    }}
                  >
                    No img
                  </div>
                )}
              </td>
              <td style={{ ...tdStyle, fontWeight: '600' }}>{product.code}</td>
              <td style={{ ...tdStyle, maxWidth: '200px' }}>
                {product.description}
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor:
                      product.category === 'saree' ? '#fef3c7' : '#dbeafe',
                    color:
                      product.category === 'saree' ? '#92400e' : '#1e40af',
                  }}
                >
                  {product.category}
                </span>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() =>
                    handleToggleActive(product.id, product.is_active)
                  }
                  style={{
                    padding: '4px 10px',
                    backgroundColor: product.is_active ? '#10b981' : '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {product.is_active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td style={tdStyle}>{product.sort_order}</td>
              <td style={tdStyle}>
                <button
                  onClick={() =>
                    router.push(`/admin/dashboard/products/${product.id}`)
                  }
                  style={btnStyle('#3b82f6')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={btnStyle('#ef4444')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
