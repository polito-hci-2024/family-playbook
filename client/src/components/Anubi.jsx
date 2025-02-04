import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Webcam from "react-webcam";
import ButtonsEgypt from "./ButtonsEgypt";
import "../CSS/Anubi.css"; // Import del file CSS
function Anubi() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]); // Array per salvare le foto
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Stato per la fotocamera
  const [deleteIndex, setDeleteIndex] = useState(null);
  const webcamRef = useRef(null);
  // Funzione per scattare una foto
  const capturePhoto = () => {
    if (webcamRef.current) {
      const photo = webcamRef.current.getScreenshot(); // Ottiene l'immagine
      setPhotos((prevPhotos) => [...prevPhotos, photo]); // Aggiunge la foto all'array
      setIsCameraOpen(false); // Chiude la fotocamera
    }
  };
  // Funzione per eliminare una foto
  const confirmDelete = () => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, i) => i !== deleteIndex)
    ); // Rimuove la foto selezionata
    setDeleteIndex(null); // Resetta lo stato di eliminazione
  };
  const handleNavigate = () => {
    if (photos.length === 3) {
      navigate("/congratulationsEgypt"); // Naviga alla route del passaggio selezionato
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
      
      {/* Mostra le foto scattate */}
      <div className="photoGrid">
        {photos.map((photo, index) => (
          <div key={index} className="photoWrapper">
            <img
              src={photo}
              alt={`Snapshot ${index + 1}`}
              className="photo"
            />
            {/* Bottone di eliminazione */}
            <button
              onClick={() => setDeleteIndex(index)}
              className="deleteButton"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {/* Bottone per aprire la fotocamera */}
      {!isCameraOpen && photos.length < 3 && (
        <div className="button" onClick={() => setIsCameraOpen(true)}>
            <img src="/img/fotocamera.png" alt="Info Icon" />
        </div>
      )}
      {/* Messaggio quando sono state scattate 3 foto */}
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
      {/* Fotocamera */}
      {isCameraOpen && (
        <div
            className="cameraOverlay"
            onClick={() => setIsCameraOpen(false)} // Chiude la fotocamera cliccando sull'overlay
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
      {/* Riquadro per confermare eliminazione */}
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
      {/* Freccia sinistra sempre visibile */}
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