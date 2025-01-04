import React, { useState } from "react";
import ScratchToReveal from "./ScratchToReveal";
import "../CSS/Scratch.css";
import { useNavigate } from "react-router-dom";

const Scratch = () => {
  const images = [
    { src: "../img/ingredients/daisy.jpeg", id: "image1" },
    { src: "../img/challenges/Step1.png", id: "image2" }, // Immagine corretta
    { src: "../img/challenges/Step2.png", id: "image3" },
    { src: "../img/challenges/Step3.png", id: "image4" },
  ];

  const [completedImage, setCompletedImage] = useState(null); // Stato per immagine completata
  const navigate = useNavigate();

  const handleComplete = (id) => {
    setCompletedImage(id); // Salva l'ID dell'immagine completata
  };

  const handleNavigateNext = () => {
    navigate("/next-page"); // Sostituisci '/next-page' con il percorso desiderato
  };

  const isNextArrowActive = completedImage === "image2"; // Freccia destra attiva solo se `image2` è completata

  return (
    <div className="scratch">
        {/* Titolo della pagina */}
        <h1 className="title">Trova la chiave magica</h1>
        <p className="intro">
      LA CHIAVE AL MOMENTO SONO LE 3 POZIONI, OVVERO IMMAGINE 2. Lo gnomo burlone della foresta ha deciso di mettere alla prova il tuo coraggio! Ha rubato la chiave magica che ti serve per continuare il tuo viaggio e l'ha nascosta tra quattro misteriosi riquadri incantati. Solo uno di questi contiene la chiave. Gratta i riquadri con attenzione per scoprire dove si trova e prosegui nella tua avventura!
        </p>
        {/* Box con le immagini */}
        <div className="scratch-grid">
          {images.map((image) => (
            <div key={image.id} className="scratch-box">
              <ScratchToReveal
                width={250}
                height={250}
                minScratchPercentage={70}
                className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
                onComplete={() => handleComplete(image.id)}
                gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
              >
                <img src={image.src} alt={image.id} className="scratch-image" />
              </ScratchToReveal>
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
    </div>
  );
};

export default Scratch;
