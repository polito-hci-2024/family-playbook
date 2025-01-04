import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/Raining.css'; // Assicurati di creare questo file CSS per gli stili

function Raining() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: 'Exploring ancient Egypt',
      description: 'Uncover the secrets of the pharaohs and explore the timeless wonders of ancient Egypt through immersive activities.',
      image: '/img/egitto.png',
      route: '/step-selection-egypt',
      disabled: false,
    },
    {
      id: 2,
      title: 'Fun cafe with board games',
      description: 'Relax and enjoy a variety of board games with friends in a cozy cafe setting, perfect for a fun-filled day.',
      image: '/img/giochi.png',
      route: '/giochi',
      disabled: true,
    },
  ];

  const handleCardClick = (card) => {
    if (!cards.disabled) {
        setSelectedCard(card);
    }
  };

  const handleNavigate = () => {
    if (selectedCard) {
      console.log(`Navigating to card ${selectedCard.id}`);
      navigate(selectedCard.route);
    }
  };

  const handleOutsideClick = (event) => {
      // Verifica se il clic è avvenuto su una card attiva
      const clickedElement = event.target;
      const isCard = clickedElement.closest('.card'); // Trova se l'elemento è una card
      if (!isCard) {
        setSelectedCard(null); // Deseleziona se il clic è fuori da una card
      } else {
        // Controlla se è una card disabilitata
        const isDisabled = isCard.classList.contains('disabled');
        if (!isDisabled) {
          // Lascia che la card venga selezionata normalmente
          return;
        }
        setSelectedCard(null); // Deseleziona se è su una card disabilitata
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);
  

  return (
    <div className="Raining" ref={containerRef}>
      <div className="header">
        <h1 className="title">It's Raining!</h1>
        <p className="description">
          Ops! The rain has decided to join the party. Let's move indoors, here are some alternatives:
        </p>
      </div>

      <div className="cards">
        {cards.map((card, index) => (
          <motion.div
            className={`card ${card.disabled ? 'disabled' : ''}`}
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onClick={() => handleCardClick(card)}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Freccia sinistra sempre visibile */}
      {/* 
        <img
        src="/img/back.png" 
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
      /> */}

        {/* Freccia destra visibile solo dopo una scelta */}
        {selectedCard && (
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

export default Raining;