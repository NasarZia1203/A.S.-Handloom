'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, useEffect, useCallback } from 'react'

export type AspectRatioType = '1:1' | '4:3' | '3:4' | '16:9' | 'free'

interface ImageCropperModalProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
  onCropComplete: (croppedDataUrl: string) => Promise<void> | void
  initialAspectRatio?: AspectRatioType
  title?: string
  enableCircleMask?: boolean
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  initialAspectRatio = '4:3',
  title = 'Crop & Frame Image',
  enableCircleMask = true,
}: ImageCropperModalProps) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>(initialAspectRatio)
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [showCircleMask, setShowCircleMask] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // Natural image dimensions
  const [naturalWidth, setNaturalWidth] = useState<number>(0)
  const [naturalHeight, setNaturalHeight] = useState<number>(0)

  // Crop rectangle in normalized percentage (0 to 100)
  const [crop, setCrop] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const dragRef = useRef<{
    isDragging: boolean
    dragType: 'move' | 'handle' | null
    handle: string | null
    startX: number
    startY: number
    startCrop: { x: number; y: number; width: number; height: number }
  }>({
    isDragging: false,
    dragType: null,
    handle: null,
    startX: 0,
    startY: 0,
    startCrop: { x: 0, y: 0, width: 0, height: 0 },
  })

  // Calculate default crop for a given aspect ratio
  const computeCropForRatio = useCallback(
    (ratio: AspectRatioType, imgW: number, imgH: number) => {
      if (!imgW || !imgH) return { x: 10, y: 10, width: 80, height: 80 }

      let targetRatio: number | null = null
      if (ratio === '1:1') targetRatio = 1
      else if (ratio === '4:3') targetRatio = 4 / 3
      else if (ratio === '3:4') targetRatio = 3 / 4
      else if (ratio === '16:9') targetRatio = 16 / 9

      if (!targetRatio) {
        return { x: 10, y: 10, width: 80, height: 80 }
      }

      const imgAspect = imgW / imgH
      let w = 80
      let h = 80

      if (targetRatio > imgAspect) {
        // Target is wider than image
        w = 90
        h = (w / targetRatio) * imgAspect
      } else {
        // Target is taller than image
        h = 90
        w = (h * targetRatio) / imgAspect
      }

      // Constrain within 90%
      if (w > 90) {
        const factor = 90 / w
        w = 90
        h *= factor
      }
      if (h > 90) {
        const factor = 90 / h
        h = 90
        w *= factor
      }

      const x = Math.max(0, (100 - w) / 2)
      const y = Math.max(0, (100 - h) / 2)

      return { x, y, width: w, height: h }
    },
    []
  )

  // Image load handler
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setNaturalWidth(img.naturalWidth)
    setNaturalHeight(img.naturalHeight)
    const newCrop = computeCropForRatio(aspectRatio, img.naturalWidth, img.naturalHeight)
    setCrop(newCrop)
  }

  // Handle aspect ratio switch
  const handleSelectRatio = (ratio: AspectRatioType) => {
    setAspectRatio(ratio)
    if (naturalWidth && naturalHeight) {
      const newCrop = computeCropForRatio(ratio, naturalWidth, naturalHeight)
      setCrop(newCrop)
    }
  }

  // Start dragging
  const handleMouseDown = (e: React.MouseEvent, type: 'move' | 'handle', handle: string | null = null) => {
    e.preventDefault()
    e.stopPropagation()
    dragRef.current = {
      isDragging: true,
      dragType: type,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...crop },
    }
  }

  // Touch start
  const handleTouchStart = (e: React.TouchEvent, type: 'move' | 'handle', handle: string | null = null) => {
    e.stopPropagation()
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    dragRef.current = {
      isDragging: true,
      dragType: type,
      handle,
      startX: touch.clientX,
      startY: touch.clientY,
      startCrop: { ...crop },
    }
  }

  // Dragging logic
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!dragRef.current.isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const deltaXPercent = ((clientX - dragRef.current.startX) / rect.width) * 100
      const deltaYPercent = ((clientY - dragRef.current.startY) / rect.height) * 100
      const { startCrop, dragType, handle } = dragRef.current

      if (dragType === 'move') {
        let newX = startCrop.x + deltaXPercent
        let newY = startCrop.y + deltaYPercent

        newX = Math.max(0, Math.min(newX, 100 - startCrop.width))
        newY = Math.max(0, Math.min(newY, 100 - startCrop.height))

        setCrop((prev) => ({ ...prev, x: newX, y: newY }))
      } else if (dragType === 'handle' && handle) {
        let newX = startCrop.x
        let newY = startCrop.y
        let newW = startCrop.width
        let newH = startCrop.height

        const minW = 15
        const minH = 15

        if (handle.includes('e')) {
          newW = Math.max(minW, Math.min(startCrop.width + deltaXPercent, 100 - startCrop.x))
        }
        if (handle.includes('s')) {
          newH = Math.max(minH, Math.min(startCrop.height + deltaYPercent, 100 - startCrop.y))
        }
        if (handle.includes('w')) {
          const maxDeltaX = startCrop.width - minW
          const constrainedDeltaX = Math.min(maxDeltaX, Math.max(deltaXPercent, -startCrop.x))
          newX = startCrop.x + constrainedDeltaX
          newW = startCrop.width - constrainedDeltaX
        }
        if (handle.includes('n')) {
          const maxDeltaY = startCrop.height - minH
          const constrainedDeltaY = Math.min(maxDeltaY, Math.max(deltaYPercent, -startCrop.y))
          newY = startCrop.y + constrainedDeltaY
          newH = startCrop.height - constrainedDeltaY
        }

        // Lock aspect ratio if required
        let targetRatio: number | null = null
        if (aspectRatio === '1:1') targetRatio = 1
        else if (aspectRatio === '4:3') targetRatio = 4 / 3
        else if (aspectRatio === '3:4') targetRatio = 3 / 4
        else if (aspectRatio === '16:9') targetRatio = 16 / 9

        if (targetRatio && naturalWidth && naturalHeight) {
          const imgAspect = naturalWidth / naturalHeight
          // widthPercent / heightPercent = targetRatio / imgAspect
          const ratioFactor = targetRatio / imgAspect

          if (handle === 'e' || handle === 'w') {
            newH = Math.min(newW / ratioFactor, 100 - newY)
            newW = newH * ratioFactor
          } else {
            newW = Math.min(newH * ratioFactor, 100 - newX)
            newH = newW / ratioFactor
          }
        }

        setCrop({
          x: Math.max(0, Math.min(newX, 100 - minW)),
          y: Math.max(0, Math.min(newY, 100 - minH)),
          width: Math.max(minW, Math.min(newW, 100)),
          height: Math.max(minH, Math.min(newH, 100)),
        })
      }
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onEnd = () => {
      dragRef.current.isDragging = false
    }

    if (isOpen) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onEnd)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isOpen, aspectRatio, naturalWidth, naturalHeight])

  // Generate cropped output canvas
  const handleApplyCrop = async () => {
    if (!imageRef.current || !naturalWidth || !naturalHeight) return
    setIsSaving(true)

    try {
      const sourceImage = imageRef.current

      // Calculate pixel coordinates in source image
      const sourceX = (crop.x / 100) * naturalWidth
      const sourceY = (crop.y / 100) * naturalHeight
      const sourceW = (crop.width / 100) * naturalWidth
      const sourceH = (crop.height / 100) * naturalHeight

      // Destination resolution: target crisp 1200px max
      const maxDim = 1200
      let destW = Math.round(sourceW)
      let destH = Math.round(sourceH)

      if (destW > maxDim || destH > maxDim) {
        if (destW > destH) {
          destH = Math.round((destH * maxDim) / destW)
          destW = maxDim
        } else {
          destW = Math.round((destW * maxDim) / destH)
          destH = maxDim
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = destW
      canvas.height = destH
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Canvas 2D context not available')
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Apply rotation if any
      if (rotation !== 0) {
        ctx.save()
        ctx.translate(destW / 2, destH / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-destW / 2, -destH / 2)
      }

      // Draw cropped area
      ctx.drawImage(
        sourceImage,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        0,
        0,
        destW,
        destH
      )

      if (rotation !== 0) {
        ctx.restore()
      }

      // Export as high quality webp or png data URL
      let dataUrl = ''
      try {
        dataUrl = canvas.toDataURL('image/webp', 0.92)
      } catch {
        dataUrl = canvas.toDataURL('image/png')
      }

      // If dataUrl succeeded, call onCropComplete
      await onCropComplete(dataUrl)
      onClose()
    } catch (err) {
      console.error('Error applying crop:', err)
      alert('Unable to process image crop. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  // Estimated output resolution
  const estWidth = naturalWidth ? Math.round((crop.width / 100) * naturalWidth) : 0
  const estHeight = naturalHeight ? Math.round((crop.height / 100) * naturalHeight) : 0

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 14, 13, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSaving) onClose()
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          background: '#1F1D1A',
          border: '1px solid #3E3832',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(197, 160, 89, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#EDE8E1',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #332E28',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#171513',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(197, 160, 89, 0.15)',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              <i className="fas fa-crop-alt"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                {title}
              </h3>
              <div style={{ fontSize: '11px', color: '#9E9488' }}>
                Drag edges or box to crop • {estWidth} × {estHeight} px
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9E9488',
              fontSize: '18px',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              padding: '6px 10px',
              borderRadius: '6px',
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Aspect Ratio Toolbar */}
        <div
          style={{
            padding: '12px 20px',
            background: '#1C1A17',
            borderBottom: '1px solid #332E28',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Ratio Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#8C8276', fontWeight: 600, marginRight: '4px' }}>
              DIMENSIONS:
            </span>
            {[
              { id: '1:1', label: '1:1 Square (Logo/Round)', desc: 'Badges & Round' },
              { id: '4:3', label: '4:3 Outlet Card', desc: 'Shop Facade' },
              { id: '3:4', label: '3:4 Model Portrait', desc: 'Sarees & Hero' },
              { id: '16:9', label: '16:9 Wide', desc: 'Banner' },
              { id: 'free', label: 'Freeform', desc: 'Custom' },
            ].map((btn) => {
              const active = aspectRatio === btn.id
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleSelectRatio(btn.id as AspectRatioType)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: active ? '1px solid #C5A059' : '1px solid #3A342D',
                    background: active ? 'rgba(197, 160, 89, 0.2)' : '#26231F',
                    color: active ? '#F5D77F' : '#B8ACA0',
                  }}
                >
                  {btn.id === '1:1' ? '1:1 Square' : btn.id === '4:3' ? '4:3 Store' : btn.id === '3:4' ? '3:4 Portrait' : btn.id === '16:9' ? '16:9 Banner' : 'Freeform'}
                </button>
              )
            })}
          </div>

          {/* Tools: Rotate & Circle Mask */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {enableCircleMask && (
              <button
                type="button"
                onClick={() => setShowCircleMask(!showCircleMask)}
                title="Preview inside circle cutout"
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: showCircleMask ? '1px solid #C5A059' : '1px solid #3A342D',
                  background: showCircleMask ? 'rgba(197, 160, 89, 0.2)' : '#26231F',
                  color: showCircleMask ? '#F5D77F' : '#B8ACA0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <i className="far fa-circle"></i>
                <span>Circle Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              title="Rotate 90 degrees clockwise"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid #3A342D',
                background: '#26231F',
                color: '#B8ACA0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <i className="fas fa-redo"></i>
              <span>Rotate</span>
            </button>
          </div>
        </div>

        {/* Cropper Viewport Area */}
        <div
          style={{
            flex: 1,
            minHeight: '340px',
            maxHeight: '520px',
            position: 'relative',
            background: '#0D0C0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          {/* Inner Image Frame Container */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'inline-block',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s ease',
            }}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Source to crop"
              onLoad={handleImageLoad}
              crossOrigin="anonymous"
              style={{
                display: 'block',
                maxWidth: '560px',
                maxHeight: '440px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                filter: rotation !== 0 ? `rotate(${rotation}deg)` : 'none',
              }}
            />

            {/* Dark Mask Surrounding Crop Box */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'rgba(0, 0, 0, 0.55)',
                clipPath: `polygon(
                  0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                  ${crop.x}% ${crop.y}%,
                  ${crop.x}% ${crop.y + crop.height}%,
                  ${crop.x + crop.width}% ${crop.y + crop.height}%,
                  ${crop.x + crop.width}% ${crop.y}%,
                  ${crop.x}% ${crop.y}%
                )`,
              }}
            />

            {/* Interactive Crop Rectangle */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'move')}
              onTouchStart={(e) => handleTouchStart(e, 'move')}
              style={{
                position: 'absolute',
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
                border: '2px solid #C5A059',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.2)',
                cursor: 'move',
                boxSizing: 'border-box',
                borderRadius: showCircleMask ? '50%' : '0',
                overflow: 'visible',
              }}
            >
              {/* Rule of Thirds Grid Lines */}
              {!showCircleMask && (
                <>
                  <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                </>
              )}

              {/* Circle Mask Preview Outline */}
              {showCircleMask && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px dashed #F5D77F',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Resize Handles (8 Points) */}
              {[
                { id: 'nw', cursor: 'nwse-resize', style: { top: -6, left: -6 } },
                { id: 'ne', cursor: 'nesw-resize', style: { top: -6, right: -6 } },
                { id: 'sw', cursor: 'nesw-resize', style: { bottom: -6, left: -6 } },
                { id: 'se', cursor: 'nwse-resize', style: { bottom: -6, right: -6 } },
                { id: 'n', cursor: 'ns-resize', style: { top: -5, left: '50%', transform: 'translateX(-50%)' } },
                { id: 's', cursor: 'ns-resize', style: { bottom: -5, left: '50%', transform: 'translateX(-50%)' } },
                { id: 'w', cursor: 'ew-resize', style: { left: -5, top: '50%', transform: 'translateY(-50%)' } },
                { id: 'e', cursor: 'ew-resize', style: { right: -5, top: '50%', transform: 'translateY(-50%)' } },
              ].map((h) => (
                <div
                  key={h.id}
                  onMouseDown={(e) => handleMouseDown(e, 'handle', h.id)}
                  onTouchStart={(e) => handleTouchStart(e, 'handle', h.id)}
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    background: '#FFFFFF',
                    border: '2px solid #C5A059',
                    borderRadius: '2px',
                    cursor: h.cursor,
                    zIndex: 2,
                    ...h.style,
                  }}
                />
              ))}

              {/* Dimension Tag in Corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '9.5px',
                  fontWeight: 600,
                  color: '#F5D77F',
                  letterSpacing: '0.04em',
                  pointerEvents: 'none',
                }}
              >
                {estWidth} × {estHeight}
              </div>
            </div>
          </div>
        </div>

        {/* Zoom & Fine-tune Controls */}
        <div
          style={{
            padding: '10px 20px',
            background: '#1A1815',
            borderTop: '1px solid #2F2A24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#B8ACA0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '280px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>ZOOM:</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(1)))}
              style={{
                background: '#282420',
                border: '1px solid #3E372F',
                color: '#EDE8E1',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              -
            </button>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: '#C5A059', cursor: 'pointer' }}
            />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.1).toFixed(1)))}
              style={{
                background: '#282420',
                border: '1px solid #3E372F',
                color: '#EDE8E1',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +
            </button>
            <span style={{ fontSize: '11px', width: '32px' }}>{zoom}x</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setZoom(1)
              setRotation(0)
              if (naturalWidth && naturalHeight) {
                setCrop(computeCropForRatio(aspectRatio, naturalWidth, naturalHeight))
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8C8276',
              fontSize: '11px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Reset Adjustments
          </button>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '14px 20px',
            background: '#151311',
            borderTop: '1px solid #2B2621',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              border: '1px solid #3E3832',
              background: '#26231F',
              color: '#B8ACA0',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApplyCrop}
            disabled={isSaving}
            style={{
              padding: '9px 24px',
              borderRadius: '8px',
              border: 'none',
              background: isSaving
                ? '#554A32'
                : 'linear-gradient(135deg, #D4AF37 0%, #B38F26 100%)',
              color: '#1C1917',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: isSaving ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Applying & Saving Crop...</span>
              </>
            ) : (
              <>
                <i className="fas fa-check"></i>
                <span>Apply & Save Crop</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
