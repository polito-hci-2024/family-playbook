import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StartActivity.css';
import API from '../API';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';

function StartActivity() {
  const [activityData, setActivityData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
    navigate('/nature');
  };

  const panels = [
    {
      id: 1,
      content: activityData ? (
        <>
          <div className="start-activity">
            <img src={activityData.image_url} className="activity-image" alt="Activity" />
            <h2 className="activity-title">{activityData.activity_name}</h2>
            <p className="activity-description">{activityData.description}</p>

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
              <p className="activity-description">{activityData.info}</p>
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
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Start</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to start your adventure now?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm} style={{ backgroundColor: '#800080', borderColor: '#800080' }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartActivity;