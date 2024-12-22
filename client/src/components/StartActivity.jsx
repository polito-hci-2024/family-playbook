import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import '../CSS/Place.css';

function StartActivity() {
  const location = useLocation();
  const { activity } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (!activity) {
    return <div>No activity data available.</div>;
  }

  const handleConfirm = () => {
    alert('Conferma la tua scelta!');
  };

  return (
    <div>
      {/* Adventure tips */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-lg p-4" style={{ borderRadius: '15px', backgroundColor: '#f7f7f7' }}>
            <Card.Body>
              <Card.Title className="fs-4 text-primary">Prepare for your adventure!</Card.Title>
              <Card.Text className="fs-5">
                {activity.info || 'Cups, hat, ball. They will be needed for the activities.'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Riepilogo Button */}
      <Row className="mb-4">
        <Col>
          <Button
            style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', width: '100%', fontSize: '20px' }}
            size="lg"
            onClick={() => setShowModal(true)}
          >
            View Summary
          </Button>
        </Col>
      </Row>

      {/* Summary Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fs-3">Activity Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Activity Name:</strong> {activity.activity_name || 'No name available'}</p>
          <p><strong>Description:</strong> {activity.description || 'No description available'}</p>
          <p><strong>Location:</strong> {activity.location || 'No location available'}</p>
          <p><strong>Theme:</strong> {activity.theme || 'No theme available'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bottom Section for Begin Button */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-lg p-4" style={{ borderRadius: '15px', backgroundColor: '#f7f7f7' }}>
            <Card.Body>
              <Card.Text className="fs-5">
                Non appena sarai nel luogo scelto, clicca il tasto seguente per continuare la nostra emozionante storia.
              </Card.Text>
              <Button
                style={{
                  backgroundColor: '#3dafee',
                  borderColor: '#3dafee',
                  width: '100%',
                  fontSize: '22px',
                  padding: '20px',
                }}
                size="lg"
                onClick={() => alert('Inizia la storia!')}
              >
                Begin
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Frecce */}
      <img
        src="/img/next.png"
        alt="Arrow Right"
        className="arrow arrow-right"
        onClick={handleConfirm}
      />
      <img
        src="/img/back.png"
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default StartActivity;
