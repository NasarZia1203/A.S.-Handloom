'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/types'
import CloudinaryUpload from './CloudinaryUpload'

interface ProductFormProps {
  initialValues?: Partial<Product>
  productId?: string
}

export default function ProductForm({ initialValues, productId }: ProductFormProps) {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url || '')
  const [code, setCode] = useState(initialValues?.code || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [category, setCategory] = useState<'saree' | 'fabric'>(
    initialValues?.category || 'saree'
  )
  const [isActive, setIsActive] = useState(initialValues?.is_active ?? true)
  const [sortOrder, setSortOrder] = useState(initialValues?.sort_order ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!imageUrl) {
      setError('Please upload an image.')
      return
    }
    if (!code.trim()) {
      setError('Product code is required.')
      return
    }
    if (!description.trim()) {
      setError('Description is required.')
      return
    }

    setLoading(true)

    try {
      const body = {
        image_url: imageUrl,
        code: code.trim(),
        description: description.trim(),
        category,
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

      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#374151',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
  }

  const groupStyle: React.CSSProperties = {
    marginBottom: '20px',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {error && (
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fecaca',
          }}
        >
          {error}
        </div>
      )}

      <div style={groupStyle}>
        <label style={labelStyle}>Product Image</label>
        <CloudinaryUpload onUpload={setImageUrl} currentImageUrl={imageUrl} />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle} htmlFor="code">
          Product Code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. SAR1001"
          style={inputStyle}
          required
        />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          required
        />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle} htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as 'saree' | 'fabric')}
          style={inputStyle}
        >
          <option value="saree">Saree</option>
          <option value="fabric">Fabric</option>
        </select>
      </div>

      <div style={groupStyle}>
        <label style={labelStyle} htmlFor="sort_order">
          Sort Order
        </label>
        <input
          id="sort_order"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
          style={inputStyle}
        />
      </div>

      <div style={{ ...groupStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          id="is_active"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          style={{ width: '18px', height: '18px' }}
        />
        <label htmlFor="is_active" style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
          Active (visible on public site)
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#800020',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '600',
          fontSize: '16px',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading
          ? 'Saving...'
          : productId
          ? 'Update Product'
          : 'Create Product'}
      </button>
    </form>
  )
}
