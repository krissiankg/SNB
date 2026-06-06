import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Plus, Edit3, Trash2, Lock, LogOut, FileText, Users, 
  Settings, Image as ImageIcon, Contact as ContactIcon, Check, Info, HeartHandshake, Calendar, Globe, Mail
} from 'lucide-react';

const downloadBase64File = (base64Data, fileName) => {
  if (!base64Data) return;
  try {
    const parts = base64Data.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    
    const blob = new Blob([uInt8Array], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Erreur de décodage et de téléchargement de la pièce jointe :", e);
    alert("Impossible de télécharger le fichier. Les données sont peut-être incorrectes.");
  }
};

export default function Dashboard() {
  const {
    announcements, addAnnouncement, editAnnouncement, deleteAnnouncement,
    team, addTeamMember, editTeamMember, deleteTeamMember,
    activities, addActivity, editActivity, deleteActivity,
    gallery, addGalleryPhoto, deleteGalleryPhoto,
    partners, addPartner, deletePartner,
    events, addEvent, editEvent, deleteEvent,
    contact, updateContact,
    tickerText, updateTickerText,
    messages, deleteMessage, markMessageAsRead,
    adhesions, deleteAdhesion, changeAdhesionStatus,
    cloudConfig, updateCloudConfig,
    setActivePage,
    currentUser, setCurrentUser,
    auditLogs, logActivity
  } = useContext(AppContext);

  // Auth State
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('snb_current_user');
  });
  const [authError, setAuthError] = useState('');

  // Dashboard Nav Tab State
  const [activeTab, setActiveTab] = useState('announcements'); // announcements, team, activities, gallery, partners, events, contact, audit_logs

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState('');

  // Individual Form states
  const [announcementForm, setAnnouncementForm] = useState({ title: '', theme: '', text: '', date: '', image: '', fullText: '' });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', image: '' });
  const [activityForm, setActivityForm] = useState({ title: '', description: '', image: '' });
  const [galleryForm, setGalleryForm] = useState({ url: '', caption: '' });
  const [partnerForm, setPartnerForm] = useState({ name: '', logo: '' });
  const [contactForm, setContactForm] = useState({ 
    ...contact,
    linkedin: contact.linkedin || '',
    customSocials: contact.customSocials || []
  });
  
  React.useEffect(() => {
    setContactForm({ 
      ...contact,
      linkedin: contact.linkedin || '',
      customSocials: contact.customSocials || []
    });
  }, [contact]);
  
  const [eventForm, setEventForm] = useState({ title: '', date: '', description: '', fullText: '', image: '', videoUrl: '', subImages: [] });
  const [tickerInput, setTickerInput] = useState(tickerText);

  const [showCloudSettings, setShowCloudSettings] = useState(false);
  const [tempCloudConfig, setTempCloudConfig] = useState({
    enabled: cloudConfig.enabled,
    supabaseUrl: cloudConfig.supabaseUrl || '',
    supabaseAnonKey: cloudConfig.supabaseAnonKey || ''
  });
  
  React.useEffect(() => {
    setTempCloudConfig({
      enabled: cloudConfig.enabled,
      supabaseUrl: cloudConfig.supabaseUrl || '',
      supabaseAnonKey: cloudConfig.supabaseAnonKey || ''
    });
  }, [cloudConfig]);

  // Handle Auth
  const handleLogin = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setAuthError('Veuillez entrer votre nom.');
      return;
    }
    if (password === 'snbpasse') {
      setCurrentUser(usernameInput.trim());
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Mot de passe incorrect.');
    }
  };

  // Trace la connexion de session
  React.useEffect(() => {
    if (isAuthenticated && currentUser) {
      const hasLoggedSession = sessionStorage.getItem('snb_session_logged');
      if (!hasLoggedSession) {
        logActivity("Connexion", `${currentUser} s'est connecté au tableau de bord.`);
        sessionStorage.setItem('snb_session_logged', 'true');
      }
    } else if (!isAuthenticated) {
      sessionStorage.removeItem('snb_session_logged');
    }
  }, [isAuthenticated, currentUser]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Modal controls
  const openAddModal = () => {
    setModalMode('add');
    setEditingItem(null);
    // Reset forms
    setAnnouncementForm({ title: '', theme: '', text: '', date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800', fullText: '' });
    setTeamForm({ name: '', role: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' });
    setActivityForm({ title: '', description: '', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' });
    setGalleryForm({ url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800', caption: '' });
    setPartnerForm({ name: '', logo: 'https://snb.bj/wp-content/uploads/2023/10/logo-irsp.png' });
    setEventForm({ title: '', date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), description: '', fullText: '', image: '/media/photo-de-famille-1.jpg', videoUrl: '', subImages: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setEditingItem(item);
    if (activeTab === 'announcements') setAnnouncementForm({ ...item, fullText: item.fullText || '' });
    if (activeTab === 'team') setTeamForm({ ...item });
    if (activeTab === 'activities') setActivityForm({ ...item });
    if (activeTab === 'events') setEventForm({ ...item, subImages: item.subImages || [] });
    setIsModalOpen(true);
  };

  // Submit operations
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'announcements') {
      if (modalMode === 'add') {
        addAnnouncement(announcementForm);
        showNotification('Annonce ajoutée avec succès !');
      } else {
        editAnnouncement(announcementForm);
        showNotification('Annonce modifiée avec succès !');
      }
    } else if (activeTab === 'team') {
      if (modalMode === 'add') {
        addTeamMember(teamForm);
        showNotification('Membre ajouté avec succès !');
      } else {
        editTeamMember(teamForm);
        showNotification('Membre modifié avec succès !');
      }
    } else if (activeTab === 'activities') {
      if (modalMode === 'add') {
        addActivity(activityForm);
        showNotification('Activité ajoutée avec succès !');
      } else {
        editActivity(activityForm);
        showNotification('Activité modifiée avec succès !');
      }
    } else if (activeTab === 'gallery') {
      addGalleryPhoto(galleryForm);
      showNotification('Photo ajoutée avec succès !');
    } else if (activeTab === 'partners') {
      addPartner(partnerForm);
      showNotification('Partenaire ajouté avec succès !');
    } else if (activeTab === 'events') {
      const subImagesArray = typeof eventForm.subImages === 'string'
        ? eventForm.subImages.split(',').map(s => s.trim()).filter(Boolean)
        : eventForm.subImages;
      
      const processedForm = { ...eventForm, subImages: subImagesArray };
      
      if (modalMode === 'add') {
        addEvent(processedForm);
        showNotification('Événement ajouté avec succès !');
      } else {
        editEvent(processedForm);
        showNotification('Événement modifié avec succès !');
      }
    }
    setIsModalOpen(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    updateContact(contactForm);
    showNotification('Coordonnées de contact mises à jour !');
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      if (activeTab === 'announcements') deleteAnnouncement(id);
      if (activeTab === 'team') deleteTeamMember(id);
      if (activeTab === 'activities') deleteActivity(id);
      if (activeTab === 'gallery') deleteGalleryPhoto(id);
      if (activeTab === 'partners') deletePartner(id);
      if (activeTab === 'events') deleteEvent(id);
      showNotification('Élément supprimé avec succès !');
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="login-gate-container">
        <div className="login-card">
          <div className="login-icon-wrapper">
            <Lock size={32} />
          </div>
          <h2 className="login-title">Administration SNB</h2>
          <p className="login-subtitle">Veuillez saisir le mot de passe administrateur pour accéder à l'édition.</p>
          
          <form onSubmit={handleLogin}>
            {authError && (
              <div style={{ color: '#DC2626', fontSize: '0.85rem', marginBottom: '16px', backgroundColor: '#FEE2E2', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                {authError}
              </div>
            )}
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label" htmlFor="username">Nom complet</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Ex: Dr Ir Evariste Mitchikpè"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
                style={{ marginBottom: '16px' }}
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label" htmlFor="pass">Mot de passe</label>
              <input
                type="password"
                id="pass"
                className="form-input"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Se Connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar navigation */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <img loading="lazy" src="/media/LOGO-SNB.png" 
            alt="SNB Logo" 
            style={{ height: '35px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--accent)' }}>Dashboard</h3>
            <span style={{ fontSize: '0.75rem', opacity: '0.7' }}>Société de Nutrition</span>
          </div>
        </div>
        
        <ul className="dashboard-menu">
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              <FileText size={18} />
              <span>Annonces & Actus</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <Users size={18} />
              <span>Membres CA</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'activities' ? 'active' : ''}`}
              onClick={() => setActiveTab('activities')}
            >
              <Settings size={18} />
              <span>Activités</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              <ImageIcon size={18} />
              <span>Galerie Photo</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'partners' ? 'active' : ''}`}
              onClick={() => setActiveTab('partners')}
            >
              <HeartHandshake size={18} />
              <span>Partenaires</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={18} />
              <span>Rapports & Événements</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <ContactIcon size={18} />
              <span>Infos Contact</span>
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <Mail size={18} />
              <span>Messages Reçus</span>
              {messages && messages.filter(m => !m.read).length > 0 && (
                <span style={{ 
                  backgroundColor: '#E5BA73', 
                  color: 'var(--primary)', 
                  fontSize: '0.7rem', 
                  fontWeight: '700', 
                  padding: '2px 6px', 
                  borderRadius: '999px', 
                  marginLeft: 'auto' 
                }}>
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'adhesions' ? 'active' : ''}`}
              onClick={() => setActiveTab('adhesions')}
            >
              <Users size={18} />
              <span>Demandes d'Adhésion</span>
              {adhesions && adhesions.filter(a => a.status === 'En attente').length > 0 && (
                <span style={{ 
                  backgroundColor: '#8b5cf6', 
                  color: 'white', 
                  fontSize: '0.7rem', 
                  fontWeight: '700', 
                  padding: '2px 6px', 
                  borderRadius: '999px', 
                  marginLeft: 'auto' 
                }}>
                  {adhesions.filter(a => a.status === 'En attente').length}
                </span>
              )}
            </button>
          </li>
          <li className="dashboard-menu-item">
            <button 
              className={`dashboard-menu-btn ${activeTab === 'audit_logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('audit_logs')}
            >
              <FileText size={18} />
              <span>Journal d'Activité</span>
            </button>
          </li>
        </ul>

        <div className="dashboard-logout" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="dashboard-menu-btn" 
            style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Globe size={18} />
            <span>Voir le Site ↗</span>
          </a>
          <button 
            className="dashboard-menu-btn" 
            style={{ color: '#FCA5A5' }}
            onClick={() => {
              logActivity("Déconnexion", `${currentUser} s'est déconnecté.`);
              setCurrentUser('');
              setIsAuthenticated(false);
              setActivePage('accueil');
              window.history.pushState(null, '', '/');
            }}
          >
            <LogOut size={18} />
            <span>Se Déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content-area">
        {/* Title bar */}
        <div className="dashboard-section-header">
          <div>
            <h2 className="dashboard-section-title">
              {activeTab === 'announcements' && 'Gestion des Annonces'}
              {activeTab === 'team' && 'Gestion du Conseil d\'Administration'}
              {activeTab === 'activities' && 'Gestion des Activités'}
              {activeTab === 'gallery' && 'Gestion de la Galerie'}
              {activeTab === 'partners' && 'Gestion des Partenaires'}
              {activeTab === 'events' && 'Gestion des Rapports & Événements'}
              {activeTab === 'contact' && 'Coordonnées de Contact'}
              {activeTab === 'messages' && 'Messages Reçus'}
              {activeTab === 'adhesions' && 'Demandes d\'Adhésion'}
              {activeTab === 'audit_logs' && 'Journal d\'Activité & Logs d\'Audit'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {activeTab === 'announcements' && 'Créez, modifiez ou supprimez les articles d\'actualités de la page d\'accueil.'}
              {activeTab === 'team' && 'Gérez les profils et les rôles des membres du bureau.'}
              {activeTab === 'activities' && 'Mettez à jour la liste des activités principales de la SNB.'}
              {activeTab === 'gallery' && 'Gérez les images présentées dans la galerie photo de terrain.'}
              {activeTab === 'partners' && 'Gérez les logos des organisations partenaires affichés en bas du site.'}
              {activeTab === 'events' && 'Gérez les rapports d\'activités détaillés et les galeries photo d\'événements.'}
              {activeTab === 'contact' && 'Modifiez les numéros, emails, adresses physiques et liens de réseaux sociaux.'}
              {activeTab === 'messages' && 'Consultez et gérez les messages envoyés par les visiteurs via le formulaire de contact.'}
              {activeTab === 'adhesions' && 'Consultez et gérez les dossiers de candidature d\'adhésion soumis en ligne.'}
              {activeTab === 'audit_logs' && 'Consultez l\'historique des modifications, ajouts, suppressions et connexions des 30 derniers jours.'}
            </p>
          </div>
          
          {activeTab !== 'contact' && activeTab !== 'messages' && activeTab !== 'adhesions' && activeTab !== 'audit_logs' && (
            <button className="btn btn-primary" onClick={openAddModal} style={{ boxShadow: '0 4px 12px rgba(0, 91, 65, 0.2)' }}>
              <Plus size={18} />
              <span>
                {activeTab === 'announcements' && 'Créer un article'}
                {activeTab === 'team' && 'Ajouter un membre'}
                {activeTab === 'activities' && 'Ajouter une activité'}
                {activeTab === 'gallery' && 'Ajouter une photo'}
                {activeTab === 'partners' && 'Ajouter un partenaire'}
                {activeTab === 'events' && 'Ajouter un événement'}
              </span>
            </button>
          )}
        </div>

        {/* Dynamic tables/forms */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px' }}>
            {/* Scrolling Banner editor */}
            <form className="form-panel" onSubmit={(e) => {
              e.preventDefault();
              updateTickerText(tickerInput);
              showNotification('Banderole déroulante mise à jour avec succès !');
            }}>
              <h3 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '16px' }}>
                Banderole Déroulante (Accueil)
              </h3>
              <div className="form-group">
                <label className="form-label" htmlFor="ticker">Texte défilant d'annonce</label>
                <input 
                  type="text" 
                  id="ticker"
                  className="form-input" 
                  value={tickerInput}
                  onChange={(e) => setTickerInput(e.target.value)}
                  placeholder="Ex: ⚠️ Événement à venir : Conférence nationale..."
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                Mettre à jour la banderole
              </button>
            </form>

            <div className="db-table-card">
              <table className="db-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Thème / Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.image} alt="" className="db-table-thumb" />
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.title}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{item.theme}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</div>
                    </td>
                    <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-edit" onClick={() => openEditModal(item)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

        {activeTab === 'team' && (
          <div className="db-table-card">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Nom complet</th>
                  <th>Poste / Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.image} alt="" className="db-table-thumb" style={{ borderRadius: '50%' }} />
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.name}</td>
                    <td>{item.role}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-edit" onClick={() => openEditModal(item)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="db-table-card">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre de l'axe</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.image} alt="" className="db-table-thumb" />
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.title}</td>
                    <td style={{ maxWidth: '400px' }}>{item.description}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-edit" onClick={() => openEditModal(item)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="db-table-card">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>URL de l'image</th>
                  <th>Légende</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gallery.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.url} alt="" className="db-table-thumb" />
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.url}</td>
                    <td>{item.caption || 'Aucune légende'}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="db-table-card">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Nom de l'organisation</th>
                  <th>Lien du logo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.logo} alt="" className="db-table-thumb" style={{ objectFit: 'contain', backgroundColor: '#F8FAFC' }} />
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.name}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.logo}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="db-table-card">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img loading="lazy" src={item.image} alt="" className="db-table-thumb" />
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.title}</td>
                    <td>{item.date}</td>
                    <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</td>
                    <td>
                      <div className="db-actions-cell">
                        <button className="db-action-btn db-action-edit" onClick={() => openEditModal(item)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="db-action-btn db-action-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'contact' && (
          <form className="form-panel" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="address">Adresse Physique</label>
              <input
                type="text"
                id="address"
                className="form-input"
                value={contactForm.address}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Adresse Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Téléphone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-input"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '30px', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <h4 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>Réseaux Sociaux</h4>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fb">Lien Facebook</label>
                <input
                  type="url"
                  id="fb"
                  className="form-input"
                  value={contactForm.facebook}
                  onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tw">Lien Twitter/X</label>
                <input
                  type="url"
                  id="tw"
                  className="form-input"
                  value={contactForm.twitter}
                  onChange={(e) => setContactForm({ ...contactForm, twitter: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="ig">Lien Instagram</label>
                <input
                  type="url"
                  id="ig"
                  className="form-input"
                  value={contactForm.instagram}
                  onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="yt">Lien YouTube</label>
                <input
                  type="url"
                  id="yt"
                  className="form-input"
                  value={contactForm.youtube}
                  onChange={(e) => setContactForm({ ...contactForm, youtube: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="ln">Lien LinkedIn</label>
                <input
                  type="url"
                  id="ln"
                  className="form-input"
                  placeholder="https://linkedin.com/company/..."
                  value={contactForm.linkedin || ''}
                  onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">&nbsp;</label>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '8px' }}>
                  Renseignez vos réseaux officiels pour les afficher sur le site.
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: 0 }}>Autres Réseaux Sociaux Personnalisés</h4>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => {
                  const newCustom = [...(contactForm.customSocials || [])];
                  newCustom.push({ id: Date.now(), name: '', value: '' });
                  setContactForm({ ...contactForm, customSocials: newCustom });
                }}
              >
                + Ajouter un réseau
              </button>
            </div>

            {(!contactForm.customSocials || contactForm.customSocials.length === 0) ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '20px' }}>
                Aucun réseau personnalisé ajouté. Cliquez sur le bouton ci-dessus pour en ajouter (ex: TikTok, WhatsApp, etc.).
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {contactForm.customSocials.map((social, index) => (
                  <div key={social.id || index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
                      <label className="form-label">Nom du Réseau (ex: TikTok)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Ex: TikTok"
                        value={social.name}
                        required
                        onChange={(e) => {
                          const newCustom = [...contactForm.customSocials];
                          newCustom[index].name = e.target.value;
                          setContactForm({ ...contactForm, customSocials: newCustom });
                        }}
                      />
                    </div>
                    <div className="form-group" style={{ flex: '2', minWidth: '250px' }}>
                      <label className="form-label">URL du profil</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://..."
                        value={social.value}
                        required
                        onChange={(e) => {
                          const newCustom = [...contactForm.customSocials];
                          newCustom[index].value = e.target.value;
                          setContactForm({ ...contactForm, customSocials: newCustom });
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ padding: '10px 14px', marginBottom: '0px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => {
                        const newCustom = contactForm.customSocials.filter((_, idx) => idx !== index);
                        setContactForm({ ...contactForm, customSocials: newCustom });
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Sauvegarder les Coordonnées
            </button>
          </form>
        )}

        {activeTab === 'messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


            {!messages || messages.length === 0 ? (
              <div className="form-panel" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <Mail size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Aucun message reçu</h4>
                <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  Les messages envoyés par les visiteurs via le formulaire de la page contact apparaîtront ici.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="form-panel" 
                    style={{ 
                      borderLeft: msg.read ? 'none' : '4px solid var(--primary)',
                      position: 'relative',
                      cursor: msg.read ? 'default' : 'pointer'
                    }}
                    onClick={() => {
                      if (!msg.read) markMessageAsRead(msg.id);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <div>
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-dark)' }}>{msg.subject}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          De : <strong style={{ color: 'var(--text-dark)' }}>{msg.name}</strong> ({msg.email})
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '6px 10px', height: 'auto', display: 'flex', alignItems: 'center', minHeight: 'auto', margin: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Voulez-vous supprimer ce message ?')) {
                              deleteMessage(msg.id);
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-dark)', whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'adhesions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!adhesions || adhesions.length === 0 ? (
              <div className="form-panel" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Aucune demande d'adhésion</h4>
                <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  Les dossiers de candidatures et demandes d'adhésion des volontaires apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="db-table-card">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Candidat</th>
                      <th>Email</th>
                      <th>Lettre d'Adhésion</th>
                      <th>CV (Curriculum)</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adhesions.map((adh) => (
                      <tr key={adh.id}>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adh.date}</td>
                        <td style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                          {adh.last_name ? adh.last_name.toUpperCase() : ''} {adh.first_name || ''}
                        </td>
                        <td>
                          {adh.email ? (
                            <a href={`mailto:${adh.email}`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{adh.email}</a>
                          ) : (
                            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Non renseigné</span>
                          )}
                        </td>
                        <td>
                          {adh.application_letter_data ? (
                            <button 
                              type="button"
                              className="btn btn-secondary" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}
                              onClick={() => downloadBase64File(adh.application_letter_data, adh.application_letter_name || `Lettre_Adhesion_${adh.last_name}.pdf`)}
                            >
                              <FileText size={14} />
                              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {adh.application_letter_name || "Télécharger"}
                              </span>
                            </button>
                          ) : (
                            <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>Absente</span>
                          )}
                        </td>
                        <td>
                          {adh.cv_data ? (
                            <button 
                              type="button"
                              className="btn btn-secondary" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}
                              onClick={() => downloadBase64File(adh.cv_data, adh.cv_name || `CV_${adh.last_name}.pdf`)}
                            >
                              <FileText size={14} />
                              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {adh.cv_name || "Télécharger"}
                              </span>
                            </button>
                          ) : (
                            <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>Absent</span>
                          )}
                        </td>
                        <td>
                          <span style={{ 
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: adh.status === 'Accepté' ? '#D1FAE5' : adh.status === 'Refusé' ? '#FEE2E2' : '#FEF3C7',
                            color: adh.status === 'Accepté' ? '#065F46' : adh.status === 'Refusé' ? '#981B1B' : '#92400E'
                          }}>
                            {adh.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                            <button 
                              type="button"
                              className="btn" 
                              style={{ padding: '4px 8px', height: 'auto', minHeight: 'auto', fontSize: '0.75rem', margin: 0, backgroundColor: '#D1FAE5', color: '#065F46', border: '1px solid #A7F3D0' }}
                              onClick={() => changeAdhesionStatus(adh.id, 'Accepté')}
                              title="Accepter"
                            >
                              Accepter
                            </button>
                            <button 
                              type="button"
                              className="btn" 
                              style={{ padding: '4px 8px', height: 'auto', minHeight: 'auto', fontSize: '0.75rem', margin: 0, backgroundColor: '#FEE2E2', color: '#981B1B', border: '1px solid #FCA5A5' }}
                              onClick={() => changeAdhesionStatus(adh.id, 'Refusé')}
                              title="Refuser"
                            >
                              Refuser
                            </button>
                            <button 
                              type="button"
                              className="btn btn-danger" 
                              style={{ padding: '6px 10px', height: 'auto', minHeight: 'auto', margin: 0 }}
                              onClick={() => {
                                if (window.confirm('Voulez-vous supprimer cette candidature ?')) {
                                  deleteAdhesion(adh.id);
                                }
                              }}
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'audit_logs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!auditLogs || auditLogs.length === 0 ? (
              <div className="form-panel" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Aucune activité enregistrée</h4>
                <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  L'historique des actions d'administration s'affichera ici au fur et à mesure des modifications.
                </p>
              </div>
            ) : (
              <div className="db-table-card">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th style={{ width: '200px' }}>Date & Heure</th>
                      <th style={{ width: '220px' }}>Administrateur</th>
                      <th style={{ width: '200px' }}>Action</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => {
                      const isCritical = log.action.toLowerCase().includes('suppr') || log.action.toLowerCase().includes('décon');
                      const isSuccess = log.action.toLowerCase().includes('connex') || log.action.toLowerCase().includes('ajout');
                      return (
                        <tr key={log.id || log.created_at + Math.random()}>
                          <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {new Date(log.created_at).toLocaleString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </td>
                          <td style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>
                            {log.user_name}
                          </td>
                          <td>
                            <span style={{ 
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              backgroundColor: isCritical ? '#FEE2E2' : isSuccess ? '#D1FAE5' : '#FEF3C7',
                              color: isCritical ? '#981B1B' : isSuccess ? '#065F46' : '#92400E'
                            }}>
                              {log.action}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                            {log.details}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Modals for adding/editing */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalMode === 'add' ? 'Ajouter un élément' : 'Modifier l\'élément'}
              </h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {activeTab === 'announcements' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Titre de l'Annonce *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Thème Principal *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={announcementForm.theme}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, theme: e.target.value })}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Date d'affichage *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          required
                          value={announcementForm.date}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">URL de l'image descriptive</label>
                        <input 
                          type="url" 
                          className="form-input" 
                          value={announcementForm.image}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description Courte *</label>
                      <textarea 
                        className="form-input form-textarea" 
                        required
                        value={announcementForm.text}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                        placeholder="Court résumé affiché sur les cartes de la page d'accueil..."
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Corps complet de l'article (Optionnel - Si vide, la description courte sera affichée)</label>
                      <textarea 
                        className="form-input form-textarea" 
                        style={{ minHeight: '200px' }}
                        value={announcementForm.fullText}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, fullText: e.target.value })}
                        placeholder="Contenu complet de l'article visible au clic..."
                      ></textarea>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Nom Complet *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={teamForm.name}
                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Poste / Rôle dans le CA *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Ex: Secrétaire Général" 
                        required
                        value={teamForm.role}
                        onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL de la photo de profil</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        value={teamForm.image}
                        onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'activities' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Titre de l'Activité *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={activityForm.title}
                        onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description détaillée *</label>
                      <textarea 
                        className="form-input form-textarea" 
                        required
                        value={activityForm.description}
                        onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL de l'image de couverture</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        value={activityForm.image}
                        onChange={(e) => setActivityForm({ ...activityForm, image: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">URL de la Photo *</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        required
                        value={galleryForm.url}
                        onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Légende de la photo</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Ex: Réunion avec les populations" 
                        value={galleryForm.caption}
                        onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'partners' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Nom du Partenaire *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={partnerForm.name}
                        onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL du Logo *</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        required
                        value={partnerForm.logo}
                        onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'events' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Titre de l'Événement *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Date *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Ex: 13 Juillet 2020"
                          required
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">URL de l'image mise en avant *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          required
                          value={eventForm.image}
                          onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description (résumé) *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Corps du rapport (Texte complet) *</label>
                      <textarea 
                        className="form-input form-textarea" 
                        required
                        value={eventForm.fullText}
                        onChange={(e) => setEventForm({ ...eventForm, fullText: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL Vidéo de reportage (optionnel)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Ex: /media/Sail-Away.mp4"
                        value={eventForm.videoUrl || ''}
                        onChange={(e) => setEventForm({ ...eventForm, videoUrl: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Images secondaires (Galerie - séparées par des virgules)</label>
                      <textarea 
                        className="form-input form-textarea" 
                        placeholder="Ex: /media/photo-de-famille-1.jpg, /media/photo-de-famille-2.jpg"
                        style={{ height: '80px' }}
                        value={Array.isArray(eventForm.subImages) ? eventForm.subImages.join(', ') : eventForm.subImages || ''}
                        onChange={(e) => setEventForm({ ...eventForm, subImages: e.target.value })}
                      ></textarea>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saisissez les chemins des images séparés par des virgules.</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === 'add' ? 'Ajouter' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {notification && (
        <div className="alert-popup">
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}
