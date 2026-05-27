import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ContactForm from '../components/ContactForm';
import { MapPin, Mail, Phone } from 'lucide-react';

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

export default function Contact() {
  const { contact, partners } = useContext(AppContext);

  return (
    <div>
      {/* Header section */}
      <section className="hero" style={{ padding: '100px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Contactez-Nous</h1>
          <p className="hero-subtitle">
            Notre équipe d'experts est prête à vous écouter.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            
            {/* Left side: Information coordinates & Description */}
            <div className="contact-info-cards">
              
              <div className="contact-info-card">
                <div className="contact-card-icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="contact-card-title">Adresse</h4>
                  <p className="contact-card-content">{contact.address}</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon-wrapper">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="contact-card-title">Email</h4>
                  <p className="contact-card-content">
                    <a href={`mailto:${contact.email}`} style={{ color: 'inherit' }}>{contact.email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon-wrapper">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="contact-card-title">Téléphone</h4>
                  <p className="contact-card-content">
                    <a href={`tel:${contact.phone}`} style={{ color: 'inherit' }}>{contact.phone}</a>
                  </p>
                </div>
              </div>

              {/* Description Panel from Screenshot 1 */}
              <div 
                className="contact-info-card" 
                style={{ 
                  flexDirection: 'column', 
                  backgroundColor: '#72b651', /* Matches screenshot 1's light green exactly */
                  color: 'white',
                  borderColor: 'transparent'
                }}
              >
                <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '12px' }}>
                  Société de Nutrition du Bénin
                </h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', opacity: '0.95', marginBottom: '24px' }}>
                  Nous sommes là pour vous aider à répondre à vos questions. Les questions de nutrition peuvent être compliquées, nos experts sont à votre disposition pour vous informer de tous les aspects concernant votre sujet. Nous sommes très fiers de mettre notre expertise à votre service et sommes impatients de vous entendre.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {contact.facebook && (
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {contact.twitter && (
                    <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label="Twitter/X">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                  )}
                  {contact.instagram && (
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  )}
                  {contact.youtube && (
                    <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label="YouTube">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </a>
                  )}
                  {contact.linkedin && (
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  )}
                  {contact.customSocials && contact.customSocials.map((social) => (
                    social.value && (
                      <a key={social.id} href={social.value} target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-label={social.name}>
                        {getSocialIcon(social.name)}
                      </a>
                    )
                  ))}
                </div>
              </div>

            </div>

            {/* Right side: Form panel */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="partners-section">
        <div className="container">
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '30px' }}>
            Nos Partenaires et Associés
          </h3>
          <div className="partners-carousel">
            {partners.map((partner) => (
              <img 
                key={partner.id} 
                src={partner.logo} 
                alt={partner.name} 
                title={partner.name} 
                className="partner-logo" 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
