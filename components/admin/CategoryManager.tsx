'use client'

import { useState, useEffect } from 'react'
import type { ProductCategory } from '@/lib/types'

export default function CategoryManager() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [newTypeName, setNewTypeName] = useState<{ [catId: string]: string }>({})
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategorySlug, setNewCategorySlug] = useState('')
  const [newCategoryDesc, setNewCategoryDesc] = useState('')
  const [newCategoryIcon, setNewCategoryIcon] = useState('fas fa-tag')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const loadCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Failed to load categories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAddType = async (categoryId: string) => {
    const typeName = newTypeName[categoryId]?.trim()
    if (!typeName) return

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-type',
          categoryId,
          newType: typeName,
        }),
      })

      if (res.ok) {
        setNewTypeName((prev) => ({ ...prev, [categoryId]: '' }))
        await loadCategories()
        setMessage(`Added new type "${typeName}" successfully!`)
        setTimeout(() => setMessage(null), 3000)
      }
    } catch {
      alert('Failed to add type')
    }
  }

  const handleRemoveType = async (categoryId: string, typeToRemove: string) => {
    if (!confirm(`Are you sure you want to remove "${typeToRemove}" from this category?`)) return

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'remove-type',
          categoryId,
          typeToRemove,
        }),
      })

      if (res.ok) {
        await loadCategories()
        setMessage(`Removed type "${typeToRemove}" successfully!`)
        setTimeout(() => setMessage(null), 3000)
      }
    } catch {
      alert('Failed to remove type')
    }
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName || !newCategorySlug) return

    setSaving(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCategoryName,
          slug: newCategorySlug,
          description: newCategoryDesc,
          icon: newCategoryIcon,
          types: [],
        }),
      })

      if (res.ok) {
        setShowAddCategoryModal(false)
        setNewCategoryName('')
        setNewCategorySlug('')
        setNewCategoryDesc('')
        await loadCategories()
        setMessage('New category created successfully!')
        setTimeout(() => setMessage(null), 3000)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to create category')
      }
    } catch {
      alert('Error creating category')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"? Existing products under this category will remain.`)) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await loadCategories()
        setMessage(`Deleted category "${name}"`)
        setTimeout(() => setMessage(null), 3000)
      }
    } catch {
      alert('Failed to delete category')
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '28px', color: '#D4AF37' }}></i>
        <div style={{ marginTop: '12px' }}>Loading categories & weave types...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#111827', margin: 0 }}>
            Categories & Sub-Types Architecture
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Manage product categories (Sarees, Fabrics, Chadars, Suits, Gamchas, Lungis) and add specific weave types.
          </p>
        </div>

        <button
          onClick={() => setShowAddCategoryModal(true)}
          className="btn-pastel-primary"
          style={{ padding: '12px 24px', fontSize: '0.88rem' }}
        >
          <i className="fas fa-folder-plus"></i>
          <span>Add New Category</span>
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '12px',
            background: '#F0F7F2',
            border: '1.5px solid rgba(45, 106, 79, 0.3)',
            color: '#2D6A4F',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
            fontWeight: 600,
          }}
        >
          <i className="fas fa-check-circle"></i>
          <span>{message}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '26px' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="pastel-card"
            style={{
              padding: '28px',
              borderRadius: '24px',
              background: '#FFFFFF',
              border: '1.5px solid rgba(197, 160, 89, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#FFF9E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#D4AF37',
                      fontSize: '18px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <i className={cat.icon || 'fas fa-tag'}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace' }}>
                      slug: {cat.slug}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  title="Delete category"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '6px',
                    opacity: 0.6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5, marginBottom: '20px' }}>
                {cat.description || 'No description provided.'}
              </p>

              {/* Sub-types chips */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#996515', marginBottom: '10px' }}>
                  Weave Types ({cat.types.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.types.map((type, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '50px',
                        background: '#FAF8F5',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                      }}
                    >
                      <span>{type}</span>
                      <button
                        onClick={() => handleRemoveType(cat.id, type)}
                        title={`Remove ${type}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          fontSize: '10px',
                          padding: '0 2px',
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                  {cat.types.length === 0 && (
                    <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
                      No types added yet. Add one below.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Add Type Input Form */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. Pure Desi Silk / 80 LEA"
                  value={newTypeName[cat.id] || ''}
                  onChange={(e) => setNewTypeName({ ...newTypeName, [cat.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddType(cat.id)
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                    fontSize: '13px',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />
                <button
                  onClick={() => handleAddType(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: '#B38728',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div
          onClick={() => setShowAddCategoryModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(17, 24, 39, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '1.5px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                Create New Category
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#9CA3AF', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurta & Pajama / Kaftan"
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value)
                    if (!newCategorySlug) {
                      setNewCategorySlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    outline: 'none',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Category Slug * (URL identifier)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kurta-pajama"
                  value={newCategorySlug}
                  onChange={(e) => setNewCategorySlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    outline: 'none',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  FontAwesome Icon Class
                </label>
                <input
                  type="text"
                  placeholder="e.g. fas fa-tshirt, fas fa-scroll, fas fa-cut"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    outline: 'none',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of weaves and collections in this category"
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    outline: 'none',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    background: '#FFFFFF',
                    color: '#374151',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-pastel-primary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                  }}
                >
                  {saving ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
