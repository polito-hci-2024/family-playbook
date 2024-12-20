import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';

import '../CSS/WelcomePage.css';

function WelcomePage() {
  return (
    <div className="background-component">
      <Container>
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
        <Row className='mt-4 mb-4'>
          <Col className='d-flex flex-column'>
            <label style={{ fontFamily: 'fantasy', fontSize: '30px' }}>What's your name?</label>
            <input type="text" name='name_character' placeholder='Insert your name' style={{ fontFamily: 'fantasy', height: '50px', fontSize: '25px' }}></input>
          </Col>
        </Row>
        <Row className="mt-auto">
          <Col className="d-grid">
            <Button variant="success" className='btn-lg button-style'>Confirm</Button>
          </Col>
        </Row>
      </Container >
    </div>
  );
}

function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, name: 'Wizard', img: '../../img/character_image/wizard.jpg' },
    { id: 2, name: 'Witch', img: '../../img/character_image/witch.jpg' },
    { id: 3, name: 'Dragon', img: '../../img/character_image/dragon.jpg' },
    { id: 4, name: 'Fairy', img: '../../img/character_image/fairy.jpg' },
    { id: 5, name: 'Elf', img: '../../img/character_image/elf.jpg' },
    { id: 6, name: 'Orc', img: '../../img/character_image/orc.jpg' },
  ];

  const handleCharacterSelect = (id) => {
    // Se il personaggio selezionato è già selezionato, deseleziona (imposta a null)
    if (selectedCharacter === id) {
      setSelectedCharacter(null);
    } else {
      // Altrimenti seleziona il nuovo personaggio
      setSelectedCharacter(id);
    }
  };

  return (
    <Container>
      <Row>
        {characters.map((character) => (
          <Col key={character.id} className="text-center col-sm-4">
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
