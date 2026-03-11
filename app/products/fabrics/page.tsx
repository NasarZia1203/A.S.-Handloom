'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/lib/types'

export default function AllFabricsPage() {
  const [fabrics, setFabrics] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFabrics = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'fabric')
        .eq('is_active', true)
        .order('sort_order')

      setFabrics((data as Product[]) || [])
      setLoading(false)
    }

    fetchFabrics()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <p style={{ fontSize: '18px', color: '#666' }}>Loading fabrics...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginBottom: '24px',
            color: 'var(--color-primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          ← Back to Home
        </Link>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#000',
            textAlign: 'center',
          }}
        >
          All Fabrics
        </h1>

        {fabrics.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#666',
              padding: '40px',
            }}
          >
            No fabrics available at the moment.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {fabrics.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    paddingBottom: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#e9ecef',
                  }}
                >
                  <img
                    src={product.image_url}
                    alt={product.description}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <div
                    style={{
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    {product.code}
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#333',
                      lineHeight: '1.4',
                      margin: 0,
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
