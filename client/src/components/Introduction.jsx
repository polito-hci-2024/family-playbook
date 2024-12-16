import React,  { useEffect }  from 'react';
import '../CSS/Introduction.css';
import { Image } from 'react-bootstrap';
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
    <div className="legno">
      <div className="story-background">
      <div className="story-content">
        <div className="title"> <h1>Chapter 1</h1> </div>
        <p className="story-text"> {`C'era una volta un giovane mago di nome Leo, i cui poteri, sebbene in fase di perfezionamento, racchiudevano già una promessa di grandezza. Cresciuto in una piccola cittadina, ai margini di una foresta immensa e misteriosa, Leo era circondato dalle rovine di antichi castelli e leggende dimenticate.`}</p>
        <p className="story-text"> {`Nel cuore di quel paesaggio selvaggio, aveva imparato l'arte della magia antica, trasmessa da generazioni, ma nessuno gli aveva mai parlato delle terre lontane e sconosciute che si celavano oltre l'orizzonte.`}</p>
        <p className="story-text"> {`Un giorno, perso nei suoi pensieri e nel vortice di domande che lo accompagnavano, Leo si ritrovò più lontano del solito dalla sua casa. \n Improvvisamente, senza rendersene conto, si trovò davanti a un bivio, là dove la strada si divideva in due direzioni misteriose. `}</p>
        <Image
          src={`/img/characters/wizard.png`} // Adatta il percorso per i personaggi
          alt={characterName}
          className="character-image"
        />
      </div>
      </div>
    </div>
  );
};

export default StoryPage;

