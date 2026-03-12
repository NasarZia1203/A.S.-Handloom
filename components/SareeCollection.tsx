'use client'

import useSWR from 'swr'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SareeCollection() {
  const { data, isLoading } = useSWR<{ products: Product[], total: number }>('/api/products?category=saree&limit=10', fetcher)
  
  const displayedSarees = data?.products || []
  const totalSarees = data?.total || 0

  return (
    <section id="sarees" className="section collections animate">
      <div className="container-image">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E91E63'
            }}
          >
            <i className="fas fa-star"></i>
            Premium Collection
          </div>
          <h2 className="section-title-saree" style={{ marginBottom: '16px' }}>
            Saree Collection
          </h2>
          <p style={{
            maxWidth: '600px',
            margin: '24px auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Discover our exquisite range of handwoven sarees, each piece telling a unique story of tradition and elegance
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: 'fas fa-palette', label: 'Unique Designs', value: `${totalSarees}+` },
            { icon: 'fas fa-gem', label: 'Fabric Types', value: '3' },
            { icon: 'fas fa-award', label: 'Quality Assured', value: '100%' }
          ].map((stat, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E91E63'
              }}>
                <i className={stat.icon}></i>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-text)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div style={{
            display: 'flex',
            gap: '20px',
            minHeight: '420px',
            padding: '0 24px'
          }}>
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                  borderRadius: '24px',
                  animation: 'shimmer 1.5s infinite'
                }}
              />
            ))}
          </div>
        ) : (
          /* Product Carousel */
          <div className="collection-carousel" style={{ padding: '0 24px' }}>
            <ProductCarousel items={displayedSarees} variant="saree" />
          </div>
        )}

        {/* See All Button */}
        {totalSarees > 10 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/products/sarees"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 25px -8px rgba(233, 30, 99, 0.4)'
              }}
            >
              View All Sarees
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '14px'
              }}>
                {totalSarees}
              </span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
