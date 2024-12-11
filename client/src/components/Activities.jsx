import React, { useEffect, useState } from 'react';
import API from '../API'; // Assuming the API file is in the same directory
import { Container, Row, Col, Card } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);

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

  return (
    <Container className="text-center my-4">
      {/* Header section */}
      <Row className="mb-4">
        <Col>
          <img src="/img/lumi.jpg"  alt="Mascot" className="img-fluid" style={{ maxHeight: '200px' }} />
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
          <Col key={activity.activity_id} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-4">{activity.activity_name}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">Location: {activity.location}</Card.Subtitle>
                <Card.Text>{activity.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Activities;