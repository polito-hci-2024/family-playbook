import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import API from '../API.mjs';
import '../CSS/MapEgypt.css';
import { useNavigate } from 'react-router-dom';

function MapEgypt() {
  const [challenges, setChallenges] = useState([false, false]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user_id = localStorage.getItem('userId')

  useEffect(() => {
    if (!user_id) {
      setError('User not found in localStorage.');
      setLoading(false);
      return;
    }

    API.getUserChallenges(user_id)
      .then(challengeIds => {
        const newChallenges = [false, false];
        if (challengeIds.includes(3)) newChallenges[0] = true;
        setChallenges(newChallenges);
        setLoading(false);
      })
      .catch(err => {
        setError('Error retrieving challenges.');
        setLoading(false);
      });
  }, [user_id]);

  const handleChallengeClick = (challenge) => {
    if (!challenges[challenge]) return;

    const challengeMessages = [
      "Anubis' hidden symbols uncovered! You're a true explorer! 🏺",
      "The Pharaoh's scroll is deciphered! Wisdom is yours! 📜",
    ];

    setSelectedChallenge(challengeMessages[challenge]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="egypt">
      <div className="map-container">

        <div className="challenge-1">
          <div
            className={`challenge-button ${challenges[0] ? 'completed' : 'incomplete'}`}
            onClick={() => handleChallengeClick(0)}
          >
            {challenges[0] ? '🏺' : '1'}
          </div>
          <div className={`challenge-label ${challenges[0] ? '' : 'incomplete'}`}>
          Find the Symbol of Anubis
          </div>
        </div>

        <div className="challenge-2">
          <div
            className={`challenge-button ${challenges[1] ? 'completed' : 'incomplete'}`}
            onClick={() => handleChallengeClick(1)}
          >
            {challenges[1] ? '📜' : '2'}
          </div>
          <div className={`challenge-label ${challenges[1] ? '' : 'incomplete'}`}>
          Unlock the Secrets of the Pharaohs
          </div>
        </div>

        <div>
          <Button
            className="back-to-story-button"
            onClick={() => navigate(-1)}
          >
            Back to Story
          </Button>
        </div>
        <div>
        <Modal show={showModal} onHide={handleCloseModal} centered container={document.querySelector('.egypt')}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedChallenge}</Modal.Body>
          <Modal.Footer>
            <Button className="brown-button" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    </div>
  );
}

export default MapEgypt;
