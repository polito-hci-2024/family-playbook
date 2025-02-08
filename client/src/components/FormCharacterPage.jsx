import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API'; 
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';

import '../CSS/FormCharacterPage.css';

function FormCharacterPage() {
    const [name, setName] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [characterId, setCharacterId] = useState(0);
    const [charactersArray, setCharactersArray] = useState([]);
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const characters_array = await API.getCharacters();
            setCharactersArray(characters_array);
        } catch (err) {
            console.error('Error fetching characters:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setShowError(false);
        const form = e.currentTarget;
    
        if (form.checkValidity() === false || characterId === 0) {
            e.stopPropagation();
            if (characterId === 0) setShowError(true);
        } else {
            try {
                const user = {
                    name: name,
                    age: ageRange, 
                    character_id: characterId,
                };
    
                const userId = await API.insertUser(user);
    
                localStorage.setItem('userId', userId);
                localStorage.setItem('characterId', characterId);
                localStorage.setItem('userName', name);
                localStorage.setItem('userAgeRange', ageRange);
    
                navigate('/steps/1');
            } catch (error) {
                console.error('Error inserting user:', error);
                setShowError(true); 
            }
        }
        setValidated(true); 
    };
    

    const selectCharacter = (id, name) => {
        setShowError(false);
        setCharacterId(id);
        localStorage.setItem('characterName', name);
    };
    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Row>
    {charactersArray.map((character) => {
        const isDisabled = character.name === "Orc" || character.name === "Dragon";

        return (
            <Col key={character.character_id} className="text-center col-sm-4">
                <Button
                    className={`character-btn ${characterId === character.character_id ? 'selected' : ''} 
                    ${characterId !== 0 && characterId !== character.character_id ? 'btn-disabled' : ''} 
                    ${isDisabled ? 'disabled-character' : ''}`}
                    onClick={() => !isDisabled && selectCharacter(character.character_id, character.name)}
                    disabled={isDisabled}
                >
                    <Image src={character.image_url} alt={character.name} roundedCircle className="character-img" />
                </Button>
                <p className="custom-label">{character.name}</p>
            </Col>
        );
    })}
</Row>
                    <Alert variant="danger" className={showError ? '' : 'd-none'}>
                        Please select a character!
                    </Alert>
                    
                </Form.Group>
                    <Form.Group className="mb-3 custom-input" controlId="nameValidation">
                    <Form.Label className="custom-label">Your Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 custom-input">
                    <Form.Label className="custom-label">Age Range</Form.Label>
                    <Form.Select
                        aria-label="Select your age range"
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)} 
                        required
                        className="custom-select"
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


                <div className="character-form-button-container">
                <Button className="character-form-button" type="submit">
                    Start
                </Button>
                </div>
            </Form>
        </Container>
    );
}

export default FormCharacterPage;
