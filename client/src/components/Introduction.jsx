import React,  { useEffect }  from 'react';
import '../CSS/Introduction.css';
import { Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/OpeningPage.css';
import '../CSS/Carousel.css';

function StoryPage({ characterName, characterType }) {
  const navigate = useNavigate();  // Inizializza la funzione di navigazione

  const handleStartClick = () => {
    // Quando il bottone viene cliccato, naviga alla pagina successiva (ad esempio /welcome)
    navigate('/configuration');
  };


  return (
    <div className="Introduction">
      <Image 
        src="/img/Untitled design.png"  // Percorso corretto
        fluid 
        className="story-background"  // Usa la stessa classe definita nel CSS
      />
      <div className="story-background">
        <div className="story-content">
          <div className="title">
            <h1>Chapter 1</h1>
          </div>
          <div className="text-with-image">
          <img 
              src="/img/characters/66a0f748dcb9b5de89b29e401162588b-removebg-preview-removebg-preview.png" 
              alt="Leo il mago" 
              className="inline-image"
            />
            <p className="story-text" sstyle={{ display: 'flex', flexDirection: 'row' }} >
                {`C'era una volta un giovane mago di nome Leo, i cui poteri, sebbene in fase di perfezionamento, racchiudevano già una promessa di grandezza. Cresciuto in una piccola cittadina, ai margini di una foresta immensa e misteriosa, Leo era circondato dalle rovine di antichi castelli e leggende dimenticate.`}
              </p>
            
          </div>
          <p className="story-text">
            {`Nel cuore di quel paesaggio selvaggio, aveva imparato l'arte della magia antica, trasmessa da generazioni, ma nessuno gli aveva mai parlato delle terre lontane e sconosciute che si celavano oltre l'orizzonte.`}
          </p>
          <p className="story-text">
            {`Un giorno, perso nei suoi pensieri e nel vortice di domande che lo accompagnavano, Leo si ritrovò più lontano del solito dalla sua casa.`}
          </p>
          <p className="story-text">
            {`Improvvisamente, senza rendersene conto, si trovò davanti a un bivio, là dove la strada si divideva in due direzioni misteriose.`}
          </p>
        </div>
      </div>
    </div>
  );
};  

export default StoryPage;

