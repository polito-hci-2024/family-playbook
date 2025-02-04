import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/Buttons.css';

const ButtonsEldora = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    setIsPopupVisible(true); // Mostra la domanda "Are you sure of your choice?"
  };

  const handlePopupYesClick = () => {
    if (selectedIcon && selectedIcon === 'raining') {
      // Naviga alla pagina specificata per l'icona selezionata
      navigate("/raining"); // Reindirizza alla pagina "raining.jsx"
    } else if (selectedIcon && selectedIcon === 'end_activity') {
      navigate("/");
    }
    setIsPopupVisible(false); // Chiudi il pop-up dopo la selezione
  };

  return (
    <>
      <div className="floating-buttons">
        {/* Primo bottone - Apre il popup */}
        <div className="icon-container" onClick={togglePopup}>
          <img src="/img/bottonicircolari/imprevisto_eldora.png" alt="imprevisto_eldora" className="floating-button" />
        </div>

        {/* Secondo bottone - Naviga a /map */}
        <div className="icon-container" onClick={() => navigate("/map")}>
          <img src="/img/bottonicircolari/mappa_eldora.png" alt="mappa_eldora" className="floating-button" />
        </div>

        {/* Terzo bottone - Placeholder per future funzioni */}
        <div className="icon-container">
          <img src="/img/bottonicircolari/info_eldora.png" alt="info_eldora" className="floating-button" />
        </div>
      </div>

      {/* Popup Modale */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Puzzle of unexpected events</h2>
            <div className="popup-icons">
              {/* Icona 1 */}
              <div className={`popup-icon ${selectedIcon === "raining" ? "selected" : ""}`} onClick={() => handleIconClick("raining")}>
                <img src="/img/unexpected/raining.png" alt="It's raining" />
                <span>It's raining</span>
              </div>
              {/* Icona 2 */}
              <div className={`popup-icon ${selectedIcon === "end_activity" ? "selected" : ""}`} onClick={() => handleIconClick("end_activity")}>
                <img src="/img/unexpected/end_activity.png" alt="End activity" />
                <span>End activity</span>
              </div>
              {/* Icona 3 - Disabilitata */}
              <div className="popup-icon disabled">
                <img src="/img/unexpected/not_for_me.png" alt="Not for me" />
                <span>Not for me</span>
              </div>
              {/* Icona 4 - Disabilitata */}
              <div className="popup-icon disabled">
                <img src="/img/unexpected/im_lost.png" alt="I'm lost" />
                <span>I'm lost</span>
              </div>
            </div>

            {selectedIcon && (
              <div>
                <p className="popup-question">Are you sure about your choice?</p>
                <div className="popup-buttons">
                  <button className="yes-button" onClick={handlePopupYesClick}>
                    Yes
                  </button>
                  <button className="no-button" onClick={() => { setIsPopupVisible(false); setSelectedIcon(null); }}>
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonsEldora;

