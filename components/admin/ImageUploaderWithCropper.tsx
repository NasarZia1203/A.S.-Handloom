'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, ChangeEvent } from 'react'
import ImageCropperModal, { AspectRatioType } from './ImageCropperModal'

export interface ImagePreset {
  label: string
  url: string
}

interface ImageUploaderWithCropperProps {
  value: string
  onChange: (url: string) => void
  label?: string
  description?: string
  initialAspectRatio?: AspectRatioType
  enableCircleMask?: boolean
  defaultCirclePreview?: boolean
  presets?: ImagePreset[]
  uploadFolder?: string
}

export default function ImageUploaderWithCropper({
  value,
  onChange,
  label = 'Shop Photo / Showcase Image',
  description = 'Upload a high-quality photo from your device or crop and adjust existing image dimensions.',
  initialAspectRatio = '4:3',
  enableCircleMask = true,
  defaultCirclePreview = false,
  presets = [],
  uploadFolder = 'ashandloom/outlets',
}: ImageUploaderWithCropperProps) {
  const [cropperOpen, setCropperOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string>('')
  const [isCircleView, setIsCircleView] = useState(defaultCirclePreview)
  const [showManualInput, setShowManualInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file chosen from user device
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Read file as Data URL and open cropper
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageToCrop(reader.result)
        setCropperOpen(true)
      }
    }
    reader.readAsDataURL(file)

    // Reset file input so user can pick the same file again if wanted
    e.target.value = ''
  }

  // Open cropper for existing image
  const handleCropExisting = () => {
    if (!value) return
    setImageToCrop(value)
    setCropperOpen(true)
  }

  // Handle Remove Image
  const handleRemoveImage = () => {
    if (confirm('Are you sure you want to remove this image?')) {
      onChange('')
      setStatusMessage('Image removed.')
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  // Upload cropped blob/dataUrl to Cloudinary (with automatic fallback to data URL)
  const uploadToCloudinaryOrFallback = async (dataUrl: string): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      // Cloudinary not configured, return data URL directly
      return dataUrl
    }

    try {
      const formData = new FormData()
      formData.append('file', dataUrl)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', uploadFolder)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.secure_url) {
          return data.secure_url
        }
      }
    } catch (err) {
      console.warn('Direct Cloudinary upload failed, falling back to local data URL:', err)
    }

    return dataUrl
  }

  // When cropper completes
  const handleCropComplete = async (croppedDataUrl: string) => {
    setIsUploading(true)
    setStatusMessage('Saving & optimizing photo...')

    try {
      const finalUrl = await uploadToCloudinaryOrFallback(croppedDataUrl)
      onChange(finalUrl)
      setStatusMessage('Photo updated successfully!')
      setTimeout(() => setStatusMessage(null), 3500)
    } catch (err) {
      console.error('Error saving image:', err)
      onChange(croppedDataUrl)
      setStatusMessage('Photo updated locally.')
      setTimeout(() => setStatusMessage(null), 3500)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div
      style={{
        background: '#FAF8F5',
        border: '1.5px solid #E4DDD2',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '6px',
        marginBottom: '10px',
      }}
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Header & Description */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#1C1917', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fas fa-camera" style={{ color: '#C5A059' }}></i>
            {label}
          </label>
          {description && (
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#786F66' }}>
              {description}
            </p>
          )}
        </div>

        {value && enableCircleMask && (
          <button
            type="button"
            onClick={() => setIsCircleView(!isCircleView)}
            style={{
              fontSize: '10.5px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #D5CEBF',
              background: isCircleView ? '#EDE6DB' : '#FFFFFF',
              color: '#4A4138',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <i className={isCircleView ? 'fas fa-circle' : 'far fa-square'}></i>
            <span>{isCircleView ? 'Round Preview' : 'Rect Preview'}</span>
          </button>
        )}
      </div>

      {/* Main Image Preview & Action Controls */}
      {value ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#FFFFFF',
            border: '1px solid #E5DFD5',
            borderRadius: '10px',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Image Preview Canvas */}
            <div
              style={{
                position: 'relative',
                width: isCircleView ? '100px' : '130px',
                height: '100px',
                borderRadius: isCircleView ? '50%' : '8px',
                overflow: 'hidden',
                background: '#0F0E0D',
                border: '2px solid #C5A059',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={value}
                alt="Outlet preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: isCircleView ? 'cover' : 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '180px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {/* Upload / Replace Photo Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid #C5A059',
                    background: '#FAF6EE',
                    color: '#805D21',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F3EBDD')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FAF6EE')}
                >
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Upload New Photo</span>
                </button>

                {/* Crop / Adjust Dimensions Button */}
                <button
                  type="button"
                  onClick={handleCropExisting}
                  disabled={isUploading}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid #D5CEBF',
                    background: '#FFFFFF',
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F5F4')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                >
                  <i className="fas fa-crop-alt" style={{ color: '#C5A059' }}></i>
                  <span>Crop / Adjust Dimensions</span>
                </button>

                {/* Remove Image Button */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '6px',
                    border: '1px solid #FECACA',
                    background: '#FEF2F2',
                    color: '#DC2626',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FEE2E2')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FEF2F2')}
                >
                  <i className="fas fa-trash-alt"></i>
                  <span>Remove</span>
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="fas fa-check-circle"></i>
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State / Dropzone */
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed #C5A059',
            borderRadius: '10px',
            padding: '24px 16px',
            textAlign: 'center',
            background: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#FBF8F2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(197, 160, 89, 0.15)',
              color: '#C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontSize: '18px',
            }}
          >
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917' }}>
            Click to Upload Photo from Device
          </div>
          <div style={{ fontSize: '11px', color: '#786F66', marginTop: '3px' }}>
            Supports JPG, PNG, WebP • Built-in image cropper will open automatically
          </div>
          <div style={{ marginTop: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#1C1917',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              Choose Photo
            </span>
          </div>
        </div>
      )}

      {/* Quick Select Preset Buttons (if provided) */}
      {presets.length > 0 && (
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10.5px', color: '#786F66', fontWeight: 600 }}>PRESETS:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(p.url)
                setStatusMessage(`Applied preset: ${p.label}`)
                setTimeout(() => setStatusMessage(null), 3000)
              }}
              style={{
                fontSize: '10.5px',
                padding: '3px 8px',
                borderRadius: '4px',
                border: value === p.url ? '1px solid #C5A059' : '1px solid #D5CEBF',
                background: value === p.url ? '#FAF4EA' : '#FFFFFF',
                color: value === p.url ? '#805D21' : '#4B5563',
                cursor: 'pointer',
                fontWeight: value === p.url ? 700 : 500,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Collapsible Manual Direct URL (Advanced) */}
      <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #E2DACD' }}>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '10.5px',
            color: '#8A7B6D',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          {showManualInput ? 'Hide direct link input' : 'Or paste a direct image URL (Advanced)'}
        </button>

        {showManualInput && (
          <div style={{ marginTop: '6px' }}>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or /assets/images/..."
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #D5CEBF',
                fontSize: '11px',
                background: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* The Interactive Cropper Modal */}
      {cropperOpen && (
        <ImageCropperModal
          isOpen={cropperOpen}
          imageSrc={imageToCrop}
          onClose={() => setCropperOpen(false)}
          onCropComplete={handleCropComplete}
          initialAspectRatio={initialAspectRatio}
          title={`Crop & Frame ${label}`}
          enableCircleMask={enableCircleMask}
        />
      )}
    </div>
  )
}
