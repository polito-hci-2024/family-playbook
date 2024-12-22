import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Aggiungi Framer Motion per animazioni
import '../CSS/Object.css';

function StoryPage({ characterName, characterType }) {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); // Stato per la scelta dell'utente
  const [showBubble, setShowBubble] = useState(false); // Stato per il fumetto
  const [showCharacter, setShowCharacter] = useState(false);

  const handleChoice = (path) => {
    setSelectedChoice(path); // Salva la scelta
  };

  const navigateToChoice = () => {
    if (selectedChoice) {
      navigate(selectedChoice); // Naviga solo se una scelta è stata fatta
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY; // Posizione dello scroll
    const windowHeight = window.innerHeight; // Altezza della finestra
    const docHeight = document.documentElement.scrollHeight; // Altezza totale del documento
  
    // Mostra le frecce quando l'utente ha scrollato oltre metà della pagina
    if (scrollY + windowHeight >= docHeight/4 * 3 ) { 
      setShowCharacter(true);
    } else {
      setShowCharacter(false);
    }
  };

  useEffect(() => {
    // Aggiungi un listener per lo scroll
    window.addEventListener('scroll', handleScroll);

    // Rimuovi il listener quando il componente viene smontato
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const panels = [
    {
      id: 1,
      image: '/img/place/magic-tree.png',
      text: `Dopo aver intrapreso il sentiero che lo conduceva nel cuore della foresta, Leo sentì una strana energia nell'aria. Gli alberi, alti e maestosi, sembravano osservarlo, come se custodissero antichi segreti. Le foglie frusciavano sotto i suoi passi, ma poi, d'improvviso, un riflesso attirò la sua attenzione.`,
    },
    {
      id: 2,
      text: "Si avvicinò e si chinò, trovando:",
      isChoice: true, 
    },
  ];

  return (
    <div className="Object">
      <div className="story-background">
        {panels.map((panel, index) => (
          <motion.div
            className="story-panel-object"
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            {panel.image && (
              <img
                src={panel.image}
                alt={`Panel ${panel.id}`}
                className={`story-image-object`}
              />
            )}
            <p className="story-text">{panel.text}</p>

            {panel.isChoice && panel.id === 2 && (
              <div className="choice-container">
                <div className="choice-card-object" onClick={() => handleChoice('/amuleto')}>
                  <img
                    src="/img/object/pendant.png"
                    className="choice-image"
                    alt="Antico Amuleto"
                  />
                  <p className="choice-title">Antico Amuleto</p>
                  <p className="choice-description">
                    L'amuleto era un talismano naturale, un oggetto che sembrava appartenere alla foresta. Leo lo strinse tra le dita, sentendo un profondo senso di connessione con la natura.
                  </p>
                </div>
                <div className="choice-card-object" onClick={() => handleChoice('/tower')}>
                  <img
                    src="/img/object/footprints.png"
                    className="choice-image"
                    alt="Impronte Misteriose"
                  />
                  <p className="choice-title">Impronte Misteriose</p>
                  <p className="choice-description">
                    Le impronte erano strane, con tre lunghe dita che terminavano in artigli aguzzi. Non somigliavano a nulla che Leo avesse mai visto, eppure emanavano un'aura di familiarità, come se appartenessero a una creatura di antiche leggende.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}

         {/* Personaggio e fumetto visibili con effetto */}
         {showCharacter && (
          <motion.div
            className="character-bubble"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/img/Lumi-angolo.png" // Immagine del personaggio
              alt="Character"
              className="character-image"
            />
            <div className="speech-bubble">
              <p>Che cosa sceglierai?</p>
            </div>
          </motion.div>
        )}

        {/* Freccia sinistra sempre visibile */}
        <img
          src="/img/back.png" // Sostituisci con il percorso corretto
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
        />

        {/* Freccia destra visibile solo dopo una scelta */}
        {selectedChoice && (
          <img
            src="/img/next.png" // Sostituisci con il percorso corretto
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={navigateToChoice}
          />
        )}
      </div>
    </div>
  );
}

export default StoryPage;
