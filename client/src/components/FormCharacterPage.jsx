import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';

import '../CSS/FormCharacterPage.css';

function FormCharacterPage() {
    const [name, setName] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [characterId, setCharacterId] = useState(0);
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const characters = [
        { id: 1, name: 'Wizard', img: '../../img/character_image/wizard.jpg' },
        { id: 2, name: 'Witch', img: '../../img/character_image/witch.jpg' },
        { id: 3, name: 'Dragon', img: '../../img/character_image/dragon.jpg' },
        { id: 4, name: 'Fairy', img: '../../img/character_image/fairy.jpg' },
        { id: 5, name: 'Elf', img: '../../img/character_image/elf.jpg' },
        { id: 6, name: 'Orc', img: '../../img/character_image/orc.jpg' },
    ];

    const handleSubmit = (e) => {
        setShowError(false);
        const form = e.currentTarget;
        if (form.checkValidity() === false || characterId === 0) {
            e.preventDefault();
            e.stopPropagation();
            if (characterId === 0) setShowError(true);
        } else {
            // Se il form è valido, naviga alla pagina successiva
            localStorage.setItem('userName', name);
            localStorage.setItem('userAgeRange', ageRange);
            navigate('/next');
        }
        setValidated(true); // Imposta lo stato validato dopo la sottomissione
    };

    const selectCharacter = (id) => {
        setShowError(false);
        setCharacterId(id);
    }

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Alert variant='danger' className={showError ? '' : 'd-none'}>
                        Please select a character!
                    </Alert>
                    <Row>
                        {characters.map((character) => (
                            <Col key={character.id} className="text-center col-sm-4">
                                <Button
                                    className={`character-btn ${characterId === character.id ? 'selected' : ''} 
                        ${characterId !== 0 && characterId !== character.id ? 'btn-disabled' : ''}`}
                                    onClick={() => selectCharacter(character.id)}>
                                    <Image src={character.img} alt={character.name} roundedCircle className="character-img" />
                                </Button>
                                <p><b>{character.name}</b></p>
                            </Col>
                        ))}
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="nameValidation">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Gestisce il cambiamento del nome
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age Range</Form.Label>
                    <Form.Select
                        aria-label="Select your age range"
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)} // Gestisce il cambiamento dell'età
                        required
                    >
                        <option value="">Select age range</option>
                        <option value="0-5">0-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10-15">10-15 years</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select an age range.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className='button-style' type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default FormCharacterPage;
