import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; 
import { useNavigate } from "react-router-dom";
import '../CSS/Buttons.css';

const ButtonsEldora = ({ onPopupVisibilityChange }) => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

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
      navigate("/last-chapter");
    }
    closePopup();
  };

  const buttonsMarkup = (
    <div className="barraBottoni">
      <div className="bottom-center-wrapper">
        <div className="bottom-center-icons">
          <div className="floating-buttons">
            <div className="icon-container" onClick={openPopup}>
              <img
                src="/img/buttons/imprevisto.png"
                alt="imprevisto_eldora"
                className="floating-button"
              />
            </div>
            <div className="icon-container" onClick={() => navigate("/map")}>
              <img
                src="/img/buttons/map.png"
                alt="mappa_eldora"
                className="floating-button"
              />
            </div>
            <div className="icon-container">
              <img
                src="/img/buttons/info.png"
                alt="info_eldora"
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
      <div className="popup-overlay">
        <div className="popup-content">
  <div className="popup-header">
    <button className="popup-close" onClick={closePopup}></button>
  </div>
  <h2>Puzzle of unexpected events</h2>

          <div className="popup-icons">
            <div
              className={`popup-icon ${selectedIcon === "raining" ? "selected" : ""}`}
              onClick={() => handleIconSelection("raining")}
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
      </div>,
      document.body 
    );

  return (
    <>
      {buttonsMarkup}
      {popupMarkup}
    </>
  );
};

export default ButtonsEldora;
