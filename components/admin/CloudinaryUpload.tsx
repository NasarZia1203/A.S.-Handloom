'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    cloudinary: any
  }
}

interface CloudinaryUploadProps {
  onUpload: (url: string) => void
  currentImageUrl?: string
}

export default function CloudinaryUpload({
  onUpload,
  currentImageUrl,
}: CloudinaryUploadProps) {
  const scriptLoaded = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    if (typeof window !== 'undefined' && window.cloudinary) {
      scriptLoaded.current = true
      return
    }

    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/global/all.js'
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
    }
    document.body.appendChild(script)
  }, [])

  const handleClick = useCallback(() => {
    if (!window.cloudinary) {
      alert('Upload widget is still loading. Please try again.')
      return
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        folder: 'ashandloom/products',
        resourceType: 'image',
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onUpload(result.info.secure_url)
        }
      }
    )

    widget.open()
  }, [onUpload])

  return (
    <div>
      {currentImageUrl ? (
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '140px',
              height: '140px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid #f1f5f9',
              boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Image
              src={currentImageUrl}
              alt="Product preview"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
              }}
            />
            <button
              type="button"
              onClick={handleClick}
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 10px -2px rgba(0, 0, 0, 0.2)',
              }}
            >
              <i className="fas fa-sync-alt" style={{ fontSize: '10px' }}></i>
              Change
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                padding: '14px 16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i className="fas fa-check" style={{ color: '#10b981', fontSize: '14px' }}></i>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#059669' }}>
                  Image uploaded
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Click image to change
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={() => setIsDragging(false)}
          style={{
            padding: '36px 28px',
            borderRadius: '16px',
            border: isDragging 
              ? '2px dashed #C5A059'
              : '2px dashed #E2D9CC',
            background: isDragging 
              ? 'rgba(197, 160, 89, 0.06)'
              : '#FAFAF7',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.15), rgba(183, 110, 121, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              border: '1px solid rgba(197, 160, 89, 0.3)',
            }}
          >
            <i
              className="fas fa-cloud-upload-alt"
              style={{
                fontSize: '26px',
                color: '#C5A059',
              }}
            ></i>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>
            Click to upload product image
          </div>
          <div style={{ fontSize: '13px', color: '#64748B' }}>
            or drag & drop via Cloudinary CDN
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '10px' }}>
            Supports high-res PNG, JPG, WebP up to 10MB
          </div>
        </div>
      )}
    </div>
  )
}
