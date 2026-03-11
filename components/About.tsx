import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Founded in 2007, A S Handloom is based in Bhagalpur, Bihar - a
              renowned hub for fine handloom textiles. We specialize in creating
              exquisite sarees and premium fabrics including Linen, Silk, and
              Cotton, combining traditional craftsmanship with contemporary
              designs.
            </p>
            <p>
              Our skilled artisans bring decades of expertise to every piece,
              ensuring that each product reflects the rich heritage of Indian
              handloom while meeting modern quality standards.
            </p>

            <div className="about-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h4>Premium Quality</h4>
                <p>Finest materials and craftsmanship</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Traditional Art</h4>
                <p>Preserving heritage techniques</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <h4>Sustainable</h4>
                <p>Eco-friendly materials &amp; processes</p>
              </div>
            </div>
          </div>

          <div
            className="about-image-grid"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-16)',
              height: '820px',
              justifyContent: 'center',
            }}
          >
            <div className="about-image" style={{ flex: 1, position: 'relative' }}>
              <Image
                src="/assets/ASHandloomWorkshop.webp"
                alt="Our Workshop"
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-xl)',
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="about-image" style={{ flex: 1, position: 'relative' }}>
              <Image
                src="/assets/ASHandloomOffice.webp"
                alt="Our Artisans"
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-xl)',
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
