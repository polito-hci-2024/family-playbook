import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Webcam from "react-webcam";
import ButtonsEgypt from "./ButtonsEgypt";
import "../CSS/Anubi.css"; 
import API from "../API.mjs";

function Anubi() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]); 
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const webcamRef = useRef(null);
  
  const capturePhoto = () => {
    if (webcamRef.current) {
      const photo = webcamRef.current.getScreenshot(); 
      setPhotos((prevPhotos) => [...prevPhotos, photo]);
      setIsCameraOpen(false); 
    }
  };
  
  const confirmDelete = () => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, i) => i !== deleteIndex)
    ); 
    setDeleteIndex(null); 
  };
  const handleNavigate = async () => {
    const user_id = localStorage.getItem('userId'); // Recupera l'ID utente dal localStorage
    const challenge_id = 3;
    if (photos.length === 3) {
      try {
      await API.insertChallenge(user_id, challenge_id);
      navigate("/congratulationsEgypt"); 
    } catch (error) {
      console.error('Failed to insert challenge:', error);
    }
    }
  };

  const handleNavigateNext = async () => {
    const user_id = localStorage.getItem('userId'); // Recupera l'ID utente dal localStorage
    const challenge_id = 1; // ID della sfida da passare

    try {
      await API.insertChallenge(user_id, challenge_id);
      navigate('/stepsPotion/2'); // Naviga alla prossima pagina dopo l'inserimento
    } catch (error) {
      console.error('Failed to insert challenge:', error);
    }
  };
  const handleNavigateBack = () => {
    navigate("/step-selection-egypt");
  }
  return (
    <div className="Anubi ${deleteIndex !== null ? 'blurred' : ''}">
      <ButtonsEgypt />
      <h1 className="titleAnubi">Find Anubis Symbol</h1>
      <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay:  0.2, duration: 1 }}>
                <p className="descriptionAnubi"> Anubis, god of the Underworld, guards sacred symbols hidden in the museum. Find three and capture them in photographs to unlock his ancient magic. Choose wisely, the journey is challenging!
                </p>
      </motion.div>
      
      <div className="photoGrid">
        {photos.map((photo, index) => (
          <div key={index} className="photoWrapper">
            <img
              src={photo}
              alt={`Snapshot ${index + 1}`}
              className="photo"
            />
            
            <button
              onClick={() => setDeleteIndex(index)}
              className="deleteButton"
            >
              X
            </button>
          </div>
        ))}
      </div>
      
      {!isCameraOpen && photos.length < 3 && (
        <div className="button" onClick={() => setIsCameraOpen(true)}>
            <img src="/img/fotocamera.png" alt="Info Icon" />
        </div>
      )}
      
      {photos.length === 3 && deleteIndex === null && (
        <React.Fragment>
            <h2 className="successMessage">Good job!</h2>
            <img
                src="/img/next.png" 
                alt="Arrow Right"
                className="arrow arrow-right"
                onClick={handleNavigate}
            />
        </React.Fragment>
    )}
      
      {isCameraOpen && (
        <div
            className="cameraOverlay"
            onClick={() => setIsCameraOpen(false)} 
        >
            <div className="cameraContainer" onClick={(e) => e.stopPropagation()}>
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam"
                />
            </div>
            <div className="button_takephoto" onClick={capturePhoto}>
                <img src="/img/fotocamera.png" alt="Info Icon" />
            </div>
        </div>
        
      )}
     
      {deleteIndex !== null && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to delete this photo?</p>
            <div className="popup-buttons">
              <button className="yes-button" onClick={confirmDelete}>Yes</button>
              <button className="no-button" onClick={() => setDeleteIndex(null)}>No</button>
            </div>
          </div>
        </div>
      )}
      
      {!isCameraOpen && deleteIndex === null && (
        <img
        src="/img/back.png" 
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleNavigateBack}
      />
      )}
    </div>
  );
}
export default Anubi;