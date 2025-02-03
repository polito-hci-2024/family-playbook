import React, { useState } from "react";
import "../CSS/Potion.css";
import { useNavigate } from 'react-router-dom'; 

const Potion = () => {
  const [cauldron, setCauldron] = useState([]); 
  const ingredients = [
    { name: "3 Daisy", image: "../../img/ingredients/margherita.png" },
    { name: "1 Leaf", image: "../../img/ingredients/foglia.png" },
    { name: "1 Cup of water", image: "../../img/ingredients/acqua.png" },
    { name: "2 Branches", image: "../../img/ingredients/branches.png" }
  ];
  const [showArrows, setShowArrows] = useState(true); 
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
    navigate('/challenge/1/1');  
  };
  const handleNavigatePrec = () => {
    navigate('/step-selection-eldora');  
  };
  const isNextArrowActive = cauldron.length === ingredients.length;

  return (
    <div className="potion">
      <div className="potion-hunters">
        {/* Titolo della pagina */}
        <h1 className="title">The Potion of Vitality</h1>
        <p className="intro">
        In Eldora, the animals are unwell— the hare is tired, the owl’s vision is blurry, and the hedgehog sleeps endlessy.

        </p>
        <p className="intro"> A special potion can help, but first, gather magical ingredients hidden in the forest. Head to Parco della Mandria, find the ingredients and carefully drag them into the cauldron.
        </p>  

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
                Qty: {ingredient.name.split(" ")[0]}
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
            src="../../img/calderone-removebg-preview.png"
            alt="Cauldron"
            className="cauldron-image"
          />
          <p>Drag the items here</p>
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
              onClick={handleNavigatePrec}
            />
            { isNextArrowActive && (
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

export default Potion;
