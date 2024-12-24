import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Place.css';

function Place({ characterName, characterType }) {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); // Stato per la scelta dell'utente
  const [showBubble, setShowBubble] = useState(false); // Stato per il fumetto

  const panels = [
    {
      id: 3,
      text: "Verso quale luogo misterioso si dirigerà Leo?",
      isChoice: true, 
    },
  ];

  useEffect(() => {
    // Mostra il fumetto dopo 1.5 secondi
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer); // Pulisce il timeout quando il componente viene smontato
  }, []);

  const handleChoice = (path) => {
    // Salva la scelta ma non navigare immediatamente
    setSelectedChoice(path);
  };

  const navigateToChoice = () => {
    if (selectedChoice) {
      navigate(selectedChoice); // Naviga solo se una scelta è stata fatta
    }
  };

  return (
    <div className="Place">
      <div className="story-background">
        {panels.map((panel, index) => (
          <motion.div
            className="story-panel-place"
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <p className="story-text-place">{panel.text}</p>

            {panel.isChoice && panel.id === 3 && (
                <div className="choice-container">
                    <div
                    className="choice-card"
                    onClick={() => handleChoice('/forest')}
                    >
                    <img
                        src="/img/place/forest.jpg"
                        className="choice-image"
                        alt="Foresta Incantata"
                    />
                    <p className="choice-title">Foresta Incantata</p>
                    <p className="choice-description">
                    A sinistra, la via si perdeva tra gli alberi della Foresta Incantata, un luogo che solo i più coraggiosi osavano avvicinare. Si diceva che chi entrava nel cuore di quella foresta non fosse mai più lo stesso, che la natura stessa custodisse antichi segreti e poteri arcani.
                    </p>
                    </div>
                    <div
                    className="choice-card"
                    onClick={() => handleChoice('/tower')}
                    >
                    <img
                        src="/img/place/tower.jpg"
                        className="choice-image"
                        alt="Vecchia Torre in Rovina"
                    />
                    <p className="choice-title">Vecchia Torre in Rovina</p>
                    <p className="choice-description">
                    A destra, si ergeva la Vecchia Torre in Rovina, la sua silhouette spettrale avvolta nella nebbia, come una sentinella solitaria nel tempo. La torre, da tempo abbandonata, custodiva ancora leggende di magie perdute e di conoscenze dimenticate, un richiamo irresistibile per chi, come Leo, era sempre alla ricerca di risposte.
                    </p>
                    </div>
                </div>
            )}
          </motion.div>
        ))}
            {/* Personaggio e fumetto */}
        <img
            src="/img/Lumi-angolo.png"
            alt="Personaggio"
            className="character-image"
         />
        <div className={`speech-bubble ${showBubble ? 'show' : ''}`}>
            Select an option to continue
        </div>
        {/* Freccia destra */}
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={navigateToChoice} // Naviga solo se una scelta è stata fatta
        />

        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={navigateToChoice} // Naviga solo se una scelta è stata fatta
        />
      </div>
    </div>
  );
}

export default Place;
