import React from "react";

const About: React.FC = () => (
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

        {/* ✅ Image Grid Section */}
        <div
          className="about-image-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
            height: "820px",
            justifyContent: "center",
          }}
        >
          <div className="about-image" style={{ flex: 1 }}>
            <img
              src='/assets/ASHandloomWorkshop.webp'
              alt="Our Workshop"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "var(--radius-xl)",
              }}
            />
          </div>
          <div className="about-image" style={{ flex: 1 }}>
            <img
              src='/assets/ASHandloomOffice.webp'
              alt="Our Artisans"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "var(--radius-xl)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
