'use client'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import type { Product } from '@/lib/types'

interface ProductCarouselProps {
  items: Product[]
  variant: 'saree' | 'fabric'
  autoPlay?: boolean
  autoPlaySpeed?: number
  transitionDuration?: number
}

const CustomDot = ({ onClick, ...rest }: any) => {
  const { active } = rest
  return (
    <button
      className={active ? 'custom-dot active' : 'custom-dot'}
      onClick={onClick}
      style={{
        width: active ? 10 : 5,
        height: active ? 10 : 5,
        borderRadius: '50%',
        background: active ? 'var(--color-primary)' : '#81002077',
        border: 'none',
        margin: '0 6px',
        transition: 'all 0.35s cubic-bezier(0.25,0.8,0.25,1)',
        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
      aria-label={active ? 'Current slide' : 'Go to slide'}
    />
  )
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

export default function ProductCarousel({
  items,
  variant,
  autoPlay = true,
  autoPlaySpeed = 3000,
  transitionDuration = 1200,
}: ProductCarouselProps) {
  if (items.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
        No {variant === 'saree' ? 'sarees' : 'fabrics'} available at the moment.
      </p>
    )
  }

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={autoPlay}
      autoPlaySpeed={autoPlaySpeed}
      keyBoardControl={true}
      customTransition="transform 1200ms cubic-bezier(0.25,0.8,0.25,1)"
      transitionDuration={transitionDuration}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      arrows
      customDot={<CustomDot />}
      renderDotsOutside={variant === 'saree'}
    >
      {items.map((item) => (
        <div
          className={`collection-item ${variant}-carousel-item`}
          key={item.id}
        >
          <div className={`collection-placeholder ${variant}-carousel-placeholder`}>
            <img
              src={item.image_url}
              alt={item.description}
              className={`${variant}-carousel-img`}
            />
            <img
              src="/assets/logowatermark.png"
              alt="AS Handloom watermark"
              className={`${variant}-carousel-watermark`}
            />
          </div>
          <div className={`${variant}-carousel-overlay`}>
            <div className="product-code">{item.code}</div>
            <div className="product-description">{item.description}</div>
          </div>
        </div>
      ))}
    </Carousel>
  )
}
