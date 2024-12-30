import React, { useState } from "react";
import "../CSS/Potion.css";

const Potion = () => {
  const [cauldron, setCauldron] = useState([]); // Ingredienti nel calderone
  const ingredients = [
    { name: "3 Margherite", image: "../img/ingredients/daisy.jpeg" },
    { name: "1 foglia", image: "../img/ingredients/daisy.jpeg" },
    { name: "1 bicchiere d'acqua di sorgente", image: "../img/ingredients/daisy.jpeg" },
    { name: "1 legnetto", image: "../img/ingredients/daisy.jpeg" }
  ];
  const [showArrows, setShowArrows] = useState(true); // Variabile per mostrare le frecce

  const handleDrop = (event) => {
    event.preventDefault();
    const ingredient = event.dataTransfer.getData("text/plain");
    if (!cauldron.includes(ingredient)) {
      setCauldron((prev) => [...prev, ingredient]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event, ingredient) => {
    event.dataTransfer.setData("text/plain", ingredient);
  };

  const isNextArrowActive = cauldron.length === ingredients.length;

  return (
    <div className="potion">
      <div className="potion-hunters">
        {/* Titolo della pagina */}
        <h1 className="title">Potion Hunters</h1>
        <p className="intro">
          La foresta incantata nasconde ingredienti magici per creare la pozione
          perfetta. Trascina gli ingredienti nel calderone per continuare!
        </p>

        {/* Lista degli ingredienti con le card */}
        <div className="ingredients-list">
            {ingredients.map((ingredient) => (
                <div
                key={ingredient.name}
                className="ingredient-card"
                draggable
                onDragStart={(e) => handleDragStart(e, ingredient.name)}
                >
                {/* Immagine dell'ingrediente */}
                <img
                    src={ingredient.image}
                    className="ingredient-image"
                />
                <p>{ingredient.name}</p>
                </div>
            ))}
        </div>



        {/* Calderone con l'immagine */}
        <div
          className="cauldron"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <img
            src="../img/calderone-removebg-preview.png"
            alt="Cauldron"
            className="cauldron-image"
          />
          <p>Trascina qui gli ingredienti</p>
          <div className="cauldron-contents">
            {cauldron.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
        </div>

        {/* Frecce di navigazione */}
        {showArrows && (
          <>
            {/* Freccia sinistra */}
            <img
              src="/img/back.png"
              alt="Arrow Left"
              className="arrow arrow-left"
              onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })}
            />
            {/* Freccia destra: attiva solo se tutti gli ingredienti sono nel calderone */}
            <img
              src="/img/next.png"
              alt="Arrow Right"
              className={`arrow arrow-right ${isNextArrowActive ? "enabled" : "disabled"}`}
              onClick={isNextArrowActive ? () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" }) : undefined}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Potion;
