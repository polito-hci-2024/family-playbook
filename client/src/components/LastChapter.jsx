import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


import '../CSS/LastChapter.css';



function LastChapter() {
    const [reviewForm, setReviewForm] = useState({
        name: '',
        rating: '5',
        review: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Review submitted:', reviewForm);
        // Qui puoi gestire l'invio del form (ad esempio, inviarlo a un server)
        alert('Recensione inviata con successo!');
        // Resetta il form dopo l'invio
        setReviewForm({
            name: '',
            rating: '5',
            review: ''
        });
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
                            required
                        >
                            <option value="1">😑 - Poor</option>
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
                        />
                    </Form.Group>
                    <Button className='button-style' type="submit">
                        Submit Review
                    </Button>
                </Form>
            </Container>
        </div >
    );
}

export default LastChapter;