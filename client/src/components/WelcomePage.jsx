import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import '../CSS/WelcomePage.css';

function WelcomePage() {
  return (
    <Container >
      <Row>
        <Col>
          <Image src='../../../img/cloudWelcome.png' className="cloud-welcome"></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src='../../../img/lumi.png' className="lumi"></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src='../../../img/cloudCharacter.png' className="cloud-character"></Image>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}><CharacterSelector></CharacterSelector></Row>
      <Row>
        <h2>What's your name?</h2>
      </Row>
    </Container>
  );
}

function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, name: 'Wizard', img: '../../img/lumi.png' },
    { id: 2, name: 'Witch', img: '../../img/lumi.png' },
    { id: 3, name: 'Dragon', img: '../../img/lumi.png' },
    { id: 4, name: 'Fairy', img: '../../img/lumi.png' },
    { id: 5, name: 'Elf', img: '../../img/lumi.png' },
    { id: 6, name: 'Orc', img: '../../img/lumi.png' },
  ];

  const handleCharacterSelect = (id) => {
    setSelectedCharacter(id);
  };

  return (
    <Container>
      <Row>
        {characters.map((character) => (
          <Col key={character.id} className="text-center" sm={4}>
            <Button
              className={`character-btn ${selectedCharacter === character.id ? 'selected' : ''}`}
              onClick={() => handleCharacterSelect(character.id)} variant='light'
              disabled={selectedCharacter !== null && selectedCharacter !== character.id} // Disabilita i bottoni non selezionati
            >
              <Image src={character.img} alt={character.name} roundedCircle className="character-img" />
            </Button>
            <p><b>{character.name}</b></p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WelcomePage;
