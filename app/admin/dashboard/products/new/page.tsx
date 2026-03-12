import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'

export default function NewProductPage() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '13px',
            marginBottom: '16px',
            transition: 'color 0.2s ease',
          }}
        >
          <i className="fas fa-arrow-left" style={{ fontSize: '11px' }}></i>
          Back to Dashboard
        </Link>
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
            <i className="fas fa-plus" style={{ color: 'white', fontSize: '16px' }}></i>
          </div>
          Add New Product
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Fill in the details below to add a new product to your catalog.
        </p>
      </div>
      
      <ProductForm />
    </div>
  )
}
