import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';


import '../CSS/LastChapter.css';
import API from '../API.mjs';



function LastChapter() {
    const [userName, setUserName] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: '5',
        review: ''
    });
    const navigate = useNavigate();

    // Imposta l'username quando il componente si monta
    useEffect(() => {
        setUserName(localStorage.getItem('userName') || '');
    }, []);

    // Questo useEffect si attiva quando il successo della recensione è impostato a true
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => navigate('/'), 5000); // Naviga dopo 5 secondi
            return () => clearTimeout(timer); // Pulisce il timer quando il componente si smonta
        }
    }, [successMessage, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewForm({
            ...reviewForm,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.insertReviews(reviewForm);

            // Mostra il messaggio di successo nel componente
            setSuccessMessage(true);
            // Resetta il form dopo l'invio
            setReviewForm({
                rating: '5',
                review: ''
            });

        } catch (error) {
            console.error('Errore durante l\'invio della recensione:', error);
            alert('Errore durante l\'invio della recensione.');
        }
    };
    return (
        <div className="background-component">
            <h1 className="title">Last Chapter</h1>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRating" className="mb-3">
                        <Form.Label className='title2'>Did you enjoy this activity?</Form.Label>
                        <Form.Label className='title3'>Please, leave your rating!</Form.Label>
                        <Form.Control
                            as="select"
                            name="rating"
                            value={reviewForm.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value="1">😢 - Poor</option>
                            <option value="2">😐 - Fair</option>
                            <option value="3">🙂 - Good</option>
                            <option value="4">😃 - Very Good</option>
                            <option value="5">😍 - Excellent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formReview" className="mb-3">
                        <Form.Label className='title2'>Do you have any suggestion to improve our app?</Form.Label>
                        <Form.Label className='title3'>If there is anything that didn't work as expected or would like to see improved,
                            please fill out the form</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder="Write your review here"
                            name="review"
                            value={reviewForm.review}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button className='review-form-button' type="submit" disabled={successMessage === true}>
                        Submit Review
                    </Button>
                </Form>
                {successMessage === true ? <Alert variant='success'>Review successfully sent!
                    <Alert.Heading>Thank you {userName}! See you soon!</Alert.Heading></Alert> : ''}
            </Container>
        </div >
    );
}

export default LastChapter;