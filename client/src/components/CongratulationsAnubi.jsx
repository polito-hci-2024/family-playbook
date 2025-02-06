import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/CongratulationsAnubi.css';

function CongratulationsAnubi() {
  const navigate = useNavigate(); 
  const userName = localStorage.getItem('userName') || 'Hero'; 

  const handleNext = () => {
    navigate('/last-chapter'); 
  };

  const handleBack = () => {
    navigate('/challenge/3'); 
  };

  return (
    <div>
      <h1>Congratulations, {userName}</h1>
      <p className='lead text-center fs-1'>
      You’ve completed the quest, adventurer! By finding Anubis' symbols, you’ve proven your wisdom and earned his protection. The mysteries of Egypt are now revealed, and your journey here ends.
      Thank you for your courage. The adventure may be over, but there are always more worlds to explore.
      Until next time! 🌟
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
    </div>
  );
}

export default CongratulationsAnubi;
