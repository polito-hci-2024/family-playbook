import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; 
import { useNavigate } from "react-router-dom";
import '../CSS/ButtonsEgypt.css';
import InteractiveGuide from "./Guide";
import { useLocation } from 'react-router-dom';


const ButtonsEgypt = ({ messages, onPopupVisibilityChange, onGuideVisibilityChange }) => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showGuide, setShowGuide] = useState(false); 
  const location = useLocation();
  const isRainingPage = location.pathname === '/raining';
  
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
  
  const handleInfoClick = () => {
    setShowGuide(true);
    onGuideVisibilityChange?.(true); // Notifica il parent quando la guida viene aperta
  };

  const handleCloseGuide = () => {
    setShowGuide(false);
    onGuideVisibilityChange?.(false); // Notifica il parent quando la guida viene chiusa
  };

  const handlePopupYesClick = () => {
    if (selectedIcon === 'raining') {
      navigate("/raining");
    } else if (selectedIcon === 'end_activity') {
      navigate("/last-chapter");
    }
    closePopup();
  };

  const buttonsMarkup = (
    <div className="barraBottoniEgitto">
      <div className="bottom-center-wrapper">
        <div className="bottom-center-icons">
          <div className="floating-buttons">
            <div className="icon-container" onClick={openPopup}>
              <img
                src="/img/buttons/imprevisto_egitto.png"
                alt="imprevisto_egitto"
                className="floating-button"
              />
            </div>
            <div
              className={`icon-container ${isRainingPage ? "disabled" : ""}`}
              onClick={isRainingPage ? null : () => navigate("/mapEgypt")}
            >
              <img
                src="/img/buttons/map_egitto.png"
                alt="mappa_egitto"
                className="floating-button"
              />
            </div>
            <div className="icon-container" onClick={handleInfoClick}>
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
            <div
              className={`popup-icon ${selectedIcon === "raining" ? "selected" : ""} disabled`}
              onClick={() => {}}
            >
              <img src="/img/unexpected/raining.png" alt="It's raining" />
              <span>It's raining</span>
            </div>

            <div
              className={`popup-icon ${selectedIcon === "end_activity" ? "selected" : ""}`}
              onClick={() => handleIconSelection("end_activity")}
            >
              <img src="/img/unexpected/end_activity.png" alt="End activity" />
              <span>End activity</span>
            </div>
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
      document.body 
    );

  return (
    <>
      {buttonsMarkup}
      {popupMarkup}
      {showGuide && <InteractiveGuide messages={messages} onClose={handleCloseGuide} />}
    </>
  );
};

export default ButtonsEgypt;
