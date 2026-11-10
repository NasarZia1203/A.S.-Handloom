'use client'

import { useState, useRef, type MouseEvent, type ReactNode } from 'react'

interface ThreeDTiltProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number // max rotation angle in degrees (default 12)
  glare?: boolean
}

export default function ThreeDTilt({
  children,
  className = '',
  style = {},
  intensity = 10,
  glare = true,
}: ThreeDTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation (-intensity to +intensity)
    const rotateY = ((x - centerX) / centerX) * intensity
    const rotateX = -((y - centerY) / centerY) * intensity

    setRotate({ x: rotateX, y: rotateY })

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.35,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${
          isHovered ? 'scale3d(1.025, 1.025, 1.025) translateZ(12px)' : 'scale3d(1, 1, 1)'
        }`,
      }}
    >
      {children}

      {/* Dynamic Specular Reflection (Glare) */}
      {glare && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: glarePos.opacity,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  )
}
