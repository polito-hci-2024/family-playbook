import React, { useEffect, useState } from 'react';
import API from '../API'; // Assuming the API file is in the same directory
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await API.getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleConfirm = async () => {
    if (selectedActivity) {
      try {
        const response = await fetch('http://localhost:3001/api/select-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activityId: selectedActivity }),
        });

        if (!response.ok) {
          throw new Error('Failed to confirm activity');
        }
        alert('Activity confirmed!');
      } catch (error) {
        console.error('Error confirming activity:', error);
        alert('An error occurred while confirming the activity.');
      }
    } else {
      alert('Please select an activity first.');
    }
  };

  return (
    <Container className="text-center my-4">
      {/* Header section */}
      <Row className="mb-4">
        <Col>
        <img src="/img/lumi.jpg" alt="Mascot" className="img-fluid" style={{ maxHeight: '200px' }} />
          <p className="lead fs-3 mt-3">
            <em>What an adventure! I've discovered the perfect missions for you this weekend!</em>
          </p>
        </Col>
      </Row>

      {/* Question section */}
      <Row className="mb-3">
        <Col>
          <h2>Which adventure do you want to take on?</h2>
        </Col>
      </Row>

      {/* Activities section */}
      <Row className="g-4">
        {activities.map((activity) => (
          <Col key={activity.activity_id} md={6} lg={4}>
            <Card
              className={`h-100 shadow-lg p-3 ${selectedActivity === activity.activity_id ? 'border-primary' : ''}`}
              onClick={() => setSelectedActivity(activity.activity_id)}
              style={{ cursor: 'pointer', transform: selectedActivity === activity.activity_id ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.2s' }}
            >
              <Card.Body>
                <Card.Title className="fs-3 text-primary">{activity.activity_name}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">Location: {activity.location}</Card.Subtitle>
                <Card.Text>{activity.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Confirm button */}
      <Row className="mt-4">
        <Col>
          <Button variant="success" size="lg" onClick={handleConfirm}>
            Confirm
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Activities;