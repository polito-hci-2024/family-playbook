import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/StepSelection.css';

function MagicPotion() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null); // Stato per tracciare il passaggio selezionato

  const steps = [
    {
      id: 1,
      image: '/img/Step1.png',
      title: 'Magical potion making',
      description: 'Mix natural ingredients to create magical potions.',
      route: '/magic-potion',
    },
    {
      id: 2,
      image: '/img/Step2.png',
      title: 'Fairy house building',
      description: 'Use twigs and leaves to build charming houses for forest fairies.',
      route: '/fairy-house',
    },
    {
      id: 3,
      image: '/img/Step3.png',
      title: 'Enchanted treasure hunt',
      description: 'Follow clues and riddles to find hidden treasures in the park.',
      route: '/treasure-hunt',
    },
  ];

  /*const handleStepClick = (route) => {
    navigate(route);
  };*/

  const handleStepClick = (Step) => {
    setSelectedStep(Step); // Imposta il passaggio selezionato
  };

  const handleNavigate = () => {
    if (selectedStep) {
      navigate(selectedStep.route); // Naviga alla route del passaggio selezionato
    }
  };

  return (
    <div className="StepSelection">
      <div className="header">
        <h1 className="title"> to the enchanting world of Eldora !</h1>
        <br></br>
        <p className="description">
        In this magical realm you'll encounter exciting challenges, discover hidden treasures and unlock the secrets of Eldora.
        </p>
      </div>

      <h1 className="Step-question"> Which challenge would you like to start with? </h1>
      <div className="steps">
        {steps.map((Step, index) => (
          <motion.div
            className="Step-card"
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

      {/* Freccia sinistra sempre visibile */}
      <img
          src="/img/back.png" 
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
        />

        {/* Freccia destra visibile solo dopo una scelta */}
        {selectedStep && (
          <img
            src="/img/next.png" 
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={navigate}
          />
        )}
      
    </div>
  );
}

export default MagicPotion;