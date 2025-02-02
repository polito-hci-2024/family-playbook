import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';
import '../CSS/Activities.css';
import API from '../API';

function Activities() {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [choices, setChoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userName, setUserName] = useState('');

  const replacePlaceholder = (text, name) => {
    if (!text) return text;
  
    // Aggiungi formattazione per entrambi i testi
    text = text.replace(
      "Place: Mandria Park - 40 minutes",
      "<span class='place-text'>Place: Mandria Park - 40 minutes</span>"
    );
    
    text = text.replace(
      "Place: Parco del Valentino - 1.30 h",
      "<span class='place-text'>Place: Parco del Valentino - 1.30 h</span>"
    );
  
    return text.replace(/\{\$name\}/g, name);
  };
  

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const name = localStorage.getItem('userName') || 'Hero';
        setUserName(name);
        
        const data = await API.getActivities();
        console.log('Fetched choices:', data);
        const mappedChoices = data.map((activity) => ({
          id: activity.activity_id,
          title: replacePlaceholder(activity.activity_name, name),
          description: replacePlaceholder(activity.description, name),
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
        setModalMessage('An error occurred while confirming the activity.');
        setShowModal(true);
      }
    } else {
      setModalMessage('Please select an activity first.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="activity">
      <div className="Introduction">
        <div className="story-background">
          {choices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="title">{userName}, which adventure do you want to take on?</p>
              <div className="activity-container grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
                {choices.map((choice, index) => (
                  <div
                    key={choice.id}
                    className={`activity-card ${selectedChoice === choice.id ? 'selected' : ''} ${index === 1 ? 'disabled' : ''}`}
                    onClick={() => index !== 1 && setSelectedChoice(choice.id)}  // Click solo se non è la seconda card
                  >
                    <img
                      src={choice.image}
                      alt={choice.title}
                      className="activity-image"
                    />
                    <p className="activity-title">{choice.title}</p>
                    <p className="activity-description" dangerouslySetInnerHTML={{ __html: choice.description }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <img
            src="/img/next.png"
            alt="Arrow Right"
            className="arrow arrow-right"
            onClick={handleConfirm}
          />

          <img
            src="/img/back.png"
            alt="Arrow Left"
            className="arrow arrow-left"
            onClick={() => navigate(-1)}
          />

          <div className="bubble-container">
            <motion.img
              src="/img/lumi.png"
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
    </div>
  );
}

export default Activities;
