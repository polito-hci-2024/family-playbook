import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StartActivity.css';
import API from '../API';
import { Button, Card, Col, Row } from 'react-bootstrap';

function StartActivity() {
  const [activityData, setActivityData] = useState(null);
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

  const panels = [
    {
      id: 1,
      content: activityData ? (
        <>
        <div className="start-activity">
          <h3 className="activity-summary">Summary of Your Adventure:</h3>

          <div className="activity-details">
            <img src={activityData.image_url} className="activity-image" alt="Activity" />
            <div className="activity-text">
              <h2 className="activity-title">{activityData.activity_name}</h2>
              <p className="activity-description">{activityData.description}</p>
            </div>
          </div>

          <div className="activity-location">
            <h4><strong>Location:</strong></h4>
            <p>{activityData.location}</p>
          </div>

          <div className="activity-theme">
            <h4><strong>Theme:</strong></h4>
            <p>{activityData.theme}</p>
          </div>

          <div className="activity-info-box">
            <h4><strong>Important Items to Bring:</strong></h4>
            <p>{activityData.info}</p>
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
              <Card.Text className="fs-5">
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
                onClick={() => alert('Start the story!')}
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

        {/* Freccia sinistra */}
        <img
          src="/img/back.png"
          alt="Arrow Left"
          className="arrow arrow-left"
          onClick={() => navigate(-1)} // Torna indietro
        />
      </div>
      </div>
      </div>
    );
}

export default StartActivity;
