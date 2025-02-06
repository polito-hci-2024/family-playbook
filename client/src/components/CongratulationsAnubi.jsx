import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/CongratulationsAnubi.css';
import { motion } from "framer-motion";
import ButtonsEgypt from './ButtonsEgypt';

function CongratulationsAnubi() {
  const navigate = useNavigate(); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const userName = localStorage.getItem('userName') || 'Hero'; 

  const handleNext = () => {
    navigate('/last-chapter'); 
  };

  const handleBack = () => {
    navigate('/challenge/3'); 
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };

  return (
    <div className="congratulationsEgypt">
      <div className="congratulations-container">
        {/* Background Video o Immagine statica */}
        <video
          className="background-video"
          src="/mp4/congrats_egitto.mp4"
          autoPlay
          muted
          loop={false}
        ></video>
  
        {/* Titolo */}
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Congratulations, {userName}!
        </motion.h1>
  
        {/* Story Box */}
        <div className="story-box">
          <p className="story-text">
          You’ve completed the quest, adventurer! <br/>The mysteries of Egypt are now revealed, and your journey here ends.
          </p>
  
          {/* Immagine centrata */}
          <div className="story-image-container">
            <img className="story-image" src="/img/Egypt/secret.png" alt="Happy Animals" />
          </div>
  
          <p className="story-text">
          Thank you for your courage—this adventure may be over, but more worlds await to be explored.
          </p>
  
          <p className="story-text"> Until the next adventure… </p>
        </div>
  
        {/* Mascotte */}
        <motion.img
          className="mascotte"
          src="/img/lumi_smile.png"
          alt="Mascotte"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        />
  
        {/* Frecce per navigazione */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={handleBack} // Usare la funzione esistente
        />
        
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={handleNext} // Usare la funzione esistente
        />
  
        
        <ButtonsEgypt onPopupVisibilityChange={handlePopupVisibilityChange} />
      </div>
    </div>
    );
}

export default CongratulationsAnubi;
