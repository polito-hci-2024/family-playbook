import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Place2.css';
import API from '../API'; // Assumo che l'API sia già definita

function Activities() {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); // Stato per la scelta dell'utente
  const [choices, setChoices] = useState([]); // Stato per le scelte prese dal backend

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const data = await API.getActivities(); // Recupera le scelte dal backend
        console.log('Fetched choices:', data); // Log per verificare i dati

        // Mappa i dati ricevuti dall'API al formato utilizzato nel componente
        const mappedChoices = data.map((activity) => ({
          id: activity.activity_id,
          title: activity.activity_name,
          description: activity.description,
          image: activity.image_url || '/img/place/default.jpg', // Usa l'immagine dal backend o un'immagine di default
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
        const response = await API.insertActivity(1, selectedChoice); // user_id hardcoded come 1

        if (!response) {
          throw new Error('Failed to confirm activity');
        }

        navigate('/start-activity', { state: { activity: response } });
      } catch (error) {
        console.error('Error confirming activity:', error);
        alert('An error occurred while confirming the activity.');
      }
    } else {
      alert('Please select an activity first.');
    }
  };

  return (
    <div className="Introduction">
      <div className="story-background">
        {choices.length > 0 && (
          <motion.div
            className="story-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="story-text">Seleziona un'attività:</p>
            <div className="choice-container">
              {choices.map((choice) => (
                <div
                  className={`choice-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                  key={choice.id}
                  onClick={() => setSelectedChoice(choice.id)}
                >
                  <img
                    src={choice.image}
                    className="choice-image"
                    alt={choice.title}
                  />
                  <p className="choice-title">{choice.title}</p>
                  <p className="choice-description">{choice.description}</p>
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
          onClick={handleConfirm} // Conferma la scelta
        />

        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => navigate(-1)} // Torna indietro
        />
      </div>
    </div>
  );
}

export default Activities;
