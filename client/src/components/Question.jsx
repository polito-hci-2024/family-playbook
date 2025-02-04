import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/Question.css';
import { Modal, Button } from 'react-bootstrap'; 
import API from '../API.mjs';

function Question({ question_id }) {
  const questionId = parseInt(question_id);
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); 
  const [choices, setChoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); 
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); 

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
          title: replacePlaceholder(questionAnswer.question, name), 
          question_image_url: questionAnswer.question_image_url,
          description: replacePlaceholder(questionAnswer.description, name), 
          answers: [
            {
              id: questionAnswer.answer1_id,
              title: replacePlaceholder(questionAnswer.title_answer1, name), 
              text: replacePlaceholder(questionAnswer.answer1, name), 
              image: questionAnswer.a1_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer2_id,
              title: replacePlaceholder(questionAnswer.title_answer2, name), 
              text: replacePlaceholder(questionAnswer.answer2, name), 
              image: questionAnswer.a2_image_url || '/img/place/default.jpg',
            },
            {
              id: questionAnswer.answer3_id,
              title: replacePlaceholder(questionAnswer.title_answer3, name), 
              text: replacePlaceholder(questionAnswer.answer3, name), 
              image: questionAnswer.a3_image_url || '/img/place/default.jpg',
            },
          ].filter((answer) => answer.id !== null),
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

        if(questionId === 1)
        {navigate(`/question/2`);} 
        else {
          navigate(`/activities`); }
      } catch (error) {
        console.error('Error confirming answer:', error);
        setModalMessage('An error occurred while confirming the answer.'); 
        setShowModal(true); 
      }
    } else {
      setModalMessage('Please select an answer first.'); 
      setShowModal(true); 
    }
  };

  const handleCloseModal = () => setShowModal(false); 

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="question">
      <div className="Introduction">
        <div className="story-background">
          {choices.length > 0 && (
            <div>
              <p className="title">
              {questionId === 1
                  ? `${userName}, which path will you take?`
                  : `Signs of an Ancient Presence`}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8}}
              >

                {choices[0].description && (
                  <p className="question-description">{choices[0].description}</p>
                )}
                
                <div
                  className="activity-container"
                  onClick={(e) => {
                    if (e.target.closest('.activity-card') === null) {
                      setSelectedChoice(null);
                    }
                  }}
                >
                  {choices[0].answers.map((answer, index) => {
                      const isDisabled = index === 1; 

                      return (
                          <div
                              key={index}
                              className={`activity-card ${selectedChoice === answer.id ? 'selected' : ''} ${isDisabled ? 'disabled-answer' : ''}`}
                              onClick={(e) => {
                                  if (!isDisabled) { 
                                      e.stopPropagation(); 
                                      setSelectedChoice(answer.id);
                                  }
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
                      );
                  })}
                </div>
              </motion.div>
            </div>
          )}

          {selectedChoice && (
            <img
              src="/img/next.png"
              alt="Arrow Right"
              className="arrow arrow-right"
              onClick={handleConfirm} 
            />
          )}

          <img
            src="/img/back.png"
            alt="Arrow Left"
            className="arrow arrow-left"
            onClick={handleBack} 
          />

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

export default Question;
