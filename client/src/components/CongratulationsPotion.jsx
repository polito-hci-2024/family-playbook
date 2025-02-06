import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/CongratulationsPotion.css';
import ButtonsEldora from './ButtonsEldora';

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
    <div>
      <h1>Congratulations, {userName}</h1>
      <p className='lead text-center fs-1'>
      You’ve restored the forest’s creatures and revived Eldora’s magic. With the amulet whole and the potion brewed, you’ve proven yourself a true hero.
Thank you for joining this magical journey. Your bravery has restored balance and ensured the forest’s magic lives on—protected by its new guardians, you included.
Until the next adventure… 🌟

      </p>

      <img
        src="/img/next.png"
        alt="Arrow Right"
        className="arrow arrow-right"
        onClick={handleNext}
      />

      <img
        src="/img/back.png"
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleBack}
      />
      <ButtonsEldora onPopupVisibilityChange={handlePopupVisibilityChange} />
    </div>
  );
}

export default CongratulationsPotion;
