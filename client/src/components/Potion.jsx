import React, { useState, useEffect } from "react";
import "../CSS/Potion.css";
import { useNavigate } from 'react-router-dom'; 
import ButtonsEldora from "./ButtonsEldora";

const Potion = () => {
  const [cauldron, setCauldron] = useState([]); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const ingredients = [
    { name: "3 Daisy", image: "/img/ingredients/margherita.png" },
    { name: "1 Leaf", image: "/img/ingredients/foglia.png" },
    { name: "1 Cup of water", image: "/img/ingredients/acqua.png" },
    { name: "2 Branches", image: "/img/ingredients/branches.png" }
  ];

  const [messages] = useState([
    "Hunt for the ingredients hidden in the boxes around the park! 🌿✨ Once you find them, drag them into the magic cauldron! 🧙‍♂️🔥"
  ]);

  const navigate = useNavigate();

  // Create a drag image element once when component mounts
  useEffect(() => {
    const dragPreview = document.createElement('div');
    dragPreview.id = 'drag-preview';
    dragPreview.style.position = 'absolute';
    dragPreview.style.top = '-1000px';
    dragPreview.style.width = '40px'; // Smaller size for drag preview
    dragPreview.style.height = '40px';
    dragPreview.style.pointerEvents = 'none';
    document.body.appendChild(dragPreview);

    return () => {
      document.body.removeChild(dragPreview);
    };
  }, []);

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
    
    // Find the image element
    const imgElement = event.target.querySelector('.ingredient-image');
    
    // Get the drag preview element
    const dragPreview = document.getElementById('drag-preview');
    dragPreview.innerHTML = '';
    
    // Create a new image for the preview
    const previewImg = new Image();
    previewImg.src = imgElement.src;
    previewImg.style.width = '100%';
    previewImg.style.height = '100%';
    previewImg.style.objectFit = 'contain';
    
    dragPreview.appendChild(previewImg);
    
    // Set the custom drag image
    event.dataTransfer.setDragImage(dragPreview, 20, 20);
  };

  const handleTouchStart = (event, ingredient) => {
    const touch = event.touches[0];
    
    const oldElement = document.getElementById("dragging-element");
    if (oldElement) oldElement.remove();

    // Create only the image element for touch drag
    const draggedElement = document.createElement('div');
    draggedElement.style.position = "fixed";
    draggedElement.style.width = "40px";  // Smaller size for touch drag
    draggedElement.style.height = "40px";
    draggedElement.style.zIndex = "1000";
    draggedElement.style.pointerEvents = "none";
    draggedElement.style.opacity = "0.8";
    draggedElement.id = "dragging-element";

    // Add only the image
    const img = new Image();
    img.src = ingredient.image;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    draggedElement.appendChild(img);

    document.body.appendChild(draggedElement);

    const updatePosition = (x, y) => {
      draggedElement.style.left = `${x - 20}px`;  // Adjusted for new size
      draggedElement.style.top = `${y - 20}px`;   // Adjusted for new size
    };

    updatePosition(touch.clientX, touch.clientY);

    const moveHandler = (e) => {
      const touchMove = e.touches[0];
      updatePosition(touchMove.clientX, touchMove.clientY);
    };

    const endHandler = (e) => {
      const touchEnd = e.changedTouches[0];
      const cauldronElem = document.querySelector(".cauldron");
      const rect = cauldronElem.getBoundingClientRect();

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
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", endHandler);
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

  const handleGuideVisibilityChange = (isVisible) => {
    setShowGuide(isVisible);
  };

  const isNextArrowActive = cauldron.length === ingredients.length;

  return (
    <div className="potion">
      <div className="buttons-eldora-container">
        <ButtonsEldora 
          messages={messages} 
          onPopupVisibilityChange={setIsPopupVisible}
          openGuideOnStart={false}
          onGuideVisibilityChange={handleGuideVisibilityChange}
        />
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

        <div 
          className="cauldron" 
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
        >
          <img src="/img/challenges/calderone-removebg-preview.png" alt="Cauldron" className="cauldron-image" />
          <p>Drag the items here</p>
        </div>

        <img src="/img/back.png" alt="Arrow Left" className="arrow arrow-left" onClick={handleNavigatePrec} />
        {isNextArrowActive && (
          <img src="/img/next.png" alt="Arrow Right" className="arrow arrow-right" onClick={handleNavigateNext} />
        )}
      </div>
    </div>
  );
};

export default Potion;