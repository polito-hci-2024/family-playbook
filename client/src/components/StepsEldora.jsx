import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/StepsEldora.css';
import '../CSS/UnexpectedEvents.css';
import API from '../API.mjs'
import ButtonsEldora from './ButtonsEldora';

function StepSelectionEldora() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const containerRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null); 
  const [steps, setSteps] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [shouldShowGuide, setShouldShowGuide] = useState(true);

  const [messages] = useState([
    " Before we start the adventure, let's quickly go over the buttons at the bottom center: <br> 1. <b>Unexpected Events</b>: Deal with twists like rain or an early ending⛈️ <br> 2. <b>Map</b>: See your progress and what lies ahead! 🌍 <br> 3. <b>Guide</b>: Get hints and tips! 📖 <br>",
    " Now that you know the basics, it's time for your first challenge. Pick one! 🎉"
  ]);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || 'default';
    const hasSeenGuide = localStorage.getItem(`guide_seen_${userId}`);
    
    console.log("Checking guide visibility, hasSeenGuide:", hasSeenGuide);
    
    if (hasSeenGuide && userId) {
      console.log("Setting guide to true...");
      setShouldShowGuide(true);
      // Non impostare subito il flag nel localStorage
      // Questo verrà fatto quando l'utente chiude la guida
    } else {
      console.log("User has already seen the guide");
      setShouldShowGuide(false);
    }
  }, []);

  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await API.getChallengesById(1);
        const filteredChallenges = challenges.filter(challenge => challenge.challenge_id !== 5);
        setSteps(
          filteredChallenges.map((challenge) => ({
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

  const handleGuideClose = () => {
    // Salva nel localStorage che l'utente ha visto la guida
    const userId = localStorage.getItem('userId') || 'default';
    localStorage.setItem(`guide_seen_${userId}`, 'true');
    setShouldShowGuide(false);
  };

  const handleStepClick = (Step) => {
    if (!steps.disabled) {
      setSelectedStep(Step);
    }
  };

  const handleNavigate = () => {
    if (selectedStep) {
      navigate(selectedStep.route); 
    }
  };

  const handleNavigateBack = () => {
    navigate('/start-activity');
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleOutsideClick = (event) => {
    const clickedElement = event.target;
    const isStepCard = clickedElement.closest('.Step-card'); 
    if (!isStepCard) {
      setSelectedStep(null); 
    } else {
      const isDisabled = isStepCard.classList.contains('disabled');
      if (!isDisabled) {
        return;
      }
      setSelectedStep(null); 
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
    setIsPopupVisible(true); 
  };

  const handlePopupYesClick = () => {
    if (selectedIcon && selectedIcon === 'raining') {
      navigate("/raining"); 
    } else if (selectedIcon && selectedIcon === 'end_activity') {
      navigate("/");
    }
    setIsPopupVisible(false); 
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={`StepSelection ${isPopupVisible ? 'blurred' : ''}`} ref={containerRef}>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Puzzle of unexpected events</h2>
            <div className="popup-icons">
                
                <div className={`popup-icon ${selectedIcon === 'raining' ? 'selected' : ''}`} onClick={() => handleIconClick('raining')}>
                    <img src="/img/unexpected/raining.png" alt="It's raining" />
                    <span>It's raining</span>
                </div>
                
                <div className={`popup-icon ${selectedIcon === 'end_activity' ? 'selected' : ''}`} onClick={() => handleIconClick('end_activity')}>
                    <img src="/img/unexpected/end_activity.png" alt="End activity" />
                    <span>End activity</span>
                </div>
                
                <div className="popup-icon disabled">
                    <img src="/img/unexpected/not_for_me.png" alt="Not for me" />
                    <span>Not for me</span>
                </div>
                
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
          Eldoria, a hidden magical world within Parco della Mandria, is fading as a dark force threatens its very heart.
        <br /> In this adventure, you’ll face challenges that test your courage and magic. Ready to bring light back to Eldora? 🌟 
          </p>
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

      {!isPopupVisible && (
        <img
        src="/img/back.png" 
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleNavigateBack}
      />
      )}

      {selectedStep && (
        <img
          src="/img/next.png" 
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={handleNavigate}
        />
      )}
      <ButtonsEldora messages={messages} onGuideClose={handleGuideClose} openGuideOnStart ={shouldShowGuide} onPopupVisibilityChange={ handlePopupVisibilityChange} />

    </div>
  );
}

export default StepSelectionEldora;