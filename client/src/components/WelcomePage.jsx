import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Alert } from 'react-bootstrap';


import '../CSS/WelcomePage.css';

function WelcomePage() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowError(false);
    if (selectedCharacter) {
      localStorage.clear();
      localStorage.setItem('characterId', selectedCharacter)
      navigate('/form');
    } else {
      setShowError(true);
    }
  };

  const selectCharacter = (id) => {
    setShowError(false);
    setSelectedCharacter(id);
  }

  return (
    <div className="background-component">
      <Container>
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
        <Alert variant='danger' className={showError ? '' : 'd-none'}>
          Please select a character first!
        </Alert>
        <div className="character-panel">
          <CharacterSelector selectedCharacter={selectedCharacter}
            setSelectedCharacter={selectCharacter}></CharacterSelector>
        </div>
        <Button className='button-style' onClick={handleConfirm}>Confirm</Button>
      </Container >
    </div>
  );
}

function CharacterSelector({ selectedCharacter, setSelectedCharacter }) {

  const characters = [
    { id: 1, name: 'Wizard', img: '../../img/character_image/wizard.jpg' },
    { id: 2, name: 'Witch', img: '../../img/character_image/witch.jpg' },
    { id: 3, name: 'Dragon', img: '../../img/character_image/dragon.jpg' },
    { id: 4, name: 'Fairy', img: '../../img/character_image/fairy.jpg' },
    { id: 5, name: 'Elf', img: '../../img/character_image/elf.jpg' },
    { id: 6, name: 'Orc', img: '../../img/character_image/orc.jpg' },
  ];

  const handleCharacterSelect = (id) => {
    setSelectedCharacter(id);
  };

  return (
    <Container>
      <Row>
        {characters.map((character) => (
          <Col key={character.id} className="text-center col-sm-4">
            <Button
              className={`character-btn ${selectedCharacter === character.id ? 'selected' : ''} 
              ${selectedCharacter !== null && selectedCharacter !== character.id ? 'btn-disabled' : ''}`}
              onClick={() => handleCharacterSelect(character.id)}>
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
