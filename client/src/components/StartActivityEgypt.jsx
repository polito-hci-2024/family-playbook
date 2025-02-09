import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StartActivityEgypt.css';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ButtonsEgypt from './ButtonsEgypt';

function StartActivityEgypt() {
  const [activityData, setActivityData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const [messages] = useState([
      " We're about to start the real adventure! 🌟 <br> Come back here once you're at the designated location and click <b><i>Begin</i></b> to start the activity! 🚀"
  ]);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleConfirm = () => {
    handleClose();
    navigate('/stepsEgypt/3');
  };

  const handlePopupVisibilityChange = (visible) => {
    setIsPopupVisible(visible);
  };  

  const panels = [
    {
      id: 1,
      content: (
        <>
          <div className="start-activity-egypt">
            <img src={"/img/egitto2.png"} className="activity-image" alt="Activity" />
            <h2 className="activity-title">Exploring the world of Ancient Egypt</h2>
            <p className="activity-description">Be ready to start your journey deep into the heart of Ancient Egypt. Explore hidden tombs, decipher ancient hieroglyphs, and uncover lost secrets buried in the sands of time. Follow the whispers of pharaohs and unlock the mysteries of a legendary civilization. </p>

            <div className="activity-location">
              <h4><strong>Location:</strong></h4>
              <p className="activity-description">Museo Egizio, Via Accademia delle Scienze, 6, 10123 Torino TO</p>
            </div>

            <div className="activity-theme">
              <h4><strong>Theme:</strong></h4>
              <p className="activity-description">history, exploration, culture</p>
            </div>

            <div className="activity-info-box">
              <h4><strong>What you’ll need:</strong></h4>
              <div className="activity-description">
                <p className="activity-description"> - A camera to capture all the discoveries <br></br>
                - A magnifying glass to spot every tiny detail</p>
              </div>
            </div>
          </div>
        </>
      )
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
                  backgroundColor: '#2A7A72',
                  borderColor: '#2A7A72',
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
    <div className="start-activity-egypt">
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
            onClick={() => navigate('/raining')}
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
      <ButtonsEgypt messages={messages} onPopupVisibilityChange={handlePopupVisibilityChange} />
    </div>
  );
}

export default StartActivityEgypt;