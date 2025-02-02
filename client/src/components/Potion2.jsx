import React, { useRef, useState, useEffect } from "react";
import "../CSS/Potion2.css"; // File CSS per lo stile
import { useNavigate } from 'react-router-dom'; 


const Potion2 = () => {
  const mestoloRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [xPosition, setXPosition] = useState(0); // 🔹 Posizione orizzontale
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [prevRotation, setPrevRotation] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const words = ["Curio", "Tempus,", "power", "of", "grace,", "Awaken", "the", "heart,", "the", "magic", "flows,", "Bring", "back", "health", "to", "every", "place."];


  const startDrag = (event) => {
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  };

  const handleNavigateNext = () => {
    navigate('/stepsPotion/2'); 
  };

  const handleNavigatePrec = () => {
    navigate('/challenge/1/1');  
  };

  const moveMestolo = (event) => {
    if (!isDragging) return;

    let currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let delta = currentX - startX;

    
    let newX = xPosition + delta;
    if (newX < -100) newX = -100;
    if (newX > 100) newX = 100;

    
    let newRotation = (newX / 100) * 45; // La rotazione va da -45° a +45° in base a x

   
    setXPosition(newX);
    setRotation(newRotation);
    mestoloRef.current.style.transform = `translateX(${newX}px) rotate(${newRotation}deg)`;
    setStartX(currentX);

    // Cambia parola ogni 20° di variazione rispetto alla rotazione precedente
    if (Math.abs(newRotation - prevRotation) >= 20 && wordIndex < words.length) {
      setWordIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1));
      setPrevRotation(newRotation);
    }
  };

  useEffect(() => {
    if (wordIndex === words.length - 1) {
      setShowModal(true);
    }
  }, [wordIndex]);
  
  const stopDrag = () => setIsDragging(false);

  return (
    <div className="potion2">
      {showModal && (
        <div className="video-overlay">
          <video className="fullscreen-video" autoPlay muted playsInline>
            <source src="/videos/pozione_fatta.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        )}
      <div className="create">
        <h1 className="title">
        A Stir of the Spoon,<br />Magic Words, and Away!
        </h1>
        
        <p className="descrizione-incantesimo">
        To activate the spell, stir the cauldron carefully with the spoon. Each turn will reveal a new magical word, ready to be spoken. Only with the right incantation will the potion come to life and heal the forest’s creatures! Can you master the magic in time to save them?
        </p>
        
        <div className="incantesimo-container">
          <img src="../../img/spell.png" alt="Sfondo filastrocca" className="sfondo-filastrocca" />
          <div className="filastrocca">
            {words.map((word, index) => (
              <span key={index} className={index <= wordIndex ? "active" : ""}>
                {word}{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="container">
          
          <img className="calderone" src="/videos/calderone_ultimo.gif" alt="Calderone animato" />

         
          <img
            src={"../../img/ingredients/bastone.png"}
            alt="Mestolo"
            className="mestolo"
            ref={mestoloRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onMouseMove={moveMestolo}
            onTouchMove={moveMestolo}
            onMouseUp={stopDrag}
            onTouchEnd={stopDrag}
            style={{
              transform: `translateX(${xPosition}px) rotate(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          />

        
        </div>
        {(
          <>
            {/* Freccia sinistra */}
            <img
              src="/img/back.png"
              alt="Arrow Left"
              className="arrow arrow-left"
              onClick={handleNavigatePrec}
            />
            {/* Freccia destra: visibile solo quando `wordIndex` è l'ultimo */}
            {wordIndex === words.length - 1 && (
              <img
                src="/img/next.png"
                alt="Arrow Right"
                className="arrow arrow-right"
                onClick={handleNavigateNext}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Potion2;
