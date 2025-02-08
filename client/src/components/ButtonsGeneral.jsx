import React, { useState } from 'react';
import InteractiveGuide from './GuidaRebecca';
const ButtonsGeneral = ({ messages }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showGuide, setShowGuide] = useState(false); 

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleInfoClick = () => {
    setShowGuide(true); 
  };

  const handleCloseGuide = () => {
    setShowGuide(false); 
  };

  const disabledButtonStyle = {
    filter: 'grayscale(100%)',
    opacity: '0.5',
    cursor: 'not-allowed'
  };

  const popupStyle = {
    position: 'fixed',
    bottom: '150px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FFC107',
    color: 'black',
    padding: '20px 40px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    display: showPopup ? 'block' : 'none',
    zIndex: 1000,
    fontSize: '24px',
    textAlign: 'center',
    maxWidth: '500px',
    boxSizing: 'border-box',
    animation: 'shake 2s ease-in-out'
  };

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(-50%); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-48%); }
            20%, 40%, 60%, 80% { transform: translateX(-52%); }
          }
        `}
      </style>

      <div className="barraBottoni" style={{ position: 'relative' }}>
        <div className="bottom-center-wrapper">
          <div className="bottom-center-icons">
            <div className="floating-buttons">
              <div className="icon-container" onClick={handleButtonClick}>
                <img
                  src="/img/buttons/imprevisto.png"
                  alt="imprevisto_general"
                  className="floating-button"
                  style={disabledButtonStyle}
                />
              </div>
              <div className="icon-container" onClick={handleButtonClick}>
                <img
                  src="/img/buttons/map.png"
                  alt="mappa_general"
                  className="floating-button"
                  style={disabledButtonStyle}
                />
              </div>
              <div className="icon-container" onClick={handleInfoClick}>
                <img
                  src="/img/buttons/info.png"
                  alt="info_general"
                  className="floating-button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={popupStyle}>
        Curious about these buttons, huh? Keep going to unlock them!
      </div>

     
      {showGuide && <InteractiveGuide messages={messages} onClose={handleCloseGuide} />}

    </>
  );
};

export default ButtonsGeneral;
