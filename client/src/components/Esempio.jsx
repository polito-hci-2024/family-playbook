import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/StepsEldora.css';
import '../CSS/UnexpectedEvents.css';
import API from '../API.mjs'

function Esempio() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null); // Stato per tracciare il passaggio selezionato
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const containerRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null); // Stato per tracciare l'icona selezionata
  const [steps, setSteps] = useState([]); // Stato per i dati dinamici
  const [loading, setLoading] = useState(true); // Stato per indicare il caricamento dei dati
  const [error, setError] = useState(null); // Stato per eventuali errori
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuRef = useRef(null); // Riferimento al menu

  // Mostra il menu per 3 secondi all'avvio
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Chiude il menu se si clicca fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    }

    if (!isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await API.getChallengesById(1);
        setSteps(
          challenges.map((challenge) => ({
            id: challenge.challenge_id,
            image: challenge.image_url,
            title: challenge.challenge_name,
            description: challenge.challenge_description,
            route: `/challenge/${challenge.challenge_id}/1`,
            disabled: challenge.challenge_id === 2 || challenge.challenge_id === 3
          }))
        );
        setLoading(false);
      } catch (err) {
        setError('Failed to load challenges. Please try again later.');
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleStepClick = (Step) => {
    if (!steps.disabled) {
      setSelectedStep(Step);
    }
  };

  const handleNavigate = () => {
    if (selectedStep) {
      navigate(selectedStep.route); // Naviga alla route del passaggio selezionato
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleOutsideClick = (event) => {
    // Verifica se il clic è avvenuto su una card attiva
    const clickedElement = event.target;
    const isStepCard = clickedElement.closest('.Step-card'); // Trova se l'elemento è una card
    if (!isStepCard) {
      setSelectedStep(null); // Deseleziona se il clic è fuori da una card
    } else {
      // Controlla se è una card disabilitata
      const isDisabled = isStepCard.classList.contains('disabled');
      if (!isDisabled) {
        // Lascia che la card venga selezionata normalmente
        return;
      }
      setSelectedStep(null); // Deseleziona se è su una card disabilitata
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    setIsPopupVisible(true); // Mostra la domanda "Are you sure of your choice?"
  };

  const handlePopupYesClick = () => {
    if (selectedIcon && selectedIcon === 'raining') {
      // Naviga alla pagina specificata per l'icona selezionata
      navigate("/raining"); // Reindirizza alla pagina "raining.jsx"
    } else if (selectedIcon && selectedIcon === 'end_activity') {
      navigate("/");
    }
    setIsPopupVisible(false); // Chiudi il pop-up dopo la selezione
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={`StepSelection ${isPopupVisible ? 'blurred' : ''}`} ref={containerRef}>
      {/* Icona in alto a destra */}
      <div className="top-right-wrapper">
      {/* Menu delle icone */}
      <motion.div
        ref={menuRef}
        className="top-right-icons"
        initial={{ x: 0 }}
        animate={{ x: isCollapsed ? 120 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="icon-container">
          <img src="/img/buttons/info.png" alt="Info" /></div>
        <div className="icon-container" onClick={() => navigate("/map")}>
          <img src="/img/buttons/map.png" alt="Map" />
        </div>
        <div className="icon-container" onClick={togglePopup}>
          <img src="/img/buttons/imprevisto.png" alt="Imprevisto" />
        
        </div>
      </motion.div>

      {/* Freccia per riaprire il menu */}
      {isCollapsed && (
        <motion.div 
          className="expand-arrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsCollapsed(false)}
        >
          <img src="/img/buttons/FrecciaEsempio.png" alt="Expand" />
        </motion.div>
      )}
    </div>


      {/* Contenuto del pop-up */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Puzzle of unexpected events</h2>
            <div className="popup-icons">
                {/* Icona 1 */}
                <div className={`popup-icon ${selectedIcon === 'raining' ? 'selected' : ''}`} onClick={() => handleIconClick('raining')}>
                    <img src="/img/unexpected/raining.png" alt="It's raining" />
                    <span>It's raining</span>
                </div>
                {/* Icona 2 */}
                <div className={`popup-icon ${selectedIcon === 'end_activity' ? 'selected' : ''}`} onClick={() => handleIconClick('end_activity')}>
                    <img src="/img/unexpected/end_activity.png" alt="End activity" />
                    <span>End activity</span>
                </div>
                {/* Icona 3 - Disabilitata */}
                <div className="popup-icon disabled">
                    <img src="/img/unexpected/not_for_me.png" alt="Not for me" />
                    <span>Not for me</span>
                </div>
                {/* Icona 4 - Disabilitata */}
                <div className="popup-icon disabled">
                    <img src="/img/unexpected/im_lost.png" alt="I'm lost" />
                    <span>I'm lost</span>
                </div>
            </div>
            {selectedIcon && (
              <div> 
                <p className="popup-question">Are you sure about your choice?</p>
                <div className="popup-buttons">
                    <button className="yes-button" onClick={handlePopupYesClick}>
                        Yes
                    </button>
                    <button className="no-button" onClick={() => {setIsPopupVisible(false), setSelectedIcon(null)}}>
                        No
                    </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}

      <div className="steps-eldora">
        <div className="header">
          <h1 className="title">Welcome to the enchanting world of Eldora!</h1>
          <p className="description">
          You’ve entered Eldoria, a magical world hidden in Parco della Mandria. The forest is fading, and a dark force threatens its heart.
          </p>
          <p className="description">
          In this adventure, you’ll face challenges that test your courage and magic. Each victory brings you closer to restoring its balance. Ready to bring light back to Eldoria? 🌟          </p>
          <p className="description choose-challenge-text">
      <strong>Choose Your Next Challenge to Begin!</strong>
          </p>        
        </div>

        
        <div className="steps">
          {steps.map((Step, index) => (
            <motion.div
              className={`Step-card ${Step.disabled ? 'disabled' : ''}`}
              key={Step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={() => handleStepClick(Step)}
            >
              <img
                src={Step.image}
                alt={Step.title}
                className="Step-image"
              />
              <h2 className="Step-title">{Step.title}</h2>
              <p className="Step-description">{Step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Freccia sinistra sempre visibile */}
      {!isPopupVisible && (
        <img
        src="/img/back.png" 
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleNavigateBack}
      />
      )}

        {/* Freccia destra visibile solo dopo una scelta */}
        {selectedStep && (
          <img
            src="/img/next.png" 
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={handleNavigate}
          />
        )}
      
    </div>
  );
}

export default Esempio;