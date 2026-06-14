import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowRight, Check, HelpCircle, Calendar, X, Award, Shield, Target } from 'lucide-react';

export default function Home() {
  const { announcements, partners, setActivePage, tickerText, isTickerActive } = useContext(AppContext);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Ticker Banner */}
      {isTickerActive && tickerText && tickerText.trim() !== '' && (
        <div className="ticker-banner">
          <div className="ticker-wrap">
            <span className="ticker-item">{tickerText}</span>
            <span className="ticker-item">{tickerText}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Société de Nutrition du Bénin</h1>
            <p className="hero-subtitle">
              Nutrition et alimentation saine pour la santé et le développement durable
            </p>
            <div className="hero-actions">
              <button onClick={() => handleNavClick('contact')} className="btn btn-accent">
                Nous Contacter
              </button>
              <button onClick={() => handleNavClick('presentation')} className="btn btn-white">
                Qui Sommes-Nous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            <div className="card-pillar">
              <div className="pillar-icon-wrapper">
                <Target size={32} />
              </div>
              <h3 className="pillar-title">NOTRE BUT</h3>
              <p className="pillar-text">
                Contribuer au développement humain et économique du Bénin en aidant à assurer un bon état nutritionnel aux différentes couches de la population.
              </p>
            </div>

            <div className="card-pillar">
              <div className="pillar-icon-wrapper">
                <Shield size={32} />
              </div>
              <h3 className="pillar-title">NOS VALEURS</h3>
              <p className="pillar-text">
                La SNB est une société savante dont les membres partagent des valeurs fondamentales : égalité, équité, intégrité, professionnalisme, honnêteté et respect mutuel.
              </p>
            </div>

            <div className="card-pillar">
              <div className="pillar-icon-wrapper">
                <Award size={32} />
              </div>
              <h3 className="pillar-title">NOS EXPERTISES</h3>
              <p className="pillar-text">
                Formation, recherche, conception de projets et programmes, suivi-évaluation, capitalisation, plaidoyer stratégique, redevabilité et élaboration de politiques de nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adhesion Appeal Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="adhesion-banner">
            <div className="adhesion-grid">
              <div>
                <h2 className="adhesion-title">Appel à Adhésion&nbsp;!</h2>
                <p className="adhesion-subtitle">
                  La Société de Nutrition du Bénin (SNB) invite tous les professionnels et passionnés du domaine de la nutrition à rejoindre nos rangs pour contribuer activement à l'amélioration de la santé nutritionnelle au Bénin.
                </p>
                <ul className="adhesion-checklist">
                  <li className="adhesion-item">
                    <Check size={20} className="adhesion-icon" />
                    <span>Un Curriculum Vitae (CV) détaillé</span>
                  </li>
                  <li className="adhesion-item">
                    <Check size={20} className="adhesion-icon" />
                    <span>Une copie de votre diplôme (Licence, Master ou Doctorat)</span>
                  </li>
                  <li className="adhesion-item">
                    <Check size={20} className="adhesion-icon" />
                    <span>Une demande manuscrite d'adhésion</span>
                  </li>
                  <li className="adhesion-item">
                    <Check size={20} className="adhesion-icon" />
                    <span>Envoi des dossiers complets à : <strong>secretariat@snb.bj</strong></span>
                  </li>
                </ul>
              </div>
              <div className="adhesion-card">
                <div className="adhesion-fee">10 000 FCFA</div>
                <div className="adhesion-fee-label">Frais d'adhésion annuels</div>
                <button onClick={() => handleNavClick('adhesion')} className="btn btn-accent" style={{ width: '100%' }}>
                  Nous Rejoindre <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements / News Section */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Annonces & Actualités</h2>
            <p className="section-subtitle">
              Retrouvez les derniers événements, communiqués et actualités de la Société de Nutrition du Bénin.
            </p>
          </div>

          <div className="grid-2">
            {announcements.map((announcement) => (
              <article 
                key={announcement.id} 
                className="card-news" 
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveAnnouncement(announcement)}
              >
                <div className="news-img-wrapper">
                  <img loading="lazy" src={announcement.image} alt={announcement.title} className="news-img" />
                  <span className="news-badge">Actualité</span>
                </div>
                <div className="news-content">
                  <span className="news-date">{announcement.date}</span>
                  <h3 className="news-title">{announcement.title}</h3>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--secondary)', marginBottom: '12px', fontWeight: '600' }}>
                    Thème: {announcement.theme}
                  </h4>
                  <p className="news-text" style={{ marginBottom: '20px' }}>{announcement.text}</p>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', alignSelf: 'flex-start' }}>
                    <span>Lire l'article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ask experts section */}
      <section className="expert-banner">
        <div className="container expert-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <HelpCircle size={40} style={{ color: 'var(--accent)' }} />
            <h2 className="expert-title">Des questions sur un problème de nutrition&nbsp;?</h2>
          </div>
          <button onClick={() => handleNavClick('contact')} className="btn btn-white">
            Demandez à nos experts
          </button>
        </div>
      </section>

      {/* Partners section */}
      <section className="partners-section">
        <div className="container">
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '30px' }}>
            Nos Partenaires et Associés
          </h3>
          <div className="partners-carousel">
            <div className="partners-track">
              {partners.map((partner) => (
                <img loading="lazy" key={partner.id} 
                  src={partner.logo} 
                  alt={partner.name} 
                  title={partner.name} 
                  className="partner-logo" 
                />
              ))}
              {/* Duplicate for infinite loop */}
              {partners.map((partner) => (
                <img loading="lazy" key={`${partner.id}-dup`} 
                  src={partner.logo} 
                  alt={partner.name} 
                  title={partner.name} 
                  className="partner-logo" 
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Announcement Modal */}
      {activeAnnouncement && (
        <div className="modal-overlay" onClick={() => setActiveAnnouncement(null)}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '800px', width: '90%' }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {activeAnnouncement.date}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveAnnouncement(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '8px', lineHeight: '1.3' }}>
                {activeAnnouncement.title}
              </h2>
              {activeAnnouncement.theme && (
                <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '20px', fontWeight: '600' }}>
                  Thème : {activeAnnouncement.theme}
                </h4>
              )}
              
              {activeAnnouncement.image && (
                <div style={{ height: '320px', width: '100%', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <img loading="lazy" src={activeAnnouncement.image} alt={activeAnnouncement.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              
              <div className="article-text-body article-dropcap">
                {activeAnnouncement.fullText || activeAnnouncement.text}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setActiveAnnouncement(null)} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
