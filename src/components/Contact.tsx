import React from 'react';

const Contact: React.FC = () => (
  <section id="contact" className="section contact">
    <div className="container">
      <h2 className="section-title-contact">Contact Us</h2>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="contact-details">
              <h4>Phone</h4>
              <p>+91-9798141494</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-details">
              <h4>Email</h4>
              <p>ashandloombgp@gmail.com</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="contact-details">
              <h4>WhatsApp</h4>
              <p>+91-9798141494</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-details">
              <h4>Address</h4>
              <p>85 M T N Ghosh Road</p>
              <p>Hasnabad, Champanagar, Bhagalpur, Bihar</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <form id="contactForm">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" name="name" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" id="phone" name="phone" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-input form-textarea" rows={4} required></textarea>
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
