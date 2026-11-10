'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
    // If it's a Next.js ChunkLoadError caused by browser caching old deployment chunks, automatically reload
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('ChunkLoadError') ||
      (error as any)?.digest?.includes('ChunkLoadError')

    if (isChunkError && typeof window !== 'undefined') {
      console.warn('ChunkLoadError detected — refreshing page to load fresh assets...')
      window.location.reload()
    }
  }, [error])

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
          maxWidth: '520px',
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
            width: '64px',
            height: '64px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'rgba(233, 30, 99, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E91E63',
            fontSize: '28px',
          }}
        >
          <i className="fas fa-exclamation-triangle"></i>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1A1A2E',
            marginBottom: '12px',
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            color: '#64748B',
            fontSize: '15px',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
            }}
          >
            <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
            Try Again
          </button>
          <Link
            href="/"
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
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
