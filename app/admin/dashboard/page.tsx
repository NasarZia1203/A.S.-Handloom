import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductTable from '@/components/admin/ProductTable'

export default async function DashboardPage() {
  const supabase = await createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  const productList = (products as Product[]) || []
  const totalProducts = productList.length
  const activeProducts = productList.filter(p => p.is_active).length
  const sareeCount = productList.filter(p => p.category === 'saree').length
  const fabricCount = productList.filter(p => p.category === 'fabric').length

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="fas fa-th-large" style={{ color: 'white', fontSize: '16px' }}></i>
          </div>
          Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Welcome back! Manage your products and inventory here.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {[
          { 
            label: 'Total Products', 
            value: totalProducts, 
            icon: 'fas fa-box', 
            color: '#E91E63',
            bg: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05))',
            border: 'rgba(233, 30, 99, 0.2)',
          },
          { 
            label: 'Active Products', 
            value: activeProducts, 
            icon: 'fas fa-check-circle', 
            color: '#10b981',
            bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
            border: 'rgba(16, 185, 129, 0.2)',
          },
          { 
            label: 'Sarees', 
            value: sareeCount, 
            icon: 'fas fa-tshirt', 
            color: '#FF5722',
            bg: 'linear-gradient(135deg, rgba(255, 87, 34, 0.1), rgba(255, 87, 34, 0.05))',
            border: 'rgba(255, 87, 34, 0.2)',
          },
          { 
            label: 'Fabrics', 
            value: fabricCount, 
            icon: 'fas fa-scroll', 
            color: '#8b5cf6',
            bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))',
            border: 'rgba(139, 92, 246, 0.2)',
          },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${stat.border}`,
              boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: stat.bg,
                borderRadius: '50%',
                opacity: 0.5,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    background: stat.bg,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className={stat.icon} style={{ color: stat.color, fontSize: '16px' }}></i>
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1e293b',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fas fa-box" style={{ color: '#E91E63', fontSize: '14px' }}></i>
              All Products
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Manage your product catalog
            </p>
          </div>
          <Link
            href="/admin/dashboard/products/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 8px 20px -6px rgba(233, 30, 99, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            <i className="fas fa-plus"></i>
            Add Product
          </Link>
        </div>

        {/* Table Container */}
        <div style={{ padding: '0' }}>
          <ProductTable initialProducts={productList} />
        </div>
      </div>
    </div>
  )
}
