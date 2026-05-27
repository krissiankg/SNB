import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

const getSocialIcon = (name) => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('tiktok')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    );
  }
  if (lowercaseName.includes('whatsapp')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.5 8.5 0 0 1-7.6-4.7 8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }
  if (lowercaseName.includes('linkedin')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
};

export default function Footer() {
  const { contact, setActivePage } = useContext(AppContext);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SNB</h3>
            <p className="footer-description">
              La Société de Nutrition du Bénin (SNB) est une association scientifique œuvrant activement pour l'amélioration de l'état nutritionnel et la promotion d'une alimentation saine au Bénin.
            </p>
            <div className="social-links">
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter/X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              )}
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {contact.youtube && (
                <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
              {contact.customSocials && contact.customSocials.map((social) => (
                social.value && (
                  <a key={social.id} href={social.value} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label={social.name}>
                    {getSocialIcon(social.name)}
                  </a>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-links-title">Navigation</h4>
            <ul className="footer-menu">
              <li>
                <a href="#accueil" onClick={(e) => { e.preventDefault(); handleNavClick('accueil'); }} className="footer-menu-link">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#presentation" onClick={(e) => { e.preventDefault(); handleNavClick('presentation'); }} className="footer-menu-link">
                  Présentation
                </a>
              </li>
              <li>
                <a href="#activites" onClick={(e) => { e.preventDefault(); handleNavClick('activites'); }} className="footer-menu-link">
                  Activités
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="footer-menu-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-links-title">Légal</h4>
            <ul className="footer-menu">
              <li>
                <a 
                  href="#legal" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }} 
                  className="footer-menu-link"
                >
                  Mentions Légales
                </a>
              </li>
              <li>
                <a 
                  href="#legal" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }} 
                  className="footer-menu-link"
                >
                  Confidentialité & RGPD
                </a>
              </li>
              <li>
                <a 
                  href="#legal" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }} 
                  className="footer-menu-link"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a 
                  href="#adhesion" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('adhesion'); }} 
                  className="footer-menu-link"
                >
                  Devenir Membre
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-links-title">Nous Contacter</h4>
            <div className="footer-contact-item">
              <MapPin size={22} className="footer-contact-icon" />
              <span>{contact.address}</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <a href={`mailto:${contact.email}`} className="footer-menu-link">{contact.email}</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <a href={`tel:${contact.phone}`} className="footer-menu-link">{contact.phone}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p>© {currentYear} Société de Nutrition du Bénin. Tous droits réservés.</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              Conçu et réalisé par <a href="https://guelichweb.online/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'underline' }}>GUELICHWEB</a>
            </p>
          </div>
          <p>Nutrition & Alimentation Saine au Bénin</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-light)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem'
            }}
          >
            Retour en haut <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
