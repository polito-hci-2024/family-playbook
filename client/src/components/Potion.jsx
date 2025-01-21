import React, { useState } from "react";
import "../CSS/Potion.css";
import { useNavigate } from 'react-router-dom'; 

const Potion = () => {
  const [cauldron, setCauldron] = useState([]); // Ingredienti nel calderone
  const ingredients = [
    { name: "3 Margherite", image: "../img/ingredients/daisy.jpeg" },
    { name: "1 foglia", image: "../img/ingredients/daisy.jpeg" },
    { name: "1 bicchiere d'acqua di sorgente", image: "../img/ingredients/daisy.jpeg" },
    { name: "2 legnetti", image: "../img/ingredients/daisy.jpeg" }
  ];
  const [showArrows, setShowArrows] = useState(true); // Variabile per mostrare le frecce
  const navigate = useNavigate();

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

  const handleNavigateNext = () => {
    navigate('/last-step-selection-eldora');  // Sostituisci '/next-page' con il percorso desiderato
  };

  const handleNavigateBack = () => {
    navigate("/step-selection-eldora");
  }

  const isNextArrowActive = cauldron.length === ingredients.length;

  return (
    <div className="potion">
      <div className="potion-hunters">
        {/* Titolo della pagina */}
        <h1 className="title">Potion Hunters</h1>
        <p className="intro">
      Ad Eldoria gli animali non stanno più bene. La lepre è stanca, il gufo non vede più chiaramente e il riccio è sempre addormentato. Solo una pozione speciale può aiutarli, ma per crearla servono ingredienti magici nascosti in tutta la foresta.
        </p>
        <p className="intro"> Aiuta i nostri amici a trovare gli ingredienti giusti e trascinali nel calderone. </p>  

        {/* Lista degli ingredienti con le card */}
        <div className="ingredients-list">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className={`ingredient-card ${cauldron.includes(ingredient.name) ? "disabled" : ""}`}
              draggable={!cauldron.includes(ingredient.name)} // Disabilita il drag se già nel calderone
              onDragStart={(e) => handleDragStart(e, ingredient.name)}
            >
              {/* Badge per la quantità */}
              <div className="ingredient-quantity-badge">
                Qtà: {ingredient.name.split(" ")[0]}
              </div>
              {/* Immagine dell'ingrediente */}
              <img src={ingredient.image} className="ingredient-image" alt={ingredient.name} />
              {/* Nome dell'ingrediente */}
              <p className="ingredient-name">{ingredient.name.split(" ").slice(1).join(" ")}</p>
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
              onClick={handleNavigateBack}
            />
            {/* Freccia destra: attiva solo se tutti gli ingredienti sono nel calderone */}
            <img
              src="/img/next.png"
              alt="Arrow Right"
              className={`arrow arrow-right ${isNextArrowActive ? "enabled" : "disabled"}`}
              onClick={isNextArrowActive ? handleNavigateNext : null} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Potion;
