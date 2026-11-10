'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Failed to sign in. Please verify your email and password.')
      } else {
        setMessage('Signed in successfully! Redirecting...')
        router.refresh()
        window.location.href = '/admin/dashboard'
      }
    } catch (err: any) {
      setMessage(err?.message ?? 'Network error occurred while connecting.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1D 0%, #131E2E 50%, #1B2838 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
      }}
    >
      {/* Background Subtle Weave Motif */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.7,
        }}
      />

      {/* Tussar Gold & Terracotta Radiant Aura */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(183, 110, 121, 0.14) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />

      {/* Left Side - Heritage Branding */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <div
            style={{
              position: 'relative',
              width: '96px',
              height: '96px',
              margin: '0 auto 20px',
              background: '#1C1917',
              borderRadius: '50%',
              padding: '3px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(212, 175, 55, 0.6)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src="/assets/images/linen-galaxy-boutique.png"
                alt="Linen Galaxy Boutique"
                fill
                sizes="96px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              background: 'rgba(197, 160, 89, 0.15)',
              borderRadius: '50px',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              color: '#EFECE6',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <i className="fas fa-lock" style={{ color: '#C5A059' }}></i>
            Management Administration Portal
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", serif)',
              fontSize: '34px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
            }}
          >
            Linen Galaxy
          </h1>
          <p style={{ color: 'rgba(239, 236, 230, 0.7)', fontSize: '14.5px', marginBottom: '28px', lineHeight: 1.6 }}>
            By A S Handloom (Est. 2007). Direct portal for catalog inventory, wholesale pricing, and doorstep retail orders.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '30px' }}>
            {[
              { icon: 'fas fa-boxes', text: 'Catalog & Inventory Control (32+ Weaves)' },
              { icon: 'fas fa-truck-fast', text: 'Online Delivery & Direct Order Processing' },
              { icon: 'fas fa-file-invoice', text: 'Wholesale B2B & Retail Price Management' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 18px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.2), rgba(183, 110, 121, 0.2))',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                  }}
                >
                  <i className={item.icon} style={{ color: '#C5A059', fontSize: '14px' }}></i>
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '13px', fontWeight: 500, textAlign: 'left' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(19, 30, 46, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            padding: '44px 38px',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.65)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#C5A059',
                fontWeight: 700,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Secure Administration
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Playfair Display", serif)',
                fontSize: '26px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Sign In to Lofts
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '13px', margin: 0 }}>
              Enter authenticated proprietor credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '8px',
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  background: focusedField === 'email' 
                    ? 'rgba(197, 160, 89, 0.08)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: focusedField === 'email' 
                    ? '1px solid #C5A059' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.3s ease',
                }}
              >
                <i
                  className="fas fa-envelope"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'email' ? '#C5A059' : 'rgba(255, 255, 255, 0.4)',
                    transition: 'color 0.3s ease',
                  }}
                ></i>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '8px',
                }}
              >
                Password
              </label>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  background: focusedField === 'password' 
                    ? 'rgba(197, 160, 89, 0.08)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: focusedField === 'password' 
                    ? '1px solid #C5A059' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.3s ease',
                }}
              >
                <i
                  className="fas fa-lock"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'password' ? '#C5A059' : 'rgba(255, 255, 255, 0.4)',
                    transition: 'color 0.3s ease',
                  }}
                ></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'linear-gradient(135deg, #C5A059 0%, #B76E79 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: loading ? 'none' : '0 10px 25px -6px rgba(197, 160, 89, 0.45)',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: '20px',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                textAlign: 'center',
                background: message.includes('success') 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                color: message.includes('success') ? '#10b981' : '#ef4444',
                border: message.includes('success') 
                  ? '1px solid rgba(16, 185, 129, 0.2)' 
                  : '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <i 
                className={message.includes('success') ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} 
                style={{ marginRight: '8px' }}
              ></i>
              {message}
            </div>
          )}

          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '13px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.3s ease',
              }}
            >
              <i className="fas fa-arrow-left"></i>
              Back to Website
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
