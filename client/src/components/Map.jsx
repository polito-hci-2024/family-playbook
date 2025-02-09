import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import API from '../API.mjs';
import '../CSS/Map.css';
import { useNavigate } from 'react-router-dom';

function Map() {
  const [challenges, setChallenges] = useState([false, false, false]);
  const [showAdvancedButton, setShowAdvancedButton] = useState(false); // Stato per il bottone
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
        const newChallenges = [false, false, false];
        if (challengeIds.includes(1)) newChallenges[0] = true;
        if (challengeIds.includes(5)) newChallenges[1] = true;
        setChallenges(newChallenges);

        if (challengeIds.includes(4) || challengeIds.includes(5)) {
          setShowAdvancedButton(true);
        }

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
      "Wow! You've mastered the art of potion-making! 🧪",
      "You found the magical treasure key! Great job! 🔑",
      "Your fairy house is enchanting! The fairies are delighted! 🏠",
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
    <div className="map-container">
      <div className="challenge-1">
        <div
          className={`challenge-button ${challenges[0] ? 'completed' : 'incomplete'}`}
          onClick={() => handleChallengeClick(0)}
        >
          {challenges[0] ? '🧪' : '1'}
        </div>
        <div className={`challenge-label ${challenges[0] ? '' : 'incomplete'}`}>
        Create the Healing Potion
        </div>
      </div>

      <div className="challenge-2">
        <div
          className={`challenge-button ${challenges[1] ? 'completed' : 'incomplete'}`}
          onClick={() => handleChallengeClick(1)}
        >
          {challenges[1] ? '🔑' : '2'}
        </div>
        <div className={`challenge-label ${challenges[1] ? '' : 'incomplete'}`}>
        The Quest for the Lost Fragment
        </div>
      </div>

      <div className="challenge-3">
        <div
          className={`challenge-button ${challenges[2] ? 'completed' : 'incomplete'}`}
          onClick={() => handleChallengeClick(2)}
        >
          {challenges[2] ? '🏠' : '3'}
        </div>
        <div className={`challenge-label ${challenges[2] ? '' : 'incomplete'}`}>
        Rebuild the Fairy House
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedChallenge}</Modal.Body>
        <Modal.Footer>
          <Button className="purple-button" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Map;
