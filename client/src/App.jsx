import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import { Routes, Route, Outlet } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import StoryPage from './components/Introduction';
import Place from './components/Place';
import Place2 from './components/Place2'; 

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
          <Route path="/introduction" element={<StoryPage />} />
          <Route path="/place" element={<Place />} />
          <Route path="/place2" element={<Place2 />} />
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
