import React, { useState } from 'react';

const ButtonsGeneral = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Il popup scompare dopo 3 secondi
  };

  // Stili inline per il bottone disabilitato
  const disabledButtonStyle = {
    filter: 'grayscale(100%)',
    opacity: '0.5',
    cursor: 'not-allowed'
  };

  // Stili inline per il popup
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

  const buttonsMarkup = (
    <div className="barraBottoni" style={{ position: 'relative' }}>
      <div className="bottom-center-wrapper">
        <div className="bottom-center-icons">
          <div className="floating-buttons">
            {/* Bottone per aprire il popup */}
            <div className="icon-container" onClick={handleButtonClick}>
              <img
                src="/img/buttons/imprevisto.png"
                alt="imprevisto_general"
                className="floating-button"
                style={disabledButtonStyle}
              />
            </div>
            {/* Bottone per la mappa */}
            <div className="icon-container" onClick={handleButtonClick}>
              <img
                src="/img/buttons/map.png"
                alt="mappa_general"
                className="floating-button"
                style={disabledButtonStyle}
              />
            </div>
            {/* Bottone placeholder */}
            <div className="icon-container">
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
  );

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
      {buttonsMarkup}
      <div style={popupStyle}>Curious about these buttons, huh? Keep going to unlock them!</div>
    </>
  );
};

export default ButtonsGeneral;
