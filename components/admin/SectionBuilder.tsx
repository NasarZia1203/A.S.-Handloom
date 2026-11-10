'use client'

import { useState, useEffect } from 'react'
import type { HomepageSectionConfig } from '@/lib/types'

export default function SectionBuilder() {
  const [sections, setSections] = useState<HomepageSectionConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        if (data.homepage_sections) {
          setSections(data.homepage_sections)
        }
      }
    } catch (err) {
      console.error('Failed to load sections:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1
    if (newIdx < 0 || newIdx >= sections.length) return

    const reordered = [...sections]
    const temp = reordered[index]
    reordered[index] = reordered[newIdx]
    reordered[newIdx] = temp

    // Update sort_order index
    const updated = reordered.map((sec, idx) => ({ ...sec, sort_order: idx + 1 }))
    setSections(updated)
  }

  const updateSectionField = (id: string, field: 'heading' | 'subheading' | 'is_enabled', value: any) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homepage_sections: sections }),
      })

      if (res.ok) {
        setMessage('Website section placements & custom headings saved successfully!')
        setTimeout(() => setMessage(null), 4000)
      } else {
        alert('Failed to save section changes')
      }
    } catch {
      alert('Error connecting to server')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '28px', color: '#D4AF37' }}></i>
        <div style={{ marginTop: '12px' }}>Loading website layout sections...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#111827', margin: 0 }}>
            Modular Homepage Section Builder
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Customize section headings, subheadings, toggle visibility, and re-order their placement on the website.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-pastel-primary"
          style={{ padding: '12px 26px', fontSize: '0.92rem' }}
        >
          <i className="fas fa-save"></i>
          <span>{saving ? 'Saving Placements...' : 'Save Website Layout'}</span>
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

      {/* Sections List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="pastel-card"
            style={{
              padding: '24px 28px',
              borderRadius: '20px',
              background: sec.is_enabled ? '#FFFFFF' : '#F9FAFB',
              border: sec.is_enabled ? '1.5px solid rgba(197, 160, 89, 0.28)' : '1px dashed #D1D5DB',
              opacity: sec.is_enabled ? 1 : 0.7,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Top row: Placement Number, Order Buttons, Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFF9E6',
                    color: '#B38728',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  #{idx + 1}
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                    Section Identifier: <code style={{ color: '#B38728', background: '#F5EFEB', padding: '2px 8px', borderRadius: '4px' }}>{sec.id}</code>
                  </div>
                  {sec.category_slug && (
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>
                      Linked Category: <strong>{sec.category_slug}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, 'up')}
                  title="Move section up"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    background: idx === 0 ? '#F3F4F6' : '#FFFFFF',
                    color: idx === 0 ? '#9CA3AF' : '#111827',
                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <i className="fas fa-arrow-up"></i>
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => moveSection(idx, 'down')}
                  title="Move section down"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    background: idx === sections.length - 1 ? '#F3F4F6' : '#FFFFFF',
                    color: idx === sections.length - 1 ? '#9CA3AF' : '#111827',
                    cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <i className="fas fa-arrow-down"></i>
                </button>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => updateSectionField(sec.id, 'is_enabled', !sec.is_enabled)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: sec.is_enabled ? '#ECFDF5' : '#F3F4F6',
                    color: sec.is_enabled ? '#059669' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className={sec.is_enabled ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                  <span>{sec.is_enabled ? 'Active on Site' : 'Hidden'}</span>
                </button>
              </div>
            </div>

            {/* Editable Heading & Subheading */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Section Heading
                </label>
                <input
                  type="text"
                  value={sec.heading}
                  onChange={(e) => updateSectionField(sec.id, 'heading', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(197, 160, 89, 0.3)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Section Subheading / Tagline
                </label>
                <input
                  type="text"
                  value={sec.subheading}
                  onChange={(e) => updateSectionField(sec.id, 'subheading', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(197, 160, 89, 0.3)',
                    fontSize: '13px',
                    color: '#4B5563',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
