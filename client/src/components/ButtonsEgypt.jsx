import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Per il portal
import { useNavigate } from "react-router-dom";
import '../CSS/ButtonsEgypt.css';

const ButtonsEgypt = ({ onPopupVisibilityChange }) => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Comunica al componente padre ogni variazione dello stato del popup
  useEffect(() => {
    if (onPopupVisibilityChange) {
      onPopupVisibilityChange(isPopupVisible);
    }
  }, [isPopupVisible, onPopupVisibilityChange]);

  const openPopup = () => {
    setIsPopupVisible(true);
    setSelectedIcon(null);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedIcon(null);
  };

  const handleIconSelection = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handlePopupYesClick = () => {
    if (selectedIcon === 'raining') {
      navigate("/raining");
    } else if (selectedIcon === 'end_activity') {
      navigate("/");
    }
    closePopup();
  };

  // Markup dei bottoni (rimane nella gerarchia originale)
  const buttonsMarkup = (
    <div className="barraBottoniEgitto">
      <div className="bottom-center-wrapper">
        <div className="bottom-center-icons">
          <div className="floating-buttons">
            {/* Bottone per aprire il popup */}
            <div className="icon-container" onClick={openPopup}>
              <img
                src="/img/buttons/imprevisto_egitto.png"
                alt="imprevisto_egitto"
                className="floating-button"
              />
            </div>
            {/* Bottone per la mappa */}
            <div className="icon-container" onClick={() => navigate("/mapEgypt")}>
              <img
                src="/img/buttons/map_egitto.png"
                alt="mappa_egitto"
                className="floating-button"
              />
            </div>
            {/* Bottone placeholder */}
            <div className="icon-container">
              <img
                src="/img/buttons/info_egitto.png"
                alt="info_egitto"
                className="floating-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Il markup del popup viene renderizzato tramite React Portal
  const popupMarkup =
    isPopupVisible &&
    ReactDOM.createPortal(
      <div className="barraBottoniEgitto">
      <div className="popup-overlay">
        <div className="popup-content">
  <div className="popup-header">
    <button className="popup-closeEgitto" onClick={closePopup}></button>
  </div>
  <h2>Puzzle of unexpected events</h2>

          <div className="popup-icons">
            {/* Icona "It's raining" */}
            <div
  className={`popup-icon ${selectedIcon === "raining" ? "selected" : ""} disabled`}
  onClick={() => {}}
>
  <img src="/img/unexpected/raining.png" alt="It's raining" />
  <span>It's raining</span>
</div>

            {/* Icona "End activity" */}
            <div
              className={`popup-icon ${selectedIcon === "end_activity" ? "selected" : ""}`}
              onClick={() => handleIconSelection("end_activity")}
            >
              <img src="/img/unexpected/end_activity.png" alt="End activity" />
              <span>End activity</span>
            </div>
            {/* Icone disabilitate */}
            <div className="popup-icon disabled">
              <img src="/img/unexpected/not_for_me.png" alt="Not for me" />
              <span>Not for me</span>
            </div>
            <div className="popup-icon disabled">
              <img src="/img/unexpected/im_lost.png" alt="I'm lost" />
              <span>I'm lost</span>
            </div>
          </div>
          {selectedIcon && (
            <div>
              <p className="popup-question">Are you sure about your choice?</p>
              <div className="popup-buttons">
                <button className="yes-button" onClick={handlePopupYesClick}>Yes</button>
                <button className="no-button" onClick={closePopup}>No</button>
              </div>
            </div>
          )}
        </div>
        </div></div>,
      document.body // Il popup viene montato direttamente sul body
    );

  return (
    <>
      {buttonsMarkup}
      {popupMarkup}
    </>
  );
};

export default ButtonsEgypt;
