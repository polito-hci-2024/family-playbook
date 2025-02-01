import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API'; // Importa la tua API
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
        e.preventDefault();  // Prevenire il comportamento di submit predefinito del form
        setShowError(false);
        const form = e.currentTarget;
    
        if (form.checkValidity() === false || characterId === 0) {
            e.stopPropagation();
            if (characterId === 0) setShowError(true);
        } else {
            // Se il form è valido, chiama l'API per inserire l'utente
            try {
                const user = {
                    name: name,
                    age: ageRange, // Usa il range di età come valore numerico se necessario
                    character_id: characterId,
                };
    
                const userId = await API.insertUser(user); // Chiamata API per inserire l'utente
    
                // Salva l'ID dell'utente e altri dati nel localStorage
                localStorage.setItem('userId', userId);
                localStorage.setItem('characterId', characterId);
                localStorage.setItem('userName', name);
                localStorage.setItem('userAgeRange', ageRange);
    
                // Naviga alla pagina successiva
                navigate('/steps/1');
            } catch (error) {
                console.error('Error inserting user:', error);
                setShowError(true); // Mostra un messaggio di errore se qualcosa va storto
            }
        }
        setValidated(true); // Imposta lo stato validato dopo la sottomissione
    };
    

    const selectCharacter = (id) => {
        setShowError(false);
        setCharacterId(id);
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Row>
                        {charactersArray.map((character) => (
                            <Col key={character.character_id} className="text-center col-sm-4">
                                <Button
                                    className={`character-btn ${characterId === character.character_id ? 'selected' : ''} 
                        ${characterId !== 0 && characterId !== character.character_id ? 'btn-disabled' : ''}`}
                                    onClick={() => selectCharacter(character.character_id)}>
                                    <Image src={character.image_url} alt={character.name} roundedCircle className="character-img" />
                                </Button>
                                <p><b>{character.name}</b></p>
                            </Col>
                        ))}
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
                        onChange={(e) => setName(e.target.value)} // Gestisce il cambiamento del nome
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
                        onChange={(e) => setAgeRange(e.target.value)} // Gestisce il cambiamento dell'età
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
