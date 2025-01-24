import React, { useState } from "react";
import Confetti from "react-confetti";
import "../CSS/Scratch2.css";
import { useNavigate } from "react-router-dom";

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
    navigate("/next-page"); // Sostituisci '/next-page' con il percorso desiderato
  };

  const isNextArrowActive = completedImage === "image2"; // Freccia destra attiva solo se `image2` è completata

  return (
    <div className="scratch2">
      {/* Titolo della pagina */}
      <h1 className="title">Trova la chiave magica</h1>
      <p className="intro">
        Lo gnomo burlone della foresta ha deciso di mettere alla prova il tuo
        coraggio! Ha rubato la chiave magica che ti serve per continuare il tuo
        viaggio e l'ha nascosta tra quattro misteriosi riquadri incantati. Solo
        uno di questi contiene la chiave. Clicca sui riquadri con attenzione per
        scoprire dove si trova e prosegui nella tua avventura!
      </p>
      {/* Box con le immagini */}
      <div className="scratch2-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`scratch2-box card ${flippedCards[image.id] ? "flipped" : ""}`}
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

      {/* Effetto confetti */}
      {showConfetti && <Confetti recycle={false} />} {/* Confetti moderni */}
    </div>
  );
};

export default Scratch;
