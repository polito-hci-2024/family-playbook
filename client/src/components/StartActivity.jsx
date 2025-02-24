import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StartActivity.css';
import API from '../API';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ButtonsGeneral from './ButtonsGeneral';

function StartActivity() {
  const [activityData, setActivityData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [messages] = useState([
    " We're about to start the real adventure! 🌟 <br> Come back here once you're at the designated location and click <b><i>Begin</i></b> to start the activity! 🚀"
]);
  const formatAsList = (text) => {
    if (!text) return text;
  
    const lines = text.split('\n');
    return (
      <div className="activity-description">
      {lines.map((line, index) => (
        <p key={index}>
          {index !== lines.length - 1 ? '- ' : ''}
          {line}
        </p>
      ))}
    </div>
    );
  };
  

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await API.getLastChoice();
        setActivityData(data);
      } catch (error) {
        console.error('Errore durante il fetch dei dati:', error);
      }
    };

    fetchActivity();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleConfirm = () => {
    handleClose();
    localStorage.setItem('previous_route', window.location.pathname);
    navigate('/step-selection-eldora');
  };

  const panels = [
    {
      id: 1,
      content: activityData ? (
        <>
          <div className="start-activity">
            <img src={activityData.image_url} className="activity-image" alt="Activity" />
            <h2 className="activity-title">{activityData.activity_name}</h2>
            <p className="activity-description">{activityData.summary}</p>

            <div className="activity-location">
              <h4><strong>Location:</strong></h4>
              <p className="activity-description">{activityData.location}</p>
            </div>

            <div className="activity-theme">
              <h4><strong>Theme:</strong></h4>
              <p className="activity-description">{activityData.theme}</p>
            </div>

            <div className="activity-info-box">
              <h4><strong>What you’ll need:</strong></h4>
              <div className="activity-description">{formatAsList(activityData.info)}</div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      ),
    },
    {
      id: 2,
      content: (
        <Row className="mt-4">
          <Col>
            <Card.Body>
              <Card.Text className="activity-description">
                Once you're at the chosen location, click the button below to continue our exciting story.
              </Card.Text>
              <Button
                style={{
                  backgroundColor: '#800080',
                  borderColor: '#800080',
                  width: '100%',
                  fontSize: '22px',
                  padding: '20px',
                }}
                size="lg"
                onClick={handleShow}
              >
                Begin
              </Button>
            </Card.Body>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="start-activity">
      <div className="Introduction">
        <p className="title">Summary of <br></br>your Adventure:</p>
        <div className="story-background">
          {panels.map((panel) => (
            <motion.div
              className="panel-start-activity"
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: panel.id * 0.5, duration: 0.8 }}
            >
              {panel.content}
            </motion.div>
          ))}

          <img
            src="/img/back.png"
            alt="Arrow Left"
            className="arrow arrow-left"
            onClick={() => navigate('/activities')}
          />
        </div>
      </div>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to start your adventure now?</p>
            <div className="popup-buttons">
              <button className="yes-button" onClick={handleConfirm}>Yes</button>
              <button className="no-button" onClick={handleClose}>No</button>
            </div>
          </div>
        </div>
      )}
      <ButtonsGeneral messages={messages}></ButtonsGeneral>
    </div>
  );
}

export default StartActivity;
