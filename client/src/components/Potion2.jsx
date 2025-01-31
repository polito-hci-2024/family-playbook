import React, { useRef, useState } from "react";
import "../CSS/Potion2.css"; // File CSS per lo stile

const Potion2 = () => {
  const mestoloRef = useRef(null);
  const [rotation, setRotation] = useState(20); // Il mestolo parte inclinato di 20°
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["Pozione", "magica,", "gira", "e", "brilla,", "luce", "e", "incanto,", "ora", "scintilla!"];

  const startDrag = (event) => {
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  };

  const rotateMestolo = (event) => {
    if (!isDragging) return;

    let currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let delta = currentX - startX;
    let newRotation = rotation + delta * 0.5; // Regola la sensibilità della rotazione

    setRotation(newRotation);
    if (mestoloRef.current) {
      mestoloRef.current.style.transform = `rotate(${newRotation}deg)`;
    }
    setStartX(currentX);

    // Cambia la parola della filastrocca ogni 30° di rotazione
    if (Math.abs(newRotation / 30) > wordIndex && wordIndex < words.length) {
      setWordIndex(wordIndex + 1);
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="potion2">
      <div className="create"> 
        <h1 className="title">
          Un giro di mestolo, <br /> parole magiche e via!
        </h1>

        {/* Filastrocca con sfondo immagine orizzontale */}
        <div className="incantesimo-container">
          <img src="../img/ingredients/spell.png" alt="Sfondo filastrocca" className="sfondo-filastrocca" />
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
            onMouseMove={rotateMestolo}
            onTouchMove={rotateMestolo}
            onMouseUp={stopDrag}
            onTouchEnd={stopDrag}
            style={{ transform: `rotate(${rotation}deg)`, transition: isDragging ? "none" : "transform 0.2s ease-out" }} // Animazione fluida
          />
        </div>
      </div>
    </div>
  );
};

export default Potion2;
