import React, { useRef, useState } from "react";
import "../CSS/Potion2.css"; // File CSS per lo stile

const Potion2 = () => {
  const mestoloRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [xPosition, setXPosition] = useState(0); // 🔹 Posizione orizzontale
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [prevRotation, setPrevRotation] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ["Pozione", "magica,", "gira", "e", "brilla,", "luce", "e", "incanto,", "ora", "scintilla!"];

  const startDrag = (event) => {
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
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

  const stopDrag = () => setIsDragging(false);

  return (
    <div className="potion2">
      <div className="create">
        <h1 className="title">
          Un giro di mestolo, <br /> parole magiche e via!
        </h1>

        {/* Filastrocca con sfondo immagine */}
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
      </div>
    </div>
  );
};

export default Potion2;
