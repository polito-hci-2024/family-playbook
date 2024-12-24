import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StoryPage.css';
import API from '../API.mjs';
function StoryPage() {
  const navigate = useNavigate();
  const { stepId } = useParams(); // Ottieni stepId dall'URL
  const [panels, setPanels] = useState([]); // Stato per i pannelli della storia
  const [stepName, setStepName] = useState(''); // Stato per il titolo del capitolo
  const [showArrows, setShowArrows] = useState(false);

  const handleStartClick = () => {
    navigate('/place');
  };

  // Funzione per caricare i dati dallo step
  const fetchStepData = async (id) => {
    try {
      console.log(`Fetching data for stepId: ${id}`);
      const data = await API.getStepsById(id); // Usa la funzione API
      console.log(data); // Verifica i dati ricevuti
      setStepName(data[0]?.step_name || ''); 
      setPanels(data.map((panel) => ({
        id: panel.panel_number,
        image: panel.image_url,
        text: panel.description,
      })));
    } catch (error) {
      console.error('Error fetching step data:', error);
    }
  };
  
  

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Mostra le frecce quando l'utente ha scrollato oltre metà della pagina
    if (scrollY + windowHeight >= (docHeight / 4) * 3) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  };

  useEffect(() => {
    fetchStepData(stepId); // Carica i dati dello step quando il componente è montato
  }, [stepId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="Introduction">
      <div className="story-background">
        <p className="title">{stepName || 'Loading...'}</p>
        {panels.map((panel, index) => (
          <motion.div
            className="story-panel"
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            {panel.image && (
              <img
                src={panel.image}
                alt={`Panel ${panel.id}`}
                className={`story-image ${panel.id === 4 ? 'inline-image-bivio' : 'inline-image'}`}
              />
            )}
            <p className="story-text">{panel.text}</p>
          </motion.div>
        ))}
        {/* Frecce per lo scroll */}
        {showArrows && (
          <>
            <img
              src="/img/next.png"
              alt="Arrow Right"
              className="arrow arrow-right"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            />
            <img
              src="/img/back.png"
              alt="Arrow Left"
              className="arrow arrow-left"
              onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StoryPage;
