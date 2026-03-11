const images = [
  '/assets/images/herosec1.webp',
  '/assets/images/herosec2.webp',
  '/assets/images/herosec3.webp',
]

export default function Hero() {
  return (
    <section id="home" className="hero hero-grid-bg">
      <div className="hero-bg-grid">
        {images.map((src, idx) => (
          <div className="hero-bg-cell" key={idx}>
            <img src={src} alt="Hero background" className="hero-bg-img" />
            <div className="hero-bg-gradient" />
          </div>
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-logo">A S</div>
        <h1>A S Handloom</h1>
        <p className="hero-tagline">Weaving Heritage Since 2007</p>
        <a href="#sarees" className="hero-cta">
          Explore Our Collections
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  )
}
