import React, { useState } from "react";
import Confetti from "react-confetti";
import "../CSS/Scratch.css";
import { useNavigate } from "react-router-dom";
import API from "../API.mjs";
import ButtonsEldora from "./ButtonsEldora";

const Scratch = () => {
  const images = [
    { src: "../img/challenges/lampada.png", id: "image1" },
    { src: "/img/challenges/amuleto.png", id: "image2" }, 
    { src: "../img/challenges/chiave.png", id: "image3" },
    { src: "../img/challenges/cerca.png", id: "image4" },
  ];

  const [messages] = useState([
    " Time to hunt for the missing piece of the amulet! 🕵️‍♂️✨<br> There are 4 cards, but <b>only one</b> holds the key to complete your quest. <br> Can you pick the right one? 🔮"
]);


  const [flippedCards, setFlippedCards] = useState({}); 
  const [completedImage, setCompletedImage] = useState(null); 
  const [showConfetti, setShowConfetti] = useState(false); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: true }));
    if (id === "image2") {
      setCompletedImage(id);
      setShowConfetti(true); 
      setShowSuccessMessage(true); 
    }
  };

  const handleNavigateNext = async () => {
    const user_id = localStorage.getItem('userId');
    const challenge_id = 5;

    try {
      await API.insertChallenge(user_id, challenge_id);
      navigate("/congratulationsForest"); 
    } catch (error) {
      console.error('Failed to insert challenge:', error);
    }
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };

  const isNextArrowActive = completedImage === "image2"; 

  return (
    <div className="scratch">
      <p className="title">The Lost Fragment</p>
      <p className="intro">
        The amulet is incomplete, missing a crucial fragment hidden deep within Eldora. 
        Without it, the darkness will spread. <br /> Find the card that holds the missing piece and restore the amulet’s power to complete your quest.
      </p>

      <div className="scratch-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`scratch-box card ${flippedCards[image.id] ? "flipped" : ""} ${completedImage && image.id !== completedImage ? "disabled" : ""}`}
            onClick={() => handleCardClick(image.id)}
          >
            <div className="card-inner" style={completedImage === image.id ? {animation: 'pulseGlow 2s infinite'} : null}>
              <div className="card-front">
                <img
                  src="../img/challenges/card.png"
                  alt="Mystery Icon"
                  className="card-front-icon"
                />
              </div>
              <div className="card-back">
                <img src={image.src} alt={image.id} className="scratch-image" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-arrows">
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => navigate('/last-step-selection-eldora')}
        />
        {isNextArrowActive && ( 
          <img
            src="/img/next.png"
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={handleNavigateNext}
          />
        )}
      </div>
      <ButtonsEldora messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />

      {showSuccessMessage && (
        <div className="success-message">
          <h2>Hooray! You've found the missing fragment!</h2>
          <p>Click next to continue your journey and save Eldora!</p>
        </div>
      )}
    </div>
  );
};

export default Scratch;
