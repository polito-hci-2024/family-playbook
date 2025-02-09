import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/StepsEgypt.css';
import '../CSS/UnexpectedEvents.css';
import API from '../API.mjs'
import ButtonsEgypt from './ButtonsEgypt';

function StepSelectionEgypt() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const containerRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [steps, setSteps] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

const handlePopupVisibilityChange = (visible) => {
  setIsPopupVisible(visible);
};

const [messages] = useState([
    " You already know the basics, so it's time to get with first challenge, <br><b><i>pick one</b></i>! 🎉"
  ]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await API.getChallengesById(2);
        setSteps(
          challenges.map((challenge) => ({
            id: challenge.challenge_id,
            image: challenge.image_url,
            title: challenge.challenge_name,
            description: challenge.challenge_description,
            route: `/challenge/${challenge.challenge_id}`,
            disabled: challenge.challenge_id === 4
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
      navigate(selectedStep.route); 
    }
  };

  const handleNavigateBack = () => {
    navigate("/stepsEgypt/3");
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleOutsideClick = (event) => {
    const clickedElement = event.target;
    const isStepCard = clickedElement.closest('.StepEgypt-card'); 
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

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={`StepSelectionEgypt ${isPopupVisible ? 'blurred' : ''}`} ref={containerRef}>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popupEgypt-content">
            <h2>Puzzle of unexpected events</h2>
            <div className="popup-icons">
                
                <div className="popup-icon disabled">
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
                    <button className="yes-buttonEgypt" onClick={handlePopupYesClick}>
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

      <div className="header">
        <h1 className="titleEgypt"> Welcome to the mesmerizing world of Ancient Egypt !</h1>
        <br></br>
        <p className="descriptionEgypt">
        You’ve entered the land of the pharaohs, where golden sands and the Nile hold ancient secrets. <br/>In this journey, you’ll face challenges that test your wit, courage, and mastery of magic. Each challenge will uncover Egypt’s mysteries and bring you closer to the gods' favor.</p>
        <p className="description egypt choose-challenge-text">
      <strong>Choose Your Next Challenge to Begin!</strong>
          </p>  
      </div>

       
      <div className="steps">
        {steps.map((Step, index) => (
          <motion.div
            className={`StepEgypt-card ${Step.disabled ? 'disabled' : ''}`}
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
            <h2 className="StepEgypt-title">{Step.title}</h2>
            <p className="StepEgypt-description">{Step.description}</p>
          </motion.div>
        ))}
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
      <ButtonsEgypt messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />

      
    </div>
  );
}

export default StepSelectionEgypt;