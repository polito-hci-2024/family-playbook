import React, { useState } from "react";
import Confetti from "react-confetti";
import "../CSS/Scratch.css";
import { useNavigate } from "react-router-dom";
import ButtonsEldora from "./ButtonsEldora";

const Scratch = () => {
  const images = [
    { src: "../img/ingredients/daisy.jpeg", id: "image1" },
    { src: "../img/challenges/Step1.png", id: "image2" }, // Immagine corretta
    { src: "../img/challenges/Step2.png", id: "image3" },
    { src: "../img/challenges/Step3.png", id: "image4" },
  ];

  const [flippedCards, setFlippedCards] = useState({}); // Stato per tracciare le card girate
  const [completedImage, setCompletedImage] = useState(null); // Stato per immagine completata
  const [showConfetti, setShowConfetti] = useState(false); // Stato per l'effetto confetti
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: true }));
    if (id === "image2") {
      setCompletedImage(id);
      setShowConfetti(true); // Mostra l'effetto confetti se l'immagine corretta è trovata
      setTimeout(() => setShowConfetti(false), 6000); // Rimuove i confetti dopo 3 secondi
    }
  };

  const handleNavigateNext = () => {
    navigate("/congratulationsForest"); // Sostituisci '/next-page' con il percorso desiderato
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };

  const isNextArrowActive = completedImage === "image2"; // Freccia destra attiva solo se `image2` è completata

  return (
    <div className="scratch">
      {/* Titolo della pagina */}
      <h1 className="title">The Quest for <br />the Lost Fragment</h1>
      <p className="intro">
  The amulet is incomplete, missing a crucial fragment hidden deep within Eldoria. <br /> 
  Without it, the darkness will spread. Explore the forest’s cards to find the one that holds the missing piece and restore the amulet’s power to complete your quest.
</p>

      {/* Box con le immagini */}
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

      {/* Frecce di navigazione */}
      <div className="navigation-arrows">
        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => navigate(-1)} // Torna indietro nella navigazione
        />
        {/* Freccia destra */}
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className={`arrow arrow-right ${isNextArrowActive ? "enabled" : "disabled"}`}
          onClick={isNextArrowActive ? handleNavigateNext : null}
        />
      </div>
      <ButtonsEldora onPopupVisibilityChange={handlePopupVisibilityChange} />


      {/* Effetto confetti */}
      {showConfetti && <Confetti recycle={false} />} {/* Confetti moderni */}
    </div>
  );
};

export default Scratch;
