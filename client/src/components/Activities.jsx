import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap'; // Importa il Modal
import '../CSS/Activities.css';
import API from '../API';

function Activities() {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [choices, setChoices] = useState([]);
  const [showModal, setShowModal] = useState(false); // Stato per la modale
  const [modalMessage, setModalMessage] = useState(''); // Messaggio della modale

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const data = await API.getActivities();
        console.log('Fetched choices:', data);
        const mappedChoices = data.map((activity) => ({
          id: activity.activity_id,
          title: activity.activity_name,
          description: activity.description,
          image: activity.image_url || '/img/place/default.jpg',
          isChoice: true,
        }));
        setChoices(mappedChoices);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };

    fetchChoices();
  }, []);

  const handleConfirm = async () => {
    if (selectedChoice) {
      try {
        const response = await API.insertActivity(1, selectedChoice);

        if (!response) {
          throw new Error('Failed to confirm activity');
        }

        navigate('/start-activity', { state: { activity: response } });
      } catch (error) {
        console.error('Error confirming activity:', error);
        setModalMessage('An error occurred while confirming the activity.'); // Imposta il messaggio
        setShowModal(true); // Mostra la modale
      }
    } else {
      setModalMessage('Please select an activity first.'); // Imposta il messaggio
      setShowModal(true); // Mostra la modale
    }
  };

  const handleCloseModal = () => setShowModal(false); // Chiude la modale

  return (
    <div className="Introduction">
      <div className="story-background">
        {choices.length > 0 && (
          <motion.div
            className="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="story-text">Which adventure do you want to take on?</p>
            <div className="activity-container">
              {choices.map((choice) => (
                <div
                  key={choice.id}
                  className={`activity-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                  onClick={() => setSelectedChoice(choice.id)}
                >
                  <img
                    src={choice.image}
                    alt={choice.title}
                    className="activity-image"
                  />
                  <p className="activity-title">{choice.title}</p>
                  <p className="activity-description">{choice.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Freccia destra */}
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={handleConfirm}
        />

        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => navigate(-1)} // Torna indietro
        />

        {/* Nuvola con messaggio in basso a sinistra */}
        <div className="bubble-container">
          <motion.img
            src="/img/lumi.jpg"
            alt="Lumi"
            className="lumi-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.div
            className="bubble-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            What an adventure! I've discovered the perfect missions for you this weekend!
          </motion.div>
        </div>
      </div>

      {/* Modale di errore o avviso */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Activities;
