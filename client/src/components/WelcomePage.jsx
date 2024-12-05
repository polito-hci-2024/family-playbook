import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

// Aggiungi qualche stile personalizzato per l'aspetto giocoso
import '../CSS/WelcomePage.css';

function WelcomePage() {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1 className="welcome-text">Hello, I'm Lumi, welcome to Playbook!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Aggiungi il placeholder per l'immagine */}
          <Image 
            src="/img/lumi.jpg" 
            alt="Character placeholder" 
            fluid 
            className="character-image" 
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="choose-text">Choose your character to start the adventure</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="choose-text">OPINIONE DI SIMONE QUINDI INTELLIGENTE: QUI SOTTO SI POTREBBE METTERE LA SELEZIONE DEI PERSONAGGI E L'INSERIMENTO DEL NOME
            PS: NINTENDO PER FAVORE NON FARCI CAUSA (SE PROPRIO DEVI CONTATTA REBECCA AUDISIO)
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default WelcomePage;
