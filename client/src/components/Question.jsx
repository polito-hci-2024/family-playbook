import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Question.css';
import { Modal, Button } from 'react-bootstrap'; // Importa il Modal
import API from '../API.mjs';

function Question() {
  const navigate = useNavigate();
  const { question_id } = useParams(); // Ottieni question_id dall'URL
  const [selectedChoice, setSelectedChoice] = useState(null); // Solo l'ID della risposta
  const [choices, setChoices] = useState([]);
  const [showModal, setShowModal] = useState(false); // Stato per la modale
  const [modalMessage, setModalMessage] = useState(''); // Messaggio della modale
  const [userName, setUserName] = useState(''); // Stato per il nome utente

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const name = await API.getUserName();
        const data = await API.getQuestionAnswer(question_id);
        console.log('Fetched choices:', data);
        const mappedChoices = data.map((questionAnswer) => ({
          id: questionAnswer.question_id,
          title: questionAnswer.question,
          title1: questionAnswer.title_answer1,
          title2: questionAnswer.title_answer2,
          title3: questionAnswer.title_answer3,
          question_image_url: questionAnswer.question_image_url,
          description: questionAnswer.description,
          answer1_id: questionAnswer.answer1_id,
          answer2_id: questionAnswer.answer2_id,
          answer3_id: questionAnswer.answer3_id,
          answer1: questionAnswer.answer1,
          answer2: questionAnswer.answer2,
          answer3: questionAnswer.answer3,
          image1: questionAnswer.a1_image_url || '/img/place/default.jpg',
          image2: questionAnswer.a2_image_url || '/img/place/default.jpg',
          image3: questionAnswer.a3_image_url || '/img/place/default.jpg',
          isChoice: true,
        }));
        setChoices(mappedChoices);
        setUserName(name);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };

    fetchChoices();
  }, [question_id]);

  const handleConfirm = async () => {
    if (selectedChoice) {
      try {
        const response = await API.insertAnswer(selectedChoice, question_id);

        if (!response) {
          throw new Error('Failed to confirm answer');
        }

        // Naviga allo step successivo
        const nextStepId = parseInt(question_id) + 1;
        navigate(`/steps/${nextStepId}`); // Vai alla prossima domanda
      } catch (error) {
        console.error('Error confirming answer:', error);
        setModalMessage('An error occurred while confirming the answer.'); // Imposta il messaggio
        setShowModal(true); // Mostra la modale
      }
    } else {
      setModalMessage('Please select an answer first.'); // Imposta il messaggio
      setShowModal(true); // Mostra la modale
    }
  };

  const handleCloseModal = () => setShowModal(false); // Chiude la modale

  const handleBack = () => {
    // Naviga al passo precedente
    const previousStepId = parseInt(question_id) - 1;
    navigate(`/steps/${previousStepId}`);
  };

  return (
    <div className="Introduction">
      <div className="story-background">
        {choices.length > 0 && (
          <>
            {/* Pannello con descrizione (se disponibile) */}
            {choices[0].description && (
              <div className="panel">
                <img
                  src={choices[0].question_image_url || '/img/place/default.jpg'}
                  alt="Question"
                  className="activity-image"
                />
                <p className="question-description">{choices[0].description}</p>
              </div>
            )}

            <motion.div
              className="panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Titolo della domanda */}
              <p className="story-text">{choices[0].title + ' Qui compare il nome: ' + (userName?.name || 'Nome non disponibile')}</p>

              <div className="activity-container">
                {/* Card per la risposta 1 */}
                <div
                  key="1"
                  className={`activity-card ${selectedChoice === choices[0].answer1_id ? 'selected' : ''}`}
                  onClick={() => setSelectedChoice(choices[0].answer1_id)} // Usa solo l'ID della risposta
                >
                  <img
                    src={choices[0].image1}
                    alt={choices[0].title1}
                    className="activity-image"
                  />
                  <p className="activity-title">{choices[0].title1}</p>
                  <p className="activity-answer">{choices[0].answer1}</p>
                </div>

                {/* Card per la risposta 2 */}
                <div
                  key="2"
                  className={`activity-card ${selectedChoice === choices[0].answer2_id ? 'selected' : ''}`}
                  onClick={() => setSelectedChoice(choices[0].answer2_id)} // Usa solo l'ID della risposta
                >
                  <img
                    src={choices[0].image2}
                    alt={choices[0].title2}
                    className="activity-image"
                  />
                  <p className="activity-title">{choices[0].title2}</p>
                  <p className="activity-answer">{choices[0].answer2}</p>
                </div>

                {/* Card per la risposta 3 */}
                <div
                  key="3"
                  className={`activity-card ${selectedChoice === choices[0].answer3_id ? 'selected' : ''}`}
                  onClick={() => setSelectedChoice(choices[0].answer3_id)} // Usa solo l'ID della risposta
                >
                  <img
                    src={choices[0].image3}
                    alt={choices[0].title3}
                    className="activity-image"
                  />
                  <p className="activity-title">{choices[0].title3}</p>
                  <p className="activity-answer">{choices[0].answer3}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Personaggio e fumetto */}
        <img
          src="/img/Lumi-angolo.png"
          alt="Personaggio"
          className="character-image"
        />
        <div className={`speech-bubble`}>
          Select an option to continue
        </div>

        {/* Freccia destra */}
        <img
          src="/img/next.png"
          alt="Arrow Right"
          className="arrow arrow-right"
          onClick={handleConfirm} // Usa la funzione per confermare la risposta e andare alla pagina successiva
        />

        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={handleBack} // Torna indietro
        />
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

export default Question;
