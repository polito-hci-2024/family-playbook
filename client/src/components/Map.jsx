import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import API from '../API.mjs';

function Map() {
  const [challenges, setChallenges] = useState([false, false]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user_id = 3;

  useEffect(() => {
    if (!user_id) {
      setError('User not found in localStorage.');
      setLoading(false);
      return;
    }

    API.getUserChallenges(user_id)
      .then(challengeIds => {
        const newChallenges = [false, false];
        if (challengeIds.includes(1)) newChallenges[0] = true;
        if (challengeIds.includes(2)) newChallenges[1] = true;
        setChallenges(newChallenges);
        setLoading(false);
      })
      .catch(err => {
        setError('Errore nel recupero delle challenge.');
        setLoading(false);
      });
  }, [user_id]);

  const handleChallengeClick = (challenge) => {
    if (!challenges[challenge]) return;
    setSelectedChallenge(challenge === 0 ? 'Pozione' : 'Albero');
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
        backgroundImage: 'url("/img/Mappa2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
        padding: '20px',
      }}
    >
      <h1 className="text-center text-white mb-4">Mappa 1</h1>

      {/* Bottone "Pozione" */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: challenges[0] ? '#4caf50' : '#9e9e9e',
            cursor: challenges[0] ? 'pointer' : 'not-allowed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '28px',
            boxShadow: challenges[0]
              ? '0px 8px 15px rgba(0, 0, 0, 0.4)'
              : '0px 4px 8px rgba(0, 0, 0, 0.3)',
            transform: challenges[0] ? 'translateY(-4px)' : 'none',
            transition: 'all 0.2s ease',
          }}
          onClick={() => handleChallengeClick(0)}
        >
          {challenges[0] ? '🧪' : '1'}
        </div>
        <div
          style={{
            width: '140px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '5px 10px',
            marginTop: '10px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#4caf50',
            fontStyle: challenges[0] ? 'normal' : 'italic',
          }}
        >
          Pozione
        </div>
      </div>

      {/* Bottone "Albero" */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: challenges[1] ? '#4caf50' : '#9e9e9e',
            cursor: challenges[1] ? 'pointer' : 'not-allowed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '28px',
            boxShadow: challenges[1]
              ? '0px 8px 15px rgba(0, 0, 0, 0.4)'
              : '0px 4px 8px rgba(0, 0, 0, 0.3)',
            transform: challenges[1] ? 'translateY(-4px)' : 'none',
            transition: 'all 0.2s ease',
          }}
          onClick={() => handleChallengeClick(1)}
        >
          {challenges[1] ? '🌳' : '2'}
        </div>
        <div
          style={{
            width: '140px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '5px 10px',
            marginTop: '10px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#4caf50',
            fontStyle: challenges[1] ? 'normal' : 'italic',
          }}
        >
          Albero
        </div>
      </div>

      {/* Bottone "Back to Story" */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button
          style={{
            backgroundColor: '#6a1b9a',
            borderColor: '#6a1b9a',
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '30px',
            color: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#7b1fa2')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6a1b9a')}
          onClick={() => console.log('Back to Story')}
        >
          Back to Story
        </Button>
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
