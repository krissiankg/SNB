import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ZoomIn, X, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function Activities() {
  const { activities, gallery, partners, events } = useContext(AppContext);
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  
  // High-end multi-image Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setActiveTabIdx(0);
  };

  const openLightbox = (imagesList, index) => {
    const formattedImages = imagesList.map(img => {
      if (typeof img === 'string') {
        return { url: img, caption: '' };
      }
      return { 
        url: img.url || img.image || img, 
        caption: img.caption || img.title || '' 
      };
    });
    setLightbox({
      isOpen: true,
      images: formattedImages,
      currentIndex: index
    });
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  return (
    <div>
      {/* Header */}
      <section className="hero" style={{ padding: '100px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Ce Que Nous Faisons</h1>
          <p className="hero-subtitle">
            Nutrition et alimentation saine pour la santé et le développement durable
          </p>
        </div>
      </section>

      {/* Priority Activities */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Activités Prioritaires</h2>
            <p className="section-subtitle">
              Les axes d'intervention majeurs à travers lesquels nous réalisons notre mission de santé publique au Bénin.
            </p>
          </div>

          <div className="grid-3">
            {activities.map((act) => (
              <div key={act.id} className="card-news" style={{ borderTop: '4px solid var(--primary)' }}>
                <div className="news-img-wrapper" style={{ height: '180px' }}>
                  <img loading="lazy" src={act.image} alt={act.title} className="news-img" />
                </div>
                <div className="news-content" style={{ padding: '20px' }}>
                  <h3 className="news-title" style={{ fontSize: '1.15rem', marginBottom: '10px' }}>{act.title}</h3>
                  <p className="news-text" style={{ fontSize: '0.88rem' }}>{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical reports / Events */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Rapports & Événements</h2>
            <p className="section-subtitle">
              Découvrez les comptes-rendus complets et images exclusives de nos interventions majeures.
            </p>
          </div>

          <div className="grid-2">
            {events.map((report) => (
              <div 
                key={report.id} 
                className="card-news" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectEvent(report)}
              >
                <div className="news-img-wrapper" style={{ height: '260px' }}>
                  <img loading="lazy" src={report.image} alt={report.title} className="news-img" />
                  <span className="news-badge" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)' }}>
                    Rapport
                  </span>
                </div>
                <div className="news-content" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <Calendar size={14} />
                    <span>{report.date}</span>
                  </div>
                  <h3 className="news-title" style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{report.title}</h3>
                  <p className="news-text" style={{ fontSize: '0.92rem', marginBottom: '20px' }}>
                    {report.description}
                  </p>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', alignSelf: 'flex-start' }}>
                    <span>Lire le rapport</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Notre Galerie Photo</h2>
            <p className="section-subtitle">
              Un aperçu en images de nos travaux de terrain, de recherche scientifique et d'actions communautaires au Bénin.
            </p>
          </div>

          <div className="gallery-grid-custom">
            {gallery.map((photo, idx) => (
              <div key={photo.id} className="gallery-card-custom" onClick={() => openLightbox(gallery, idx)}>
                <img loading="lazy" src={photo.url} alt={photo.caption} className="gallery-img" />
                <div className="gallery-overlay">
                  <ZoomIn size={28} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Event Modal */}
      {activeEvent && (
        <div className="modal-overlay" onClick={() => setActiveEvent(null)}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '800px', width: '90%' }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {activeEvent.date}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveEvent(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '20px', lineHeight: '1.3' }}>
                {activeEvent.title}
              </h2>
              
              <div style={{ height: '320px', width: '100%', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <img loading="lazy" src={activeEvent.image} alt={activeEvent.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <p className="event-dropcap" style={{ 
                color: 'var(--text-dark)', 
                fontSize: '1rem', 
                lineHeight: '1.75', 
                whiteSpace: 'pre-line',
                marginBottom: '28px'
              }}>
                {activeEvent.fullText}
              </p>

              {/* Sub-activities Tabs Layout (e.g. JMA 2022) */}
              {activeEvent.activities && activeEvent.activities.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '24px' }}>
                  <div className="event-tabs">
                    {activeEvent.activities.map((act, idx) => (
                      <button 
                        key={idx}
                        className={`event-tab-btn ${activeTabIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveTabIdx(idx)}
                      >
                        {act.title.split(':')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="event-tab-panel">
                    <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
                      {activeEvent.activities[activeTabIdx].title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      <Calendar size={14} />
                      <span>{activeEvent.activities[activeTabIdx].date}</span>
                    </div>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {activeEvent.activities[activeTabIdx].description}
                    </p>

                    {activeEvent.activities[activeTabIdx].images && activeEvent.activities[activeTabIdx].images.length > 0 && (
                      <div>
                        <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ImageIcon size={16} />
                          <span>Galerie de l'activité ({activeEvent.activities[activeTabIdx].images.length} photos)</span>
                        </h4>
                        <div className="event-grid-photo">
                          {activeEvent.activities[activeTabIdx].images.map((imgUrl, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              className="event-photo-item"
                              onClick={() => openLightbox(activeEvent.activities[activeTabIdx].images, imgIdx)}
                            >
                              <img loading="lazy" src={imgUrl} alt="" />
                              <div className="event-photo-overlay">
                                <span className="event-photo-caption">
                                  {imgIdx === 0 && activeEvent.activities[activeTabIdx].images.length > 6 ? "Affiche" : `Photo ${imgIdx + 1}`}
                                </span>
                                <ZoomIn size={16} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Video Player Integration (e.g. JMA Reportage) */}
              {activeEvent.videoUrl && (
                <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <span>Reportage Vidéo Officiel</span>
                  </h4>
                  <div className="video-section-wrapper">
                    <video controls poster={activeEvent.image} style={{ width: '100%' }}>
                      <source src={activeEvent.videoUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                    </video>
                  </div>
                </div>
              )}

              {/* PDF Document Downloads (e.g. FANUS) */}
              {activeEvent.downloads && activeEvent.downloads.length > 0 && (
                <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Ressources & Documents</span>
                  </h4>
                  {activeEvent.downloads.map((doc, idx) => (
                    <a 
                      key={idx}
                      href={doc.url} 
                      download={doc.fileName}
                      className="doc-download-card"
                    >
                      <div className="doc-info">
                        <div className="doc-icon-wrapper">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div className="doc-title">{doc.title}</div>
                          <div className="doc-meta">Format PDF • Cliquez pour télécharger</div>
                        </div>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={(e) => e.stopPropagation()}>
                        Télécharger
                      </button>
                    </a>
                  ))}
                </div>
              )}

              {/* Standard Event Galleries (e.g. AGO 2020) */}
              {!activeEvent.activities && activeEvent.subImages && activeEvent.subImages.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '24px' }}>
                  <h4 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ImageIcon size={18} />
                    <span>Galerie de l'événement ({activeEvent.subImages.length} photos)</span>
                  </h4>
                  <div className="event-grid-photo">
                    {activeEvent.subImages.map((imgUrl, imgIdx) => (
                      <div 
                        key={imgIdx} 
                        className="event-photo-item"
                        onClick={() => openLightbox(activeEvent.subImages, imgIdx)}
                      >
                        <img loading="lazy" src={imgUrl} alt="" />
                        <div className="event-photo-overlay">
                          <span className="event-photo-caption">Photo {imgIdx + 1}</span>
                          <ZoomIn size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setActiveEvent(null)} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal with Arrow Navigation */}
      {lightbox.isOpen && (
        <div className="lightbox" onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))} style={{ zIndex: '2500' }}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}>
              <X size={32} />
            </button>
            
            {lightbox.images.length > 1 && (
              <>
                <button className="slider-btn slider-btn-left" onClick={handlePrevImage} style={{ left: '20px', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none' }}>
                  ‹
                </button>
                <button className="slider-btn slider-btn-right" onClick={handleNextImage} style={{ right: '20px', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none' }}>
                  ›
                </button>
              </>
            )}

            <img loading="lazy" src={lightbox.images[lightbox.currentIndex].url} alt="" className="lightbox-img" style={{ maxHeight: '80vh', objectFit: 'contain' }} />
            
            {lightbox.images[lightbox.currentIndex].caption && (
              <div style={{ 
                color: 'white', 
                textAlign: 'center', 
                marginTop: '12px', 
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: '500',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-block',
                marginLeft: '50%',
                transform: 'translateX(-50%)'
              }}>
                {lightbox.images[lightbox.currentIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}

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
    </div>
  );
}
