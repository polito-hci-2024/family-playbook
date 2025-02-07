import React, { useState } from "react";
import Confetti from "react-confetti";
import "../CSS/Scratch.css";
import { useNavigate } from "react-router-dom";
import ButtonsEldora from "./ButtonsEldora";
import API from "../API.mjs";

const Scratch = () => {
  const images = [
    { src: "../img/challenges/lampada.png", id: "image1" },
    { src: "/img/challenges/amuleto.png", id: "image2" }, 
    { src: "../img/challenges/chiave.png", id: "image3" },
    { src: "../img/challenges/cerca.png", id: "image4" },
  ];

  const [flippedCards, setFlippedCards] = useState({}); 
  const [completedImage, setCompletedImage] = useState(null); 
  const [showConfetti, setShowConfetti] = useState(false); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: true }));
    if (id === "image2") {
      setCompletedImage(id);
      setShowConfetti(true); 
      setTimeout(() => setShowConfetti(false), 6000); 
    }
  };

  const handleNavigateNext = async () => {
    const user_id = localStorage.getItem('userId'); // Recupera l'ID utente dal localStorage
    const challenge_id = 5; // ID della sfida da passare

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
      <h1 className="title">The Quest for the Lost <br />Fragment</h1>
      <p className="intro">
  The amulet is incomplete, missing a crucial fragment hidden deep within Eldoria. <br /> 
  Without it, the darkness will spread. Explore the forest’s cards to find the one that holds the missing piece and restore the amulet’s power to complete your quest.
</p>

      <div className="scratch-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`scratch-box card ${flippedCards[image.id] ? "flipped" : ""}`}
            onClick={() => handleCardClick(image.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src="../img/object/blocco.jpg"
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
          onClick={() => navigate(-1)}
        />
       
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className={`arrow arrow-right ${isNextArrowActive ? "enabled" : "disabled"}`}
          onClick={isNextArrowActive ? handleNavigateNext : null}
        />
      </div>
      <ButtonsEldora onPopupVisibilityChange={handlePopupVisibilityChange} />

      {showConfetti && <Confetti recycle={false} />} 
    </div>
  );
};

export default Scratch;
