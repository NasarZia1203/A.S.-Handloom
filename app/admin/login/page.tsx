'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Signed in successfully.')
        router.push('/admin/dashboard')
      }
    } catch (err: any) {
      setMessage(err?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E91E63' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Left Side - Branding */}
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
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 20px 40px -10px rgba(233, 30, 99, 0.4)',
            }}
          >
            <i className="fas fa-store" style={{ fontSize: '32px', color: 'white' }}></i>
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '36px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 50%, #FF9800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
            }}
          >
            A S Handloom
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '16px', marginBottom: '32px' }}>
            Admin Control Center
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>
            {[
              { icon: 'fas fa-box', text: 'Manage Products' },
              { icon: 'fas fa-chart-line', text: 'Track Performance' },
              { icon: 'fas fa-cog', text: 'Configure Settings' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.2), rgba(255, 87, 34, 0.2))',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className={item.icon} style={{ color: '#FF5722', fontSize: '14px' }}></i>
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>{item.text}</span>
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
            maxWidth: '420px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '48px 40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '8px',
              }}
            >
              Welcome Back
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.7)',
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
                    ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 87, 34, 0.1))' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: focusedField === 'email' 
                    ? '1px solid rgba(233, 30, 99, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
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
                    color: focusedField === 'email' ? '#E91E63' : 'rgba(255, 255, 255, 0.4)',
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
                    color: 'white',
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
                  color: 'rgba(255, 255, 255, 0.7)',
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
                    ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 87, 34, 0.1))' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: focusedField === 'password' 
                    ? '1px solid rgba(233, 30, 99, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
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
                    color: focusedField === 'password' ? '#E91E63' : 'rgba(255, 255, 255, 0.4)',
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
                    color: 'white',
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
                  : 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: loading ? 'none' : '0 10px 30px -10px rgba(233, 30, 99, 0.5)',
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
