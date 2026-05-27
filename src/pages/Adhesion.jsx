import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { Upload, Mail, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Adhesion() {
  const { addAdhesion } = useContext(AppContext);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    website: '' // honeypot
  });
  
  const [letterFile, setLetterFile] = useState(null);
  const [cvFile, setCVFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const letterInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const mountTime = useRef(Date.now());

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileRead = (file, type) => {
    if (file.size > 2 * 1024 * 1024) { // Limite de 2 Mo
      alert("La taille du fichier dépasse la limite autorisée de 2 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = {
        name: file.name,
        data: e.target.result // Chaîne Base64
      };
      if (type === 'letter') {
        setLetterFile(fileData);
      } else {
        setCVFile(fileData);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) handleFileRead(file, type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileRead(file, type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.lastName || !formData.firstName) {
      setStatus({ type: 'error', message: 'Veuillez remplir les champs obligatoires (Nom et Prénoms).' });
      return;
    }

    if (!letterFile || !cvFile) {
      setStatus({ type: 'error', message: 'Veuillez joindre la demande d\'adhésion et votre CV actualisé.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    // Anti-robot
    const timeElapsed = (Date.now() - mountTime.current) / 1000;
    const isSpam = formData.website !== '' || timeElapsed < 3.0;

    const payload = {
      last_name: formData.lastName,
      first_name: formData.firstName,
      email: formData.email,
      application_letter_name: letterFile.name,
      application_letter_data: letterFile.data,
      cv_name: cvFile.name,
      cv_data: cvFile.data
    };

    setTimeout(() => {
      if (!isSpam) {
        addAdhesion(payload);
      } else {
        console.warn("Adhésion bloquée : détection de robot");
      }

      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Votre demande d\'adhésion a été enregistrée avec succès ! Nos équipes analyseront votre dossier et vous contacteront prochainement.'
      });
      setFormData({ lastName: '', firstName: '', email: '', website: '' });
      setLetterFile(null);
      setCVFile(null);
    }, 2000);
  };

  if (status.type === 'success') {
    return (
      <div className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
        <div className="form-panel" style={{ textAlign: 'center', padding: '60px 40px', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'inline-flex', color: '#8b5cf6', marginBottom: '24px' }}>
            <CheckCircle2 size={72} />
          </div>
          <h2 className="form-title" style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--primary)' }}>Candidature Envoyée !</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 32px' }}>
            {status.message}
          </p>
          <button 
            onClick={() => setStatus({ type: '', message: '' })} 
            className="btn"
            style={{ backgroundColor: '#a78bfa', color: 'white', padding: '12px 30px', fontSize: '1rem', fontWeight: '600', borderRadius: 'var(--radius-md)' }}
          >
            Déposer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* En-tête */}
      <section className="hero" style={{ padding: '80px 0 40px', background: 'linear-gradient(135deg, var(--primary) 0%, #004d36 100%)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Devenir Membre / Volontaire</h1>
          <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '10px auto 0' }}>
            Contribuez à améliorer la nutrition des populations du Bénin en rejoignant notre réseau d'experts.
          </p>
        </div>
      </section>

      {/* Formulaire d'adhésion */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <form className="form-panel" onSubmit={handleSubmit} style={{ padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px', borderLeft: '4px solid #8b5cf6', paddingLeft: '16px', fontWeight: '500' }}>
              Pour adhérer à la SNB, veuillez soumettre une demande écrite au Président du Conseil d’Administration accompagnée d’un Curriculum Vitae actualisé.
            </p>

            {status.type === 'error' && (
              <div style={{ padding: '12px 16px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '24px', borderLeft: '4px solid #EF4444' }}>
                {status.message}
              </div>
            )}

            {/* Champs textes */}
            <div className="form-row" style={{ marginBottom: '24px' }}>
              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="votre nom de famille *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Prénoms *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="votre prénom *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ flex: '1.2', position: 'relative' }}>
                <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-dark)' }}>E-mail</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="votre E-mail"
                    style={{ paddingLeft: '36px' }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Uploads */}
            <div className="form-row" style={{ gap: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
              
              {/* Upload 1 : Demande d'adhésion */}
              <div className="form-group" style={{ flex: '1', minWidth: '280px' }}>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: '12px', minHeight: '48px', display: 'block' }}>
                  Joindre une demande d'adhésion adressée au Président de la SNB
                </label>
                
                <div 
                  className={`file-upload-zone ${letterFile ? 'has-file' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'letter')}
                  onClick={() => letterInputRef.current.click()}
                  style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: letterFile ? '#f5f3ff' : '#f8fafc',
                    borderColor: letterFile ? '#a78bfa' : '#cbd5e1',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <input 
                    type="file" 
                    ref={letterInputRef}
                    onChange={(e) => handleFileChange(e, 'letter')}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,image/*"
                  />
                  
                  <div style={{ color: letterFile ? '#8b5cf6' : 'var(--text-muted)', marginBottom: '12px' }}>
                    <Upload size={32} style={{ margin: '0 auto' }} />
                  </div>
                  
                  {letterFile ? (
                    <div>
                      <span style={{ fontWeight: '600', color: '#5b21b6', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                        {letterFile.name}
                      </span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Fichier chargé avec succès. Cliquez pour changer.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: '500' }}>
                        Click or drag a file to this area to upload.
                      </p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        PDF, DOCX ou Image (Max. 2 Mo)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload 2 : CV */}
              <div className="form-group" style={{ flex: '1', minWidth: '280px' }}>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: '12px', minHeight: '48px', display: 'block' }}>
                  Joindre un Curriculum vitae actualisé, daté et signé, de trois pages maximum
                </label>
                
                <div 
                  className={`file-upload-zone ${cvFile ? 'has-file' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'cv')}
                  onClick={() => cvInputRef.current.click()}
                  style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: cvFile ? '#f5f3ff' : '#f8fafc',
                    borderColor: cvFile ? '#a78bfa' : '#cbd5e1',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <input 
                    type="file" 
                    ref={cvInputRef}
                    onChange={(e) => handleFileChange(e, 'cv')}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,image/*"
                  />
                  
                  <div style={{ color: cvFile ? '#8b5cf6' : 'var(--text-muted)', marginBottom: '12px' }}>
                    <Upload size={32} style={{ margin: '0 auto' }} />
                  </div>
                  
                  {cvFile ? (
                    <div>
                      <span style={{ fontWeight: '600', color: '#5b21b6', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                        {cvFile.name}
                      </span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Fichier chargé avec succès. Cliquez pour changer.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: '500' }}>
                        Click or drag a file to this area to upload.
                      </p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        PDF, DOCX ou Image (Max. 2 Mo)
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Honeypot anti-spam masqué */}
            <div style={{ display: 'none', position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Bouton de soumission exact à la capture */}
            <button 
              type="submit" 
              className="btn" 
              disabled={loading}
              style={{ 
                width: '100%', 
                backgroundColor: '#9333ea', /* Couleur violette de la capture */
                color: 'white', 
                fontSize: '1rem', 
                fontWeight: '700', 
                padding: '16px', 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)',
                cursor: 'pointer',
                letterSpacing: '1px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <span>ENVOI EN COURS...</span>
              ) : (
                <span>ENVOYER UNE DEMANDE</span>
              )}
            </button>

          </form>

        </div>
      </section>
    </div>
  );
}
