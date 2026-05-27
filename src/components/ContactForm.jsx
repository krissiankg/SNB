import React, { useState, useContext, useRef } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function ContactForm() {
  const { addMessage } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // champ honeypot
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Capturer l'instant de montage du composant
  const mountTime = useRef(Date.now());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    // Détection de robot (Honeypot + Délai de soumission inférieur à 3 secondes)
    const timeElapsed = (Date.now() - mountTime.current) / 1000;
    const isSpam = formData.website !== '' || timeElapsed < 3.0;

    // Simuler l'envoi API
    setTimeout(() => {
      if (!isSpam) {
        // Envoi réel à la base (sans le champ Honeypot)
        const { website, ...cleanData } = formData;
        addMessage(cleanData);
      } else {
        console.warn("Spam détecté et bloqué silencieusement.");
      }

      setLoading(false);
      setStatus({ 
        type: 'success', 
        message: 'Votre message a bien été envoyé ! Nos experts vous répondront dans les plus brefs délais.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    }, 1500);
  };

  if (status.type === 'success') {
    return (
      <div className="form-panel text-center" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ display: 'inline-flex', color: 'var(--primary)', marginBottom: '20px' }}>
          <CheckCircle2 size={64} />
        </div>
        <h3 className="pillar-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Message Envoyé !</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 30px' }}>
          {status.message}
        </p>
        <button 
          onClick={() => setStatus({ type: '', message: '' })} 
          className="btn btn-primary"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <h3 className="form-title">Envoyez-nous un Message</h3>
      
      {status.type === 'error' && (
        <div style={{ 
          padding: '12px 16px', 
          backgroundColor: '#FEE2E2', 
          color: '#991B1B', 
          borderRadius: 'var(--radius-sm)', 
          fontSize: '0.9rem',
          marginBottom: '20px',
          borderLeft: '4px solid #EF4444'
        }}>
          {status.message}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nom Complet *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Adresse Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">Sujet *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="form-input"
          placeholder="Quel est l'objet de votre message ?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Message *</label>
        <textarea
          id="message"
          name="message"
          className="form-input form-textarea"
          placeholder="Décrivez votre question ou votre problème de nutrition en détail..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Champ Honeypot masqué pour bloquer les robots de spam */}
      <div style={{ display: 'none', position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Ne rien saisir ici si vous êtes humain</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '10px' }}
        disabled={loading}
      >
        {loading ? (
          <span>Envoi en cours...</span>
        ) : (
          <>
            <Send size={18} />
            <span>ENVOYER LE MESSAGE</span>
          </>
        )}
      </button>
    </form>
  );
}
