import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/StepsEldora.css';
import '../CSS/UnexpectedEvents.css';
import ButtonsEldora from './ButtonsEldora';
import API from '../API.mjs'

function StepSelectionEldora() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null); // Stato per tracciare il passaggio selezionato
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const containerRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null); // Stato per tracciare l'icona selezionata
  const [steps, setSteps] = useState([]); // Stato per i dati dinamici
  const [loading, setLoading] = useState(true); // Stato per indicare il caricamento dei dati
  const [error, setError] = useState(null); // Stato per eventuali errori

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

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={`StepSelection ${isPopupVisible ? 'blurred' : ''}`} ref={containerRef}>
      <ButtonsEldora />

      

      <div className="steps-eldora">
        <div className="header">
          <h1 className="title">Welcome to the enchanting world of Eldora!</h1>
          <p className="description">
          You’ve entered Eldora, a magical world hidden in Parco della Mandria. The forest is fading, and a dark force threatens its heart.
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

export default StepSelectionEldora;