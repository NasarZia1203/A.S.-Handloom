// Custom dot for carousel
const CustomDot = ({ onClick, ...rest }: any) => {
  const { active } = rest;
  return (
    <button
      className={active ? "custom-dot active" : "custom-dot"}
      onClick={onClick}
      style={{
        width: active ? 10 : 5,
        height: active ? 10 : 5,
        borderRadius: "50%",
        background: active ? "var(--color-primary)" : "#81002077" ,
        border: "none",
        margin: "0 6px",
        transition: "all 0.35s cubic-bezier(0.25,0.8,0.25,1)",
        boxShadow: active ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
        cursor: "pointer",
        outline: "none"
      }}
      aria-label={active ? "Current slide" : "Go to slide"}
    />
  );
};
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface ImageItem {
  img: string;
  code: string;
  desc: string;
}

interface SareeCarouselProps {
  items: ImageItem[];
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  transitionDuration?: number;
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
};

const SareeCarousel: React.FC<SareeCarouselProps> = ({ items, autoPlay, autoPlaySpeed, transitionDuration }) => (
  <Carousel
    swipeable={true}
    draggable={true}
    showDots={true}
    responsive={responsive}
    ssr={true}
    infinite={true}
    autoPlay={typeof autoPlay !== 'undefined' ? autoPlay : true}
    autoPlaySpeed={typeof autoPlaySpeed !== 'undefined' ? autoPlaySpeed : 3000}
    keyBoardControl={true}
    customTransition="transform 1200ms cubic-bezier(0.25,0.8,0.25,1)"
    transitionDuration={typeof transitionDuration !== 'undefined' ? transitionDuration : 1200}
    containerClass="carousel-container"
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    arrows
    customDot={<CustomDot />}
    renderDotsOutside={true}
  >
    {items.map((item) => (
      <div className="collection-item saree-carousel-item" key={item.code}>
        <div className="collection-placeholder saree-carousel-placeholder">
          <img
            src={item.img}
            alt={item.desc}
            className="saree-carousel-img"
          />
          {/* Watermark logo */}
          <img
            src={'/assets/logowatermark.png'}
            alt="AS Handloom watermark"
            className="saree-carousel-watermark"
          />
        </div>
        <div className="saree-carousel-overlay">
          <div className="product-code">{item.code}</div>
          <div className="product-description">{item.desc}</div>
        </div>
      </div>
    ))}
  </Carousel>
);

export default SareeCarousel;
