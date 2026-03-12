'use client'

import { useState, type FormEvent, useEffect, useRef } from 'react'

const contactInfo = [
  {
    icon: 'fas fa-phone',
    title: 'Phone',
    details: ['+91-9798141494'],
    link: 'tel:+919798141494',
    color: '#E91E63'
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    details: ['ashandloombgp@gmail.com'],
    link: 'mailto:ashandloombgp@gmail.com',
    color: '#FF5722'
  },
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    details: ['+91-9798141494'],
    link: 'https://wa.me/919798141494',
    color: '#25D366'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Address',
    details: ['85 M T N Ghosh Road', 'Hasnabad, Champanagar', 'Bhagalpur, Bihar'],
    link: 'https://maps.app.goo.gl/hYaGfcFaaA2Jhzus5',
    color: '#9C27B0'
  }
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hello! I'm ${name}.\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
    const whatsappUrl = `https://wa.me/919798141494?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            <i className="fas fa-envelope"></i>
            Get in Touch
          </div>
          <h2 className="section-title-contact" style={{ marginBottom: '16px' }}>
            Contact Us
          </h2>
          <p style={{
            maxWidth: '600px',
            margin: '24px auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Have questions about our products? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Cards */}
          <div 
            className="contact-info"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.6s ease 0.1s'
            }}
          >
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-card"
                style={{
                  textDecoration: 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease ${0.1 + index * 0.1}s`
                }}
              >
                <div 
                  className="contact-icon"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                    boxShadow: `0 8px 20px -8px ${item.color}66`
                  }}
                >
                  <i className={item.icon}></i>
                </div>
                <div className="contact-details">
                  <h4>{item.title}</h4>
                  {item.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
                <div style={{
                  marginLeft: 'auto',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--color-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  transition: 'all 0.25s ease'
                }}>
                  <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                </div>
              </a>
            ))}

            {/* Business Hours */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05) 0%, rgba(255, 152, 0, 0.05) 100%)',
              padding: '20px 24px',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              marginTop: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <i className="fas fa-clock" style={{ color: '#E91E63' }}></i>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Business Hours</span>
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p style={{ margin: 0 }}>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="contact-form"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.6s ease 0.2s'
            }}
          >
            {/* Form Header */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 700, 
                marginBottom: '8px',
                fontFamily: 'var(--font-family-body)'
              }}>
                Send us a Message
              </h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '14px',
                margin: 0
              }}>
                Fill out the form below and we will get back to you via WhatsApp
              </p>
            </div>

            {/* Success Message */}
            {submitted && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: 'white',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  animation: 'slideIn 0.3s ease'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <span>Thank you! You have been redirected to WhatsApp.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user" style={{ marginRight: '8px', color: '#E91E63', fontSize: '12px' }}></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="phone" className="form-label">
                    <i className="fas fa-phone" style={{ marginRight: '8px', color: '#E91E63', fontSize: '12px' }}></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#E91E63', fontSize: '12px' }}></i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <i className="fas fa-comment" style={{ marginRight: '8px', color: '#E91E63', fontSize: '12px' }}></i>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  rows={5}
                  placeholder="Tell us about what you're looking for..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="form-submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                Send via WhatsApp
                <i className="fas fa-arrow-right" style={{ fontSize: '14px' }}></i>
              </button>
            </form>

            {/* Trust Badges */}
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: 'fas fa-shield-alt', text: 'Secure' },
                { icon: 'fas fa-bolt', text: 'Quick Response' },
                { icon: 'fas fa-headset', text: '24/7 Support' }
              ].map((badge, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '13px'
                  }}
                >
                  <i className={badge.icon} style={{ color: '#E91E63' }}></i>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
