import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Utilizziamo React Bootstrap per il modal
import API from '../API.mjs'; // Importa la funzione getUserChallenges

function Map() {
  const [challenges, setChallenges] = useState([false, false]); // Stato per i due pallini (Pozione e Albero)
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user_id = 3; // O prendi dal localStorage: localStorage.getItem('user_id');

  useEffect(() => {
    if (!user_id) {
      setError('User not found in localStorage.');
      setLoading(false);
      return;
    }

    // Chiamata all'API per ottenere gli ID delle challenge completate dall'utente
    API.getUserChallenges(user_id)
      .then(challengeIds => {
        // Imposta lo stato in base alle challenge completate
        const newChallenges = [false, false]; // Inizialmente entrambi i pallini sono spenti

        // Se 1 è nell'array, accendi il pallino "Pozione"
        if (challengeIds.includes(1)) {
          newChallenges[0] = true;
        }

        // Se 2 è nell'array, accendi il pallino "Albero"
        if (challengeIds.includes(2)) {
          newChallenges[1] = true;
        }

        setChallenges(newChallenges); // Imposta lo stato con i pallini accesi/spegni
        setLoading(false);
      })
      .catch(err => {
        setError('Errore nel recupero delle challenge.');
        setLoading(false);
      });
  }, [user_id]);

  const handleChallengeClick = (challenge) => {
    // Impedisce di aprire il modal se il pallino è disabilitato
    if (!challenges[challenge]) {
      return;
    }

    setSelectedChallenge(challenge === 0 ? 'Pozione' : 'Albero'); // Se 0 è "Pozione", se 1 è "Albero"
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Caricamento delle challenge...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/img/sfondo_egitto.png")', // Placeholder per immagine di sfondo
        backgroundSize: 'cover', // Assicura che l'immagine copra tutto lo schermo
        backgroundPosition: 'center', // Centra l'immagine
        height: '100vh', // Altezza schermo intero
        padding: '20px',
      }}
    >
      <h1 className="text-center text-white">Mappa 1</h1>
      <div className="d-flex justify-content-center flex-wrap">
        {/* Pallino per "Pozione" */}
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: challenges[0] ? 'blue' : 'gray',
            margin: '10px',
            cursor: challenges[0] ? 'pointer' : 'not-allowed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
          onClick={() => handleChallengeClick(0)} // Passa l'indice del pallino
        >
          {challenges[0] ? '✔️' : '1'}
        </div>
        <div className="text-center text-white">Pozione</div>

        {/* Pallino per "Albero" */}
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: challenges[1] ? 'blue' : 'gray',
            margin: '10px',
            cursor: challenges[1] ? 'pointer' : 'not-allowed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
          onClick={() => handleChallengeClick(1)} // Passa l'indice del pallino
        >
          {challenges[1] ? '✔️' : '2'}
        </div>
        <div className="text-center text-white">Albero</div>
      </div>

      {/* Modal di congratulazioni */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Complimenti!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hai completato la challenge: {selectedChallenge}!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Map;
