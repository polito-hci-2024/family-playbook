import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Place.css';

function Place({ characterName, characterType }) {
  const navigate = useNavigate();
  const [showArrows, setShowArrows] = useState(false); 
  const [selectedChoice, setSelectedChoice] = useState(null); // Stato per la scelta dell'utente

  const panels = [
    {
      id: 1,
      image: '/img/characters/66a0f748dcb9b5de89b29e401162588b-removebg-preview-removebg-preview.png',
      text: `A sinistra, la via si perdeva tra gli alberi della Foresta Incantata, un luogo che solo i più coraggiosi osavano avvicinare. Si diceva che chi entrava nel cuore di quella foresta non fosse mai più lo stesso, che la natura stessa custodisse antichi segreti e poteri arcani.`,
    },
    {
      id: 2,
      image: '/img/book.png',
      text: `A destra, si ergeva la Vecchia Torre in Rovina, la sua silhouette spettrale avvolta nella nebbia, come una sentinella solitaria nel tempo. La torre, da tempo abbandonata, custodiva ancora leggende di magie perdute e di conoscenze dimenticate, un richiamo irresistibile per chi, come Leo, era sempre alla ricerca di risposte.`,
    },
    {
      id: 3,
      text: `Verso quale luogo misterioso si dirigerà Leo?`,
      isChoice: true, 
    },
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY; // Posizione dello scroll
    const windowHeight = window.innerHeight; // Altezza della finestra
    const docHeight = document.documentElement.scrollHeight; // Altezza totale del documento
  
    // Mostra le frecce quando l'utente ha scrollato oltre metà della pagina
    if (scrollY + windowHeight >= docHeight / 4 * 3) { 
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  };

  useEffect(() => {
    // Aggiungi l'event listener per lo scroll
    window.addEventListener('scroll', handleScroll);
    
    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    <div className="Introduction">
      <div className="story-background">
        {panels.map((panel, index) => (
          <motion.div
            className="story-panel"
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            {panel.image && (
              <img
                src={panel.image}
                alt={`Panel ${panel.id}`}
                className={`story-image ${panel.id === 3 ? 'inline-image-bivio' : 'inline-image'}`}
              />
            )}
            <p className="story-text">{panel.text}</p>

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
                        Addentrati tra gli alberi che custodiscono segreti antichi e poteri arcani.
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
                        Scopri le leggende di magie perdute e conoscenze dimenticate.
                    </p>
                    </div>
                </div>
            )}
          </motion.div>
        ))}

        {/* Freccia destra */}
        {showArrows && (
          <img
            src="/img/next.png"
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={navigateToChoice} // Naviga solo se una scelta è stata fatta
          />
        )}

        {/* Freccia sinistra */}
        {showArrows && (
          <img
            src="/img/back.png"
            alt="Arrow Left"
            className="arrow arrow-left"
            onClick={navigateToChoice} // Naviga solo se una scelta è stata fatta
          />
        )}
      </div>
    </div>
  );
}

export default Place;
