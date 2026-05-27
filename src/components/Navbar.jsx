import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { activePage, setActivePage } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'presentation', label: 'Présentation' },
    { id: 'activites', label: 'Activités' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`header-nav ${scrolled || activePage === 'dashboard' ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#logo" className="logo-link" onClick={() => handleNavClick('accueil')}>
          <img 
            src="/media/LOGO-SNB.png" 
            alt="SNB Logo" 
            className="logo-img" 
          />
          <span className="logo-text">
            Société de Nutrition du Bénin
          </span>
        </a>

        {/* Desktop menu */}
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="hamburger" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
