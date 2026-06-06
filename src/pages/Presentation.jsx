import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, GraduationCap, Users, ChevronLeft, ChevronRight } from 'lucide-react';

function BoardSlider({ team }) {
  if (!team || team.length === 0) return null;

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className="slider-track">
          {team.map((member) => (
            <div key={member.id} className="slider-item">
              <div className="team-card" style={{ height: '100%', marginBottom: 0 }}>
                <div className="team-avatar-wrapper">
                  <img loading="lazy" src={member.image} alt={member.name} className="team-avatar" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {team.map((member) => (
            <div key={`${member.id}-dup`} className="slider-item" aria-hidden="true">
              <div className="team-card" style={{ height: '100%', marginBottom: 0 }}>
                <div className="team-avatar-wrapper">
                  <img loading="lazy" src={member.image} alt={member.name} className="team-avatar" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Presentation() {
  const { team, partners } = useContext(AppContext);

  const objectives = [
    {
      icon: <BookOpen size={24} />,
      text: "Servir de creuset de mise à niveau des connaissances scientifiques et techniques des membres dans le domaine de la nutrition et de la sécurité alimentaire."
    },
    {
      icon: <GraduationCap size={24} />,
      text: "Capitaliser les connaissances scientifiques et techniques en nutrition et en sécurité alimentaire et leurs disséminations auprès des intervenants."
    },
    {
      icon: <Award size={24} />,
      text: "Promouvoir la production de travaux scientifiques et la mise en application des résultats de recherche qui proposent des solutions appropriées aux problèmes de la nutrition et de la sécurité alimentaire au Bénin."
    },
    {
      icon: <Users size={24} />,
      text: "Améliorer les compétences des intervenants en nutrition et sécurité alimentaire, et la qualité des interventions en nutrition au Bénin."
    }
  ];

  return (
    <div>
      {/* Header section */}
      <section className="hero" style={{ padding: '100px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Qui Sommes-Nous&nbsp;?</h1>
          <p className="hero-subtitle">
            Nutrition et alimentation saine pour la santé et le développement durable
          </p>
        </div>
      </section>

      {/* Main presentation text */}
      <section className="section">
        <div className="container">
          <div className="presentation-intro-card">
            <div className="presentation-grid">
              <div className="presentation-img-wrapper">
                <img loading="lazy" src="/media/photo-de-famille-10.jpg" 
                  alt="Réunion SNB" 
                  className="presentation-img"
                />
              </div>
              <div className="presentation-text-block">
                <h3>La Société de Nutrition du Bénin (SNB)</h3>
                <p>
                  Est une association apolitique et à but non-lucratif régie par la loi du 1er juillet 1901 et le décret du 16 août 1901 portant création des associations. 
                  Elle est une société savante initiée dans les années 1990 et officiellement créée le 27 novembre 2010 à Abomey-Calavi en République du Bénin. 
                  Enregistrée sous le numéro 2011/0420/DEP-ATL-LITT/SG/SGA-ASSOC du 15/09/2011 et publiée dans le journal officiel N° 07, 123e Année du 1er avril 2012.
                </p>
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="objectives-card">
            <h3 className="objectives-title">Nos Objectifs</h3>
            <div className="objectives-grid">
              {objectives.map((obj, index) => (
                <div key={index} className="objective-item">
                  <div className="objective-icon">{obj.icon}</div>
                  <p className="objective-text">{obj.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Administration Board */}
          <div style={{ marginTop: '80px' }}>
            <div className="section-title-wrapper">
              <h2 className="section-title">Conseil d'Administration</h2>
              <p className="section-subtitle">
                Les membres dévoués qui dirigent notre société savante et guident nos actions au quotidien.
              </p>
            </div>

            <BoardSlider team={team} />
          </div>

          {/* Eligibility info */}
          <div className="adhesion-banner" style={{ marginTop: '80px', background: 'var(--secondary)' }}>
            <h3 className="adhesion-title" style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: '16px' }}>
              Qui Peut Adhérer&nbsp;?
            </h3>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', opacity: '0.95', lineHeight: '1.7' }}>
              Tout professionnel de nutrition de niveau académique minimum Licence en Science de nutrition, jouissant de ses droits civiques, travaillant au Bénin et qui accepte les idéaux de la Société peut faire partie de la SNB.
            </p>
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
