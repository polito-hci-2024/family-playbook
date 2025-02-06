import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRef } from "react";
import '../CSS/ModalGuide.css';

const ModalGuide = ({ videoSrc }) => {
    const [show, setShow] = useState(false);
    const videoRef = useRef(null);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleVideoEnded = () => {
        if (videoRef.current) {
            // Disabilita la barra di controllo e blocca il video una volta terminato
            videoRef.current.controls = false;
            videoRef.current.pause();
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="position-absolute top-0 end-0 m-5">
                Guide
            </Button>
            <Modal show={show} onHide={handleClose} centered size="xl" className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>What do you have to do on this page?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ position: 'relative', paddingBottom: '90%' }}>
                        < video
                            ref={videoRef}
                            src={videoSrc}
                            title="Guide video"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            autoPlay
                            onEnded={handleVideoEnded}
                        ></video></div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    )
};

export default ModalGuide;

