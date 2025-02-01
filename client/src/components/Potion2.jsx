import React, { useRef, useState, useEffect } from "react";
import "../CSS/Potion2.css"; // File CSS per lo stile
import { useNavigate } from 'react-router-dom'; 

const Sparkles = () => {
  const numSparkles = 30; // Più scintille per effetto più wow!
  const sparkles = Array.from({ length: numSparkles });

  return (
    <div className="sparkle-container">
      {sparkles.map((_, index) => {
        const randomX = Math.random() * 200 - 100; // Distanza varia da -100px a +100px rispetto al centro
        const randomY = Math.random() * 100; // Distanza verticale da 0 a 100%
        const randomSize = Math.random() * 15 + 5; // Variazione della dimensione delle scintille
        const randomDelay = Math.random() * 0.5; // Ritardo randomico per effetto "onda"

        return (
          <div
            key={index}
            className="sparkle"
            style={{
              top: `${randomY}%`,  // Posizione verticale
              left: `${50 + randomX}%`,  // Posizione orizzontale (centrato con offset)
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animationDelay: `${randomDelay}s`
            }}
          />
        );
      })}
    </div>
  );
};

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

  const words = ["Pozione", "magica,", "gira", "e", "brilla,", "luce", "e", "incanto,", "ora", "scintilla!"];

  const startDrag = (event) => {
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  };

  const handleNavigateNext = () => {
    navigate('/next-page'); 
  };

  const handleNavigatePrec = () => {
    navigate('/potion');  
  };

  const moveMestolo = (event) => {
    if (!isDragging) return;

    let currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let delta = currentX - startX;

    // 🔹 Calcola il movimento orizzontale, limitato a -50px a +50px
    let newX = xPosition + delta;
    if (newX < -100) newX = -100;
    if (newX > 100) newX = 100;

    // 🔹 La rotazione è proporzionale al movimento orizzontale (aumento della rotazione in base alla posizione)
    let newRotation = (newX / 100) * 45; // La rotazione va da -45° a +45° in base a x

    // ✅ Aggiorna stato
    setXPosition(newX);
    setRotation(newRotation);
    mestoloRef.current.style.transform = `translateX(${newX}px) rotate(${newRotation}deg)`;
    setStartX(currentX);

    // ✅ Cambia parola ogni 35° di variazione rispetto alla rotazione precedente
    if (Math.abs(newRotation - prevRotation) >= 35 && wordIndex < words.length) {
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
      <div className="create">
        <h1 className="title">
          Un giro di mestolo, <br /> parole magiche e via!
        </h1>
        {/* Descrizione fiabesca */}
        <p className="descrizione-incantesimo">
        Per attivare l'incantesimo, mescola il mestolo con cura. Ogni giro farà apparire una nuova parola magica, pronta per essere recitata. Solo con il giusto incanto la pozione prenderà vita!
        </p>
        {/* Filastrocca con sfondo immagine */}
        <div className="incantesimo-container">
          <img src="../img/spell.png" alt="Sfondo filastrocca" className="sfondo-filastrocca" />
          <div className="filastrocca">
            {words.map((word, index) => (
              <span key={index} className={index <= wordIndex ? "active" : ""}>
                {word}{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="container">
          {/* Video del calderone */}
          <img className="calderone" src="/videos/calderone_ultimo.gif" alt="Calderone animato" />

          {/* Mestolo interattivo */}
          <img
            src={"../img/ingredients/bastone.png"}
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
        {/* Effetto Sparkle quando tutte le parole sono state recitate */}
        {wordIndex === words.length - 1 && <Sparkles />}
        {wordIndex === words.length - 1 && <Sparkles />}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Bravissimo!</h2>
              <p>Hai completato la pozione! 🎉</p>
              <img src="../img/ingredients/potion.png" alt="Immagine della pozione" className="modal-image" />
              <p>Entro la fine della giornata, tutti gli animali staranno meglio solo grazie a te! 🐾</p>
              <button onClick={() => setShowModal(false)}>Chiudi</button>
            </div>
          </div>
        )}

        
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
