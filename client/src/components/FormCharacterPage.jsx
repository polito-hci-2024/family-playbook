import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import '../CSS/FormCharacterPage.css';

function FormCharacterPage() {
    const [name, setName] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            // Se il form è valido, naviga alla pagina successiva
            localStorage.setItem('userName', name);
            localStorage.setItem('userAgeRange', ageRange);
            navigate('/next');
        }
        setValidated(true); // Imposta lo stato validato dopo la sottomissione
    };

    return (
        <div className="background-component">
            <Container className="form-panel">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationCustom03">
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default FormCharacterPage;
