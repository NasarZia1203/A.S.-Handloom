import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF0EA 100%)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          background: 'white',
          padding: '48px 32px',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f1f5f9',
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(184, 150, 104, 0.3)',
            border: '2px solid rgba(212, 175, 55, 0.5)',
          }}
        >
          <Image
            src="/assets/images/logo.png"
            alt="Linen Galaxy Logo"
            width={68}
            height={68}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1A1A2E',
            marginBottom: '12px',
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: '#64748B',
            fontSize: '15px',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          The page you are looking for does not exist or has been moved. Discover our exquisite handloom sarees and fabrics below.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/"
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
            }}
          >
            <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
            Return to Home
          </Link>
          <Link
            href="/products"
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#1A1A2E',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Explore All Collections
          </Link>
          <Link
            href="/products?category=fabric"
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#1A1A2E',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Explore Fabrics
          </Link>
        </div>
      </div>
    </div>
  )
}
