import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Shield, FileText, Cookie, AlertCircle } from 'lucide-react';

export default function Legal() {
  const { contact } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('privacy'); // privacy, mentions, cookies

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="legal-page-wrapper">
      {/* Header section */}
      <section className="hero" style={{ padding: '80px 0 40px', background: 'var(--primary-dark)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: '#FFFFFF', marginBottom: '10px' }}>Mentions Légales & RGPD</h1>
          <p className="hero-subtitle" style={{ color: 'var(--accent)' }}>
            Société de Nutrition du Bénin (SNB)
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="section" style={{ paddingTop: '30px' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            <button 
              className={`btn ${activeTab === 'privacy' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('privacy')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
            >
              <Shield size={18} />
              <span>Politique de Confidentialité</span>
            </button>
            <button 
              className={`btn ${activeTab === 'mentions' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('mentions')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
            >
              <FileText size={18} />
              <span>Mentions Légales</span>
            </button>
            <button 
              className={`btn ${activeTab === 'cookies' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('cookies')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
            >
              <Cookie size={18} />
              <span>Gestion des Cookies</span>
            </button>
          </div>

          <div className="legal-content-card" style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)',
            lineHeight: '1.8',
            color: 'var(--text-dark)'
          }}>
            {activeTab === 'privacy' && (
              <div>
                <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px' }}>
                  Politique de Confidentialité & Protection des Données (RGPD / Loi Béninoise N° 2017-20)
                </h2>
                <p>
                  La <strong>Société de Nutrition du Bénin (SNB)</strong> s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne et à la <strong>Loi N° 2017-20 portant Code du Numérique en République du Bénin</strong> (Livre V relatif à la protection des données à caractère personnel).
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>1. Responsable du Traitement</h3>
                <p>
                  Les données à caractère personnel collectées sur ce site sont traitées par :<br />
                  <strong>Société de Nutrition du Bénin (SNB)</strong><br />
                  Siège social : {contact.address || "Campus d'Abomey-Calavi, 03 BP 2819, Cotonou, Bénin"}<br />
                  Email de contact : <a href={`mailto:${contact.email}`} style={{ color: 'var(--primary)' }}>{contact.email}</a>
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>2. Données Collectées & Finalités</h3>
                <p>
                  Nous collectons uniquement les informations nécessaires pour vous fournir nos services et traiter vos demandes :
                </p>
                <ul>
                  <li>
                    <strong>Formulaire de Contact</strong> : En remplissant ce formulaire, vous nous transmettez votre <em>Nom</em>, <em>Prénom</em>, <em>Adresse Email</em>, l'<em>Objet</em> de votre message et votre <em>Message</em>. Ces données sont utilisées exclusivement pour répondre à vos demandes d'informations et assurer le suivi de nos échanges.
                  </li>
                  <li>
                    <strong>Formulaire d'Adhésion</strong> : Lorsque vous déposez une candidature pour devenir membre, nous collectons votre <em>Nom</em>, <em>Prénom</em>, <em>Adresse Email</em>, ainsi que vos pièces jointes (<em>Lettre d'adhésion</em> et <em>Curriculum Vitae</em>). Ces informations sont indispensables pour l'examen de votre éligibilité par le Bureau Exécutif.
                  </li>
                </ul>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>3. Base Légale du Traitement</h3>
                <p>
                  Le traitement de vos données repose sur votre <strong>consentement libre, spécifique, éclairé et univoque</strong>, manifesté par le clic de validation lors de la soumission de nos formulaires en ligne. Vous pouvez retirer votre consentement à tout moment en nous contactant.
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>4. Destinataires et Transfert des Données</h3>
                <p>
                  Les données collectées sont destinées <strong>uniquement</strong> aux membres habilités du secrétariat et du Bureau de la Société de Nutrition du Bénin. 
                  En aucun cas, vos informations personnelles ne seront vendues, louées, partagées ou cédées à des tiers à des fins commerciales.
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>5. Durée de Conservation des Données</h3>
                <p>
                  Vos informations sont conservées pendant des durées proportionnelles aux objectifs poursuivis :
                </p>
                <ul>
                  <li><strong>Messages de contact</strong> : Conservés pendant une durée maximale de 1 an après la fin du traitement de votre demande.</li>
                  <li><strong>Dossiers d'adhésion</strong> : Si votre adhésion est validée, vos données sont conservées pendant toute la durée de votre adhésion. Si votre dossier est rejeté, vos fichiers et données sont supprimés de nos serveurs sous 6 mois.</li>
                </ul>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>6. Vos Droits (Loi N° 2017-20 & RGPD)</h3>
                <p>
                  Conformément au Code du Numérique du Bénin et au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul>
                  <li><strong>Droit d'accès</strong> : Obtenir la confirmation que des données vous concernant sont traitées et en recevoir copie.</li>
                  <li><strong>Droit de rectification</strong> : Demander la correction de données inexactes, incomplètes ou obsolètes.</li>
                  <li><strong>Droit à l'effacement (Droit à l'oubli)</strong> : Demander la suppression définitive de vos données personnelles.</li>
                  <li><strong>Droit d'opposition</strong> : Vous opposer à tout moment au traitement de vos données pour des motifs légitimes.</li>
                  <li><strong>Droit à la limitation</strong> : Demander le gel temporaire du traitement de vos données dans certaines situations.</li>
                </ul>
                <p>
                  Pour exercer l'un de ces droits, veuillez adresser votre demande par courrier électronique à l'adresse suivante : 
                  <a href={`mailto:${contact.email}`} style={{ color: 'var(--primary)', fontWeight: '600' }}> {contact.email}</a>. Nous nous efforcerons de répondre à votre demande dans les meilleurs délais (maximum 1 mois).
                </p>
              </div>
            )}

            {activeTab === 'mentions' && (
              <div>
                <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px' }}>
                  Mentions Légales
                </h2>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>1. Éditeur du Site</h3>
                <p>
                  Le présent site internet est édité par la <strong>Société de Nutrition du Bénin (SNB)</strong>.<br />
                  Statut : Association scientifique apolitique et à but non lucratif régie par la loi du 1er juillet 1901 et le décret du 16 août 1901.<br />
                  Enregistrement officiel : N° 2011/0420/DEP-ATL-LITT/SG/SGA-ASSOC du 15/09/2011 (Journal Officiel N° 07 du 1er avril 2012).<br />
                  Siège social : {contact.address || "Campus d'Abomey-Calavi, 03 BP 2819, Cotonou, Bénin"}<br />
                  Directeur de la publication : Le Président de la SNB, Dr Ir Evariste Mitchikpè.<br />
                  Email : <a href={`mailto:${contact.email}`} style={{ color: 'var(--primary)' }}>{contact.email}</a><br />
                  Téléphone : <a href={`tel:${contact.phone}`} style={{ color: 'var(--primary)' }}>{contact.phone}</a>
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>2. Hébergement du Site</h3>
                <p>
                  Ce site est hébergé par :<br />
                  <strong>GUELICHWEB</strong><br />
                  Site web : <a href="https://guelichweb.online/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://guelichweb.online/</a>
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>3. Propriété Intellectuelle</h3>
                <p>
                  L'ensemble des contenus de ce site (structure générale, textes, logos, chartes graphiques, photographies de terrain, illustrations et documents téléchargeables) sont la propriété exclusive de la <strong>Société de Nutrition du Bénin (SNB)</strong> ou font l'objet d'une autorisation d'utilisation.<br />
                  Toute reproduction, représentation, modification ou diffusion totale ou partielle de ces éléments, par quelque procédé que ce soit, sans l'accord écrit préalable de la SNB est strictement interdite et peut constituer une contrefaçon sanctionnée par la législation nationale et internationale sur le droit d'auteur.
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>4. Limitation de Responsabilité</h3>
                <p>
                  La SNB s'efforce de fournir sur ce site des informations scientifiques et administratives aussi précises et à jour que possible. Néanmoins, elle ne saurait être tenue responsable des omissions, des inexactitudes ou des retards dans la mise à jour des informations.<br />
                  Le site peut contenir des liens vers des sites externes (partenaires, revues scientifiques, etc.). La SNB ne dispose d'aucun moyen de contrôle sur ces sites et décline toute responsabilité quant à leurs contenus, politiques de confidentialité ou de sécurité.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div>
                <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px' }}>
                  Politique d'Utilisation des Cookies
                </h2>
                
                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>Qu'est-ce qu'un cookie ?</h3>
                <p>
                  Un cookie est un petit fichier texte stocké par votre navigateur sur votre ordinateur ou votre appareil mobile lors de la consultation d'un site internet. Il permet de retenir vos choix et vos préférences d'utilisation pendant une durée limitée.
                </p>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>1. Cookies de Fonctionnement (Essentiels)</h3>
                <p>
                  Ce site internet utilise uniquement des variables de stockage technique nécessaires à son fonctionnement optimal :
                </p>
                <ul>
                  <li><strong>Cookies de Session d'Administration</strong> : Permettent de mémoriser votre état de connexion à la console d'administration pendant votre navigation afin que vous n'ayez pas à ressaisir votre mot de passe à chaque changement d'onglet.</li>
                  <li><strong>Stockage Local (LocalStorage)</strong> : Utilisé de manière exclusive pour enregistrer temporairement et sécuriser vos préférences d'affichage ou vos brouillons d'édition locale avant la synchronisation cloud avec Supabase.</li>
                </ul>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>2. Cookies Tiers de Profilage ou Publicitaires</h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  backgroundColor: '#F0FDF4', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #BBF7D0',
                  marginTop: '15px',
                  marginBottom: '20px'
                }}>
                  <AlertCircle size={22} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Respect total de la vie privée :</strong><br />
                    Notre site web n'embarque <strong>aucun cookie publicitaire</strong>, aucun tracker de réseau social commercial (pixel Facebook, LinkedIn), et aucun cookie de ciblage tiers. Nous respectons votre vie privée et ne suivons pas votre comportement de navigation à des fins de profilage.
                  </div>
                </div>

                <h3 style={{ color: 'var(--primary-dark)', marginTop: '30px', marginBottom: '10px' }}>3. Gestion et Suppression</h3>
                <p>
                  Vous pouvez paramétrer votre navigateur internet pour refuser systématiquement le dépôt de cookies ou de données de stockage local. Cependant, veuillez noter que le refus de ces données techniques empêchera le bon fonctionnement de la console d'administration de la SNB.
                </p>
                <p>
                  Pour savoir comment gérer les cookies sur votre navigateur :
                </p>
                <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/fr/kb/autoriser-bloquer-cookies" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Apple Safari</a></li>
                  <li><a href="https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Microsoft Edge</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
