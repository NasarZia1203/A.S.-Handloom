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
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputContainerStyle = (fieldName: string): React.CSSProperties => ({
    borderRadius: '12px',
    border: focusedField === fieldName 
      ? '2px solid #E91E63'
      : '1px solid #e2e8f0',
    background: focusedField === fieldName 
      ? 'rgba(233, 30, 99, 0.02)'
      : '#fafafa',
    transition: 'all 0.3s ease',
  })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: 'transparent',
    outline: 'none',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '700px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Form Header */}
      <div
        style={{
          padding: '24px 32px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.03), rgba(255, 87, 34, 0.03))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className={productId ? 'fas fa-edit' : 'fas fa-plus'} style={{ color: 'white', fontSize: '16px' }}></i>
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {productId ? 'Edit Product' : 'New Product'}
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              {productId ? 'Update product details' : 'Add a new product to your catalog'}
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
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
              color: '#dc2626',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
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
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            <i className="fas fa-image" style={{ color: '#E91E63', fontSize: '12px' }}></i>
            Product Image
          </label>
          <CloudinaryUpload onUpload={setImageUrl} currentImageUrl={imageUrl} />
        </div>

        {/* Product Code */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            <i className="fas fa-barcode" style={{ color: '#E91E63', fontSize: '12px' }}></i>
            Product Code
          </label>
          <div style={inputContainerStyle('code')}>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onFocus={() => setFocusedField('code')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. SAR1001"
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            <i className="fas fa-align-left" style={{ color: '#E91E63', fontSize: '12px' }}></i>
            Description
          </label>
          <div style={inputContainerStyle('description')}>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter product description"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
              required
            />
          </div>
        </div>

        {/* Category & Sort Order Row */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
              }}
            >
              <i className="fas fa-tag" style={{ color: '#E91E63', fontSize: '12px' }}></i>
              Category
            </label>
            <div style={inputContainerStyle('category')}>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'saree' | 'fabric')}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="saree">Saree</option>
                <option value="fabric">Fabric</option>
              </select>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
              }}
            >
              <i className="fas fa-sort-numeric-up" style={{ color: '#E91E63', fontSize: '12px' }}></i>
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
        </div>

        {/* Active Status */}
        <div
          style={{
            marginBottom: '32px',
            padding: '18px 20px',
            background: isActive 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.04))'
              : '#fafafa',
            borderRadius: '12px',
            border: isActive 
              ? '1px solid rgba(16, 185, 129, 0.2)'
              : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => setIsActive(!isActive)}
        >
          <div
            style={{
              width: '48px',
              height: '26px',
              borderRadius: '13px',
              background: isActive 
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : '#cbd5e1',
              position: 'relative',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: isActive ? '25px' : '3px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              Product Status
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {isActive ? 'Visible on public site' : 'Hidden from public site'}
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600,
              background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
              color: isActive ? '#059669' : '#64748b',
            }}
          >
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            background: loading 
              ? '#e2e8f0' 
              : 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
            color: loading ? '#94a3b8' : '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: loading ? 'none' : '0 10px 30px -10px rgba(233, 30, 99, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(148, 163, 184, 0.3)',
                  borderTopColor: '#94a3b8',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              Saving...
            </>
          ) : (
            <>
              <i className={productId ? 'fas fa-save' : 'fas fa-plus-circle'}></i>
              {productId ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}
