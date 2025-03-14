import React, { useRef, useState, useEffect } from "react";
import "../CSS/Potion2.css";
import { useNavigate } from 'react-router-dom'; 
import ButtonsEldora from "./ButtonsEldora";
import API from '../API.mjs';

const Potion2 = () => {
  const mestoloRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [prevRotation, setPrevRotation] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const navigate = useNavigate();

  const words = ["Curio", "Tempus,", "power", "of", "grace,", "Awaken", "the", "heart,", "the", "magic", "flows,", "Bring", "back", "health", "to", "every", "place."];

  const [messages] = useState([
    " Great! <br> You've found the ingredients and tossed them into the cauldron!🧙‍♂️✨ <br> Now it's time to bring the spell to life! 🔮",
    " Stir the cauldron with the ladle and say the glowing magic words to complete the spell! ✨🪄"
]);

  const startDrag = (event) => {
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  };

  const handleNavigateNext = async () => {
    const user_id = localStorage.getItem('userId'); 
    const challenge_id = 1; 

    try {
      await API.insertChallenge(user_id, challenge_id);
      navigate('/stepsPotion/2');
    } catch (error) {
      console.error('Failed to insert challenge:', error);
    }
  };

  const handleNavigatePrec = () => {
    navigate('/challenge/1/1');  
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };

  const moveMestolo = (event) => {
    if (!isDragging) return;

    let currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let delta = currentX - startX;

    
    let newX = xPosition + delta;
    if (newX < -100) newX = -100;
    if (newX > 100) newX = 100;

    
    let newRotation = (newX / 100) * 45; 

   
    setXPosition(newX);
    setRotation(newRotation);
    mestoloRef.current.style.transform = `translateX(${newX}px) rotate(${newRotation}deg)`;
    setStartX(currentX);

    if (Math.abs(newRotation - prevRotation) >= 30 && wordIndex < words.length) {
      setWordIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1));
      setPrevRotation(newRotation);
    }
  };

  useEffect(() => {
    if (wordIndex === words.length - 1 && videoPlayed==false) {
      setShowModal(true);
    }
  }, [wordIndex, videoPlayed]); 
  
  const closeModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setVideoPlayed(true);
    setShowModal(false);
  };
  
  
  const stopDrag = () => setIsDragging(false);

  return (
    <div className="potion2">
      {showModal && (
      <div className="video-overlay" onClick={closeModal} onTouchEnd={closeModal}>
        <video 
          className="fullscreen-video" 
          autoPlay 
          muted 
          playsInline
          onMouseDown={closeModal}
          onMouseUp={closeModal}
          onClick={closeModal}
          onTouchStart={closeModal}
          onTouchEnd={closeModal}
        >
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
        To activate the spell, <b>stir</b> the cauldron carefully with the spoon. Each turn will reveal a new magical word, ready to be <b>spoken</b>. Only with the right incantation will the potion come to life and heal the forest’s creatures!
        </p>
        
        <div className="incantesimo-container">
          <img src="../../img/challenges/spell.png" alt="Sfondo filastrocca" className="sfondo-filastrocca" />
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
              transition: isDragging ? "none" : "transform 0.01s ease-out",
            }}
          />

        
        </div>
        {(
          <>
            <img
              src="/img/back.png"
              alt="Arrow Left"
              className="arrow arrow-left"
              onClick={handleNavigatePrec}
            />
            {wordIndex === words.length - 1 && (
              <img
                src="/img/next.png"
                alt="Arrow Right"
                className="arrow arrow-right"
                onClick={handleNavigateNext}
              />
            )}
          <ButtonsEldora messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />

          </>
        )}
      </div>
    </div>
  );
};

export default Potion2;
