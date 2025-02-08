import React, { useState } from "react";
import "../CSS/Potion.css";
import { useNavigate } from 'react-router-dom'; 
import ButtonsEldora from "./ButtonsEldora";

const Potion = () => {
  const [cauldron, setCauldron] = useState([]); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const ingredients = [
    { name: "3 Daisy", image: "/img/ingredients/margherita.png" },
    { name: "1 Leaf", image: "/img/ingredients/foglia.png" },
    { name: "1 Cup of water", image: "/img/ingredients/acqua.png" },
    { name: "2 Branches", image: "/img/ingredients/branches.png" }
  ];

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

  const handleTouchStart = (event, ingredient) => {
    event.preventDefault();
    const touch = event.touches[0];

    const oldElement = document.getElementById("dragging-element");
    if (oldElement) oldElement.remove();

    const draggedElement = event.target.cloneNode(true);
    draggedElement.style.position = "absolute";
    draggedElement.style.width = "60px";
    draggedElement.style.zIndex = "1000";
    draggedElement.style.pointerEvents = "none";
    draggedElement.id = "dragging-element";
    document.body.appendChild(draggedElement);

    draggedElement.style.left = `${touch.clientX - 30}px`;
    draggedElement.style.top = `${touch.clientY - 30}px`;

    const moveHandler = (e) => {
      const touchMove = e.touches[0];
      draggedElement.style.left = `${touchMove.clientX - 30}px`;
      draggedElement.style.top = `${touchMove.clientY - 30}px`;
    };

    const endHandler = (e) => {
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", endHandler);
      
      const cauldronElem = document.querySelector(".cauldron");
      const rect = cauldronElem.getBoundingClientRect();
      const touchEnd = e.changedTouches[0];

      if (
        touchEnd.clientX >= rect.left &&
        touchEnd.clientX <= rect.right &&
        touchEnd.clientY >= rect.top &&
        touchEnd.clientY <= rect.bottom
      ) {
        if (!cauldron.includes(ingredient.name)) {
          setCauldron((prev) => [...prev, ingredient.name]);
        }
      }

      draggedElement.remove();
    };

    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", endHandler);
  };

  const handleNavigateNext = () => {
    navigate('/challenge/1/2');  
  };

  const handleNavigatePrec = () => {
    navigate('/step-selection-eldora');  
  };

  const isNextArrowActive = cauldron.length === ingredients.length;

  return (
    <div className="potion">
      <div className="buttons-eldora-container">
    <ButtonsEldora onPopupVisibilityChange={setIsPopupVisible} />
  </div>
      <div className="potion-hunters">
        <h1 className="title">The Potion of Vitality</h1>
        <p className="intro">
          In Eldora, the animals are unwell and need to be healed.
          <br/>A special potion can help, but first, gather magical ingredients hidden in the forest.
          <br/> Head to Parco della Mandria, <b>find</b> the ingredients and carefully <b>drag</b> them into the cauldron.
        </p>  

        <div className="ingredients-list">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className={`ingredient-card ${cauldron.includes(ingredient.name) ? "disabled" : ""}`}
              draggable={!cauldron.includes(ingredient.name)}
              onDragStart={(e) => handleDragStart(e, ingredient.name)}
              onTouchStart={(e) => handleTouchStart(e, ingredient)}
            >
              <div className="ingredient-quantity-badge">Qty: {ingredient.name.split(" ")[0]}</div>
              <img src={ingredient.image} className="ingredient-image" alt={ingredient.name} />
              <p className="ingredient-name">{ingredient.name.split(" ").slice(1).join(" ")}</p>
            </div>
          ))}
        </div>

        <div className="cauldron" onDragOver={handleDragOver} onDrop={handleDrop}>
          <img src="/img/calderone-removebg-preview.png" alt="Cauldron" className="cauldron-image" />
          <p>Drag the items here</p>
        </div>

        <img src="/img/back.png" alt="Arrow Left" className="arrow arrow-left" onClick={handleNavigatePrec} />
        {isNextArrowActive && <img src="/img/next.png" alt="Arrow Right" className="arrow arrow-right" onClick={handleNavigateNext} />}
      </div>
    </div>
  );
};

export default Potion;
