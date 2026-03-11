'use client'

import { useEffect, useRef, useCallback } from 'react'
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
      <button
        type="button"
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
        }}
      >
        <i className="fas fa-cloud-upload-alt" style={{ marginRight: '8px' }}></i>
        Upload Image
      </button>
      {currentImageUrl && (
        <div style={{ marginTop: '12px' }}>
          <Image
            src={currentImageUrl}
            alt="Product preview"
            width={120}
            height={120}
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #e5e7eb',
            }}
          />
        </div>
      )}
    </div>
  )
}
