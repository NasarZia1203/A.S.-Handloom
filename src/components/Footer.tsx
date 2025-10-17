import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>A S Handloom</h3>
          <p>
            Weaving Heritage Since 2007. We specialize in creating exquisite handloom sarees and premium fabrics with traditional craftsmanship and contemporary designs.
          </p>
          <div className="social-links">
            <a
              href="#"
              aria-label="Map"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://maps.app.goo.gl/hYaGfcFaaA2Jhzus5', '_blank', 'noopener,noreferrer');
              }}
            >
              <i className="fas fa-map-marker-alt"></i>
            </a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="#home">Home</a></p>
          <p><a href="#about">About Us</a></p>
          <p><a href="#sarees">Saree Collection</a></p>
          <p><a href="#fabrics">Fabric Collection</a></p>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><i className="fas fa-user-tie"></i> Proprietor/Owner: MD RAZA ALAM</p>
          <p><i className="fas fa-map-marker-alt"></i> Bhagalpur, Bihar, India</p>
          <p><i className="fas fa-phone"></i> +91-9430908657</p>
          <p><i className="fas fa-envelope"></i> ashandloombgp@gmail.com</p>
          <p><i className="fas fa-file-invoice-dollar"></i> GST: 10AJXPA6956B1ZD</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 A S Handloom. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
