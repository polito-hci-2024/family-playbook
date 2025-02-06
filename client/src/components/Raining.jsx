import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/Raining.css'; 

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
      navigate(`/stepsEgypt/3`);
    }
  };

  const handleOutsideClick = (event) => {
      const clickedElement = event.target;
      const isCard = clickedElement.closest('.card'); 
      if (!isCard) {
        setSelectedCard(null); 
      } else {
        const isDisabled = isCard.classList.contains('disabled');
        if (!isDisabled) {
          return;
        }
        setSelectedCard(null); 
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
        <h1 className="title">Oh no, it’s raining!</h1>
        <p className="description">
        Looks like the weather had other plans!  Let's take cover and head indoors for some alternative quests.
        </p><p className="description">
        Here are a few ways to keep the magic adventure, no matter the weather!        </p>
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