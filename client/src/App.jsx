import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NotFound from './components/NotFound';
import WelcomePage from './components/WelcomePage';
import { Routes, Route, Outlet } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import StepSelection from './components/StepSelection';
import MagicPotion from './components/MagicPotion';
import Raining from './components/Raining';
function App() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Imposta i criteri per considerare il dispositivo un tablet
      setIsTablet(width >= 600 && width <= 1824 && height >= 1000);
    };

    // Aggiungi listener per il resize
    window.addEventListener('resize', handleResize);

    // Esegui subito il controllo iniziale
    handleResize();

    // Pulisci il listener quando il componente viene smontato
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isTablet ? (
        <Routes>
          {/* Questa route è per la pagina OpeningPage senza NavHeader */}
          <Route path="/" element={<OpeningPage />} />
          <Route path="/step-selection" element={<StepSelection />}/>
          <Route path="/magic-potion" element={<MagicPotion />}/>
          <Route path="/raining" element={<Raining />}/>  
          
          {/* Wrapper per tutte le altre pagine, con il NavHeader */}
          
            {/* Altre rotte che includono il NavHeader */}
            <Route path="/welcome" element={<WelcomePage />} />
            {/* Puoi aggiungere altre rotte qui per le pagine che devono avere il NavHeader */}

            {/* Pagina non trovata */}
            <Route path="*" element={<NotFound />} />
          
        </Routes>
      ) : (
        <div className="rotate-message">
          <p>
            <strong>Lumi dice:</strong> Per favore, usa un tablet o ruota il tuo dispositivo!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
