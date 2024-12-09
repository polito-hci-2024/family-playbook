import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate per la navigazione
import '../CSS/OpeningPage.css'; // Importiamo il file CSS per lo styling

function OpeningPage() {
  const navigate = useNavigate();  // Inizializza la funzione di navigazione

  const handleStartClick = () => {
    // Quando il bottone viene cliccato, naviga alla pagina successiva (ad esempio /welcome)
    navigate('/welcome');
  };

  return (
    <div className="opening-page">
      <Image 
        src="/img/sfondo_apertura_app.jpg"  // Percorso corretto
        alt="Opening Background" 
        fluid 
        className="full-screen-image"  // Usa la stessa classe definita nel CSS
      />
      <Button 
        variant="primary" 
        onClick={handleStartClick} 
        className="start-button"
      >
        START
      </Button>
    </div>
  );
}

export default OpeningPage;
