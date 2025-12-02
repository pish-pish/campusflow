import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__title" aria-label="CampusFlow home" onClick={closeMobileMenu}>
          <img src="/images/logo.png" alt="CampusFlow logo" />
          <h1>CampusFlow</h1>
        </Link>
        
        <nav className="header__nav" aria-label="CampusFlow navigation">
          <div className="header__nav-desktop">
            <Link to="/" className="header__nav-link">All Events</Link>
          </div>
          
          <button
            className="header__mobile-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="header__hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav" aria-label="Mobile navigation">
            <Link to="/" className="header__mobile-link" onClick={closeMobileMenu}>
              All Events
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
