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
  const [userId, setUserId] = useState(''); // Stato per il nome utente

  const replacePlaceholder = (text, name) => {
    return text ? text.replace(/\{\$name\}/g, name) : text;
  };

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const name = localStorage.getItem('userName') || 'Hero';
        const userId = localStorage.getItem('userId');
        const data = await API.getQuestionAnswer(questionId);
        const mappedChoices = data.map((questionAnswer) => ({
          id: questionAnswer.questionId,
          title: replacePlaceholder(questionAnswer.question, name), // Sostituzione nel titolo
          question_image_url: questionAnswer.question_image_url,
          description: replacePlaceholder(questionAnswer.description, name), // Sostituzione nella descrizione
          answers: [
            {
              id: questionAnswer.answer1_id,
              title: replacePlaceholder(questionAnswer.title_answer1, name), // Sostituzione nel titolo risposta 1
              text: replacePlaceholder(questionAnswer.answer1, name), // Sostituzione nel testo risposta 1
              image: questionAnswer.a1_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer2_id,
              title: replacePlaceholder(questionAnswer.title_answer2, name), // Sostituzione nel titolo risposta 2
              text: replacePlaceholder(questionAnswer.answer2, name), // Sostituzione nel testo risposta 2
              image: questionAnswer.a2_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer3_id,
              title: replacePlaceholder(questionAnswer.title_answer3, name), // Sostituzione nel titolo risposta 3
              text: replacePlaceholder(questionAnswer.answer3, name), // Sostituzione nel testo risposta 3
              image: questionAnswer.a3_image_url || '/img/place/default.jpg',
            },
          ].filter((answer) => answer.id !== null), // Filtra solo risposte valide
        }));
        setChoices(mappedChoices);
        setUserName(name);
        setUserId(userId);
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Titolo della domanda */}
              <p className="title">
                {questionId === 1
                    ? `${userName}, which path will you take?`
                    : `Signs of an Ancient Presence`}
              </p>

              {/* Solo testo senza l'immagine */}
              {choices[0].description && (
                <p className="question-description">{choices[0].description}</p>
              )}
              
              <div
                className="activity-container"
                onClick={(e) => {
                  // Se il click avviene sul contenitore (non sulle card), resetta la selezione
                  if (e.target.closest('.activity-card') === null) {
                    setSelectedChoice(null);
                  }
                }}
              >
                {choices[0].answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`activity-card ${selectedChoice === answer.id ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Blocca la propagazione del click al contenitore
                      setSelectedChoice(answer.id); // Imposta l'ID della risposta selezionata
                    }}
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
          )}

          {/* Freccia destra visibile solo se una card è selezionata */}
          {selectedChoice && (
            <img
              src="/img/next.png"
              alt="Arrow Right"
              className="arrow arrow-right"
              onClick={handleConfirm} // Usa la funzione per confermare la risposta e andare alla pagina successiva
            />
          )}

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
