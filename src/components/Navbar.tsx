import React from 'react';

const Navbar: React.FC = () => (
  <nav className="navbar" id="navbar">
    <div className="navbar-container">
      <a href="#home" className="logo">A S Handloom</a>
      <ul className="nav-links" id="navLinks">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#sarees">Sarees</a></li>
        <li><a href="#fabrics">Fabrics</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="mobile-menu-toggle" id="mobileMenuToggle">
        <i className="fas fa-bars"></i>
      </button>
    </div>
  </nav>
);

export default Navbar;
