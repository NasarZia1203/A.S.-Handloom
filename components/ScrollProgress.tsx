'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollPercent((scrollTop / docHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollPercent}%`,
        height: '3px',
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-gold))',
        zIndex: 9999,
        transition: 'width 0.1s ease',
      }}
    />
  )
}
