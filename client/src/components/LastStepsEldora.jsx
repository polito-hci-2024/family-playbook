import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../CSS/LastStepEldora.css";
import "../CSS/UnexpectedEvents.css";
import ButtonsEldora from "./ButtonsEldora";

function LastStepSelectionEldora() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const containerRef = useRef(null);

  const [messages] = useState([
    " You thought it was over, didn’t you? 😏 Not so fast! Another challenge awaits you — <b><i>pick one and let's go</b></i>! 🎉"
]);

  const [steps, setSteps] = useState([
    {
      id: 1,
      image: "/img/challenges/amuleto.png",
      title: "The Quest for the Lost Fragment",
      description: "To restore the amulet’s power,embark on a journey to find the missing fragment—a piece of magic that was lost long ago.",
      disabled: false,
    },
    {
      id: 2,
      image: "/img/challenges/fairy-house.png",
      title: "Rebuild the Fairy House",
      description: "The fairies' home was destroyed in the chaos. Help them gather materials to rebuild their house and resume their vital role in caring for the forest's health.",
      disabled: true,
    },
  ]);

  const handleStepClick = (Step) => {
    if (!Step.disabled) {
      setSelectedStep(Step);
    }
  };

  const handleNavigate = () => {
    if (selectedStep) {
      navigate(`/challenge/2`);
    }
  };

  const handleNavigateBack = () => {
    navigate('/stepsPotion/2');
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".Step-card")) {
        setSelectedStep(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    setIsPopupVisible(true);
  };

  const handlePopupYesClick = () => {
    if (selectedIcon === "raining") {
      navigate("/raining");
    } else if (selectedIcon === "end_activity") {
      navigate("/");
    }
    setIsPopupVisible(false);
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };
  

  return (
    <div className={`LastStepSelection ${isPopupVisible ? "blurred" : ""}`} ref={containerRef}>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Puzzle of unexpected events</h2>
            <div className="popup-icons">
              <div className={`popup-icon ${selectedIcon === "raining" ? "selected" : ""}`} onClick={() => handleIconClick("raining")}>
                <img src="/img/unexpected/raining.png" alt="It's raining" />
                <span>It's raining</span>
              </div>
              <div className={`popup-icon ${selectedIcon === "end_activity" ? "selected" : ""}`} onClick={() => handleIconClick("end_activity")}>
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
                  <button className="yes-button" onClick={handlePopupYesClick}>Yes</button>
                  <button className="no-button" onClick={() => { setIsPopupVisible(false); setSelectedIcon(null); }}>No</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="last-steps-eldora">
        <div className="header">
          <h1 className="title">The Heart of Eldora Still Calls</h1>
          <p className="description">
            The forest has been restored, but its heart still beats faintly, under the weight of a dark force lurking in the shadows. Eldora's magic is fragile, and it is up to you to help protect it before the darkness grows stronger.
          </p>
        </div>
          
        <p className="description choose-challenge-text"><strong>Are you ready for your next challenge?</strong></p>
        <div className="steps">
          {steps.map((Step, index) => (
            <motion.div
              className={`Step-card ${Step.disabled ? "disabled" : ""}`}
              key={Step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={() => handleStepClick(Step)}
            >
              <img src={Step.image} alt={Step.title} className="Step-image" />
              <h2 className="Step-title">{Step.title}</h2>
              <p className="Step-description">{Step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {!isPopupVisible && (
        <img src="/img/back.png" alt="Arrow Left" className="arrow arrow-left" onClick={handleNavigateBack} />
      )}

      {selectedStep && (
        <img src="/img/next.png" alt="Arrow Right" className="arrow arrow-right" onClick={handleNavigate} />
      )}
      <ButtonsEldora messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />

    </div>
    
  );
}

export default LastStepSelectionEldora;
