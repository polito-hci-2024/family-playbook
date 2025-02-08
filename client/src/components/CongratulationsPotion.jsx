import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/CongratulationsPotion.css';
import ButtonsEldora from './ButtonsEldora';
import { motion } from "framer-motion";

function CongratulationsPotion() {
  const navigate = useNavigate(); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const userName = localStorage.getItem('userName') || 'Hero'; 

  const handleNext = () => {
    navigate('/last-chapter'); 
  };

  const handleBack = () => {
    navigate('/challenge/2'); 
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };
  

  return (
  <div className="congratulations">
    <div className="congratulations-container">
      <video
        className="background-video"
        src="/mp4/congrats_eldora.mp4"
        autoPlay
        muted
        loop={false}
      ></video>

      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Congratulations, {userName}!
      </motion.h1>

      <div className="story-box">
        <p className="story-text">
          You’ve restored the forest’s creatures and revived Eldora’s magic!
        </p>

        <div className="story-image-container">
          <img className="story-image" src="/img/StoryPages/happy_animals.png" alt="Happy Animals" />
        </div>

        <p className="story-text">
          Thanks to your bravery, balance has returned, and the magic will live on—protected by its new guardians, including you.<br />
          Thank you for joining this magical journey.
        </p>

        <p className="story-text"> Until the next adventure… 🌟 </p>
      </div>

      <motion.img
        className="mascotte"
        src="/img/lumi_smile.png"
        alt="Mascotte"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      />

      <img
        src="/img/back.png"
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleBack} 
      />
      
      <img
        src="/img/next.png"
        alt="Arrow Right"
        className="arrow arrow-right"
        onClick={handleNext} 
      />

      <ButtonsEldora onPopupVisibilityChange={handlePopupVisibilityChange} />
    </div>
  </div>
  );
}
    

  
export default CongratulationsPotion;
