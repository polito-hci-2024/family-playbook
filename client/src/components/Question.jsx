import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Question.css';
import { Modal, Button } from 'react-bootstrap'; // Importa il Modal
import API from '../API.mjs';

function Question({ question_id }) {
  const questionId = parseInt(question_id);
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); // Solo l'ID della risposta
  const [choices, setChoices] = useState([]);
  const [showModal, setShowModal] = useState(false); // Stato per la modale
  const [modalMessage, setModalMessage] = useState(''); // Messaggio della modale
  const [userName, setUserName] = useState(''); // Stato per il nome utente

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const name = await API.getUserName();
        const data = await API.getQuestionAnswer(questionId);
        const mappedChoices = data.map((questionAnswer) => ({
          id: questionAnswer.questionId,
          title: questionAnswer.question,
          question_image_url: questionAnswer.question_image_url,
          description: questionAnswer.description,
          answers: [
            {
              id: questionAnswer.answer1_id,
              title: questionAnswer.title_answer1,
              text: questionAnswer.answer1,
              image: questionAnswer.a1_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer2_id,
              title: questionAnswer.title_answer2,
              text: questionAnswer.answer2,
              image: questionAnswer.a2_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer3_id,
              title: questionAnswer.title_answer3,
              text: questionAnswer.answer3,
              image: questionAnswer.a3_image_url || '/img/place/default.jpg',
            },
          ].filter((answer) => answer.id !== null), // Filtra solo risposte valide
        }));
        setChoices(mappedChoices);
        setUserName(name);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };

    fetchChoices();
  }, [questionId]);

  const handleConfirm = async () => {
    if (selectedChoice) {
      try {
        const response = await API.insertAnswer(selectedChoice, questionId);

        if (!response) {
          throw new Error('Failed to confirm answer');
        }

        // Naviga allo step successivo
        if(questionId === 1)
        {navigate(`/question/2`);} // Vai alla prossima domanda
        else {
          navigate(`/activities`); }
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
    navigate(-1);
  };

  return (
    <div className="question">
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
                {/* Card per ogni risposta valida */}
                {choices[0].answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`activity-card ${selectedChoice === answer.id ? 'selected' : ''}`}
                    onClick={() => setSelectedChoice(answer.id)} // Usa solo l'ID della risposta
                  >
                    <img
                      src={answer.image}
                      alt={answer.title}
                      className="activity-image"
                    />
                    <p className="activity-title">{answer.title}</p>
                    <p className="activity-answer">{answer.text}</p>
                  </div>
                ))}
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
    </div>
    );
}

export default Question;
