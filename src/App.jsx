import React, { useContext, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Presentation from './pages/Presentation';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Adhesion from './pages/Adhesion';
import Dashboard from './pages/Dashboard';
import Legal from './pages/Legal';
import './App.css';

function MainAppContent() {
  const { activePage, setActivePage } = useContext(AppContext);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        setActivePage('dashboard');
      } else if (path === '/legal' || hash === '#/legal' || hash === '#legal') {
        setActivePage('legal');
      }
    };

    // Vérification initiale
    handleUrlChange();

    // Écoute des événements de navigation
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [setActivePage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {activePage !== 'dashboard' && <Navbar />}
      
      {/* Dynamic Main Body Content */}
      <main style={{ flexGrow: 1, paddingTop: activePage !== 'dashboard' ? '80px' : '0px' }}>
        {activePage === 'accueil' && <Home />}
        {activePage === 'presentation' && <Presentation />}
        {activePage === 'activites' && <Activities />}
        {activePage === 'contact' && <Contact />}
        {activePage === 'adhesion' && <Adhesion />}
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'legal' && <Legal />}
      </main>
      
      {/* Show Footer only on public pages */}
      {activePage !== 'dashboard' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
