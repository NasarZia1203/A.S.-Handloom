import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748B',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '16px',
            transition: 'color 0.2s ease',
          }}
        >
          <i className="fas fa-arrow-left" style={{ fontSize: '11px', color: '#C5A059' }}></i>
          Back to Artisan Inventory
        </Link>
        <h1
          style={{
            fontSize: 'var(--font-size-xl, 26px)',
            fontFamily: 'var(--font-heading, "Playfair Display", serif)',
            fontWeight: 600,
            color: '#1E293B',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #C5A059 0%, #B76E79 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px -3px rgba(197, 160, 89, 0.4)',
            }}
          >
            <i className="fas fa-plus" style={{ color: 'white', fontSize: '16px' }}></i>
          </div>
          Add New Masterpiece
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
          Register a handcrafted saree or pure artisanal fabric into the A S Handloom Bhagalpur catalog.
        </p>
      </div>
      
      <ProductForm />
    </div>
  )
}
