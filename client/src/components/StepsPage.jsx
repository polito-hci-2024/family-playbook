import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StoryPage.css';
import API from '../API.mjs';

function StepsPage({ stepId }) {
  const navigate = useNavigate();
  const [panels, setPanels] = useState([]); // Stato per i pannelli della storia
  const [stepName, setStepName] = useState(''); // Stato per il titolo del capitolo
  const [showArrows, setShowArrows] = useState(false);
  const [userName, setUserName] = useState(''); // Stato per il nome utente

  // Funzione per caricare i dati dallo step
  const fetchStepData = async (id) => {
    try {
      const name = await API.getUserName();
      const data = await API.getStepsById(id); // Usa la funzione API per ottenere i dati
      setUserName(name);
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

  const handleNext = () => {
    // Naviga alla pagina della domanda successiva (questo assumerà che stepId e question_id siano uguali)
    navigate(`/question/${parseInt(stepId)}`);
  };

  const handleBack = () => {
    // Naviga al passo precedente, se possibile
    if (parseInt(stepId) > 1) {
      navigate(`/steps/${parseInt(stepId) - 1}`);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Mostra le frecce solo se ci sono più di 1 pannello e l'utente ha scrollato oltre una certa percentuale
    if (panels.length > 1 && scrollY + windowHeight >= (docHeight / 4) * 3) {
      setShowArrows(true);
    }
  };

  // useEffect per caricare i dati dello step
  useEffect(() => {
    fetchStepData(stepId); // Carica i dati dello step quando il componente è montato
  }, [stepId]);

  // useEffect per gestire lo scroll e mostrare le frecce
  useEffect(() => {
    if (panels.length > 1) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [panels.length]); // Dipende da panels.length

  // useEffect per mostrare le frecce immediatamente se ci sono meno di 2 pannelli
  useEffect(() => {
    if (panels.length < 2) {
      setShowArrows(true); // Le frecce sono visibili subito
    } else {
      setShowArrows(false); // Se ci sono più di 1 pannello, nascondi le frecce inizialmente
    }
  }, [panels.length]);

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
              onClick={handleNext} // Vai alla pagina della domanda successiva
            />
            <img
              src="/img/back.png"
              alt="Arrow Left"
              className="arrow arrow-left"
              onClick={handleBack} // Torna indietro al passo precedente
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StepsPage;
