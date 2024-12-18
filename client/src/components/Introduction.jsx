import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Aggiungi Framer Motion per animazioni
import '../CSS/Introduction.css';

function StoryPage({ characterName, characterType }) {
  const navigate = useNavigate();
  const [showArrows, setShowArrows] = useState(false); 

  const handleStartClick = () => {
    navigate('/configuration');
  };

  const panels = [
    {
      id: 1,
      image: '/img/characters/66a0f748dcb9b5de89b29e401162588b-removebg-preview-removebg-preview.png',
      text: `C'era una volta un giovane mago di nome Leo, i cui poteri, sebbene in fase di perfezionamento, racchiudevano già una promessa di grandezza. Cresciuto in una piccola cittadina, ai margini di una foresta immensa e misteriosa, Leo era circondato dalle rovine di antichi castelli e leggende dimenticate.`,
    },
    {
      id: 2,
      image: '/img/book.png',
      text: `Nel cuore di quel paesaggio selvaggio, aveva imparato l'arte della magia antica, trasmessa da generazioni, ma nessuno gli aveva mai parlato delle terre lontane e sconosciute che si celavano oltre l'orizzonte.`,
    },
    {
      id: 3,
      image: '/img/pensie.png',
      text: `Un giorno, perso nei suoi pensieri e nel vortice di domande che lo accompagnavano, Leo si ritrovò più lontano del solito dalla sua casa.`,
    },
    {
      id: 4,
      image: '/img/bivio.png',
      text: `Improvvisamente, senza rendersene conto, si trovò davanti a un bivio, là dove la strada si divideva in due direzioni misteriose.`,
    },
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY; // Posizione dello scroll
    const windowHeight = window.innerHeight; // Altezza della finestra
    const docHeight = document.documentElement.scrollHeight; // Altezza totale del documento
  
    // Log per vedere i valori e verificare se lo scroll viene rilevato correttamente
    console.log(`scrollY: ${scrollY}, windowHeight: ${windowHeight}, docHeight: ${docHeight}`);
  
    // Mostra le frecce quando l'utente ha scrollato oltre metà della pagina
    if (scrollY + windowHeight >= docHeight/4 * 3 ) { 
      console.log('Mostra frecce');
      setShowArrows(true);
    } else {
      console.log('Nascondi frecce');
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

  return (
    <div className="Introduction">
      <div className="story-background">
        <p className='title' > {'Chapter 1'} </p>
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
                className={`story-image ${panel.id === 4 ? 'inline-image-bivio' : 'inline-image'}`}
              />
            )}
            <p className="story-text">{panel.text}</p>
          </motion.div>
        ))}
        {/* Freccia destra */}
      {showArrows && (
        <img
          src="/img/next.png" // Sostituisci con il percorso corretto
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        />
      )}

      {/* Freccia sinistra */}
      {showArrows && (
        <img
          src="/img/back.png" // Sostituisci con il percorso corretto
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
        />
      )}
      </div>
    </div>
  );
}

export default StoryPage;
