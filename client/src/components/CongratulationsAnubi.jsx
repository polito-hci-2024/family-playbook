import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/CongratulationsAnubi.css';
import { motion } from "framer-motion";
import ButtonsEgypt from './ButtonsEgypt';

function CongratulationsAnubi() {
  const navigate = useNavigate(); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const userName = localStorage.getItem('userName') || 'Hero'; 

  const [messages] = useState([
      " <b><i>Congratulations</b></i>, you've completed the challenge like a <i>true adventurer</i>! 🎉✨",
      " You did it! 🏆 <br> Now that you've finished, get ready for your next adventure! 🌟 <br>  Stay tuned for more exciting challenges ahead! 🚀"
  ]);

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
        <video
          className="background-video"
          src="/mp4/congrats_egitto.mp4"
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
          You’ve completed the quest, adventurer! <br/>The mysteries of Egypt are now revealed, and your journey here ends.
          </p>
  
          <div className="story-image-container">
            <img className="story-image" src="/img/Egypt/secret.png" alt="Happy Animals" />
          </div>
  
          <p className="story-text">
          Thank you for your courage—this adventure may be over, but more worlds await to be explored.
          </p>
  
          <p className="story-text"> Until the next adventure… </p>
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
  
        
        <ButtonsEgypt messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />
      </div>
    </div>
    );
}

export default CongratulationsAnubi;
