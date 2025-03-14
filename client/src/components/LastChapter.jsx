import React, { useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../CSS/LastChapter.css';
import API from '../API.mjs';

function LastChapter() {
    const [userName, setUserName] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: '',
        review: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(localStorage.getItem('userName') || '');
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => navigate('/'), 5000);
            return () => clearTimeout(timer);
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

            setSuccessMessage(true);

            setTimeout(() => {
                setReviewForm({
                    rating: '',
                    review: ''
                });
            }, 2500);

            setTimeout(() => navigate('/the-end'), 3000);

        } catch (error) {
            console.error('Error while submitting review:', error);
            alert('Error while submitting review');
        }
    };
    return (
        <div className="background-component">
            <h1 className="last-title">Last Chapter</h1>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}>
                <p className="last-description"> And just like that, this adventure has come to an end.<br></br>
                    <br></br>You've discovered new treasures, solved mysteries, and had so much fun along the way. But remember, every day can be a new adventure, full of exciting moments and laughter. <br></br>
                </p>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formRating" className="mb-3">
                            <Form.Label className='title2'>Did you enjoy this activity?  <span className="required">*</span> </Form.Label>
                            <Form.Label className='title3'>Please, leave your rating!</Form.Label>
                            <Form.Control
                                as="select"
                                name="rating"
                                value={reviewForm.rating}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled hidden>Select an option</option>
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
                                placeholder="Write your review here (Optional)"
                                name="review"
                                value={reviewForm.review}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button className='review-form-button' type="submit" disabled={successMessage === true}>
                            Submit Review
                        </Button>
                    </Form>
                    {successMessage === true ? <Alert variant='success' className="custom-alert">Review successfully sent!
                        <Alert.Heading className="custom-alert-heading">Thank you {userName}! See you soon!</Alert.Heading></Alert> : ''}
                </Container>
            </motion.div>
        </div >
    );
}

export default LastChapter;