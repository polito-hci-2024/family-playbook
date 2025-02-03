import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate per la navigazione
import '../CSS/CongratulationsPotion.css';

function CongratulationsPotion() {
  const navigate = useNavigate(); // Hook per navigare tra le pagine
  const userName = localStorage.getItem('userName') || 'Hero'; // Ottieni il nome utente dal localStorage

  const handleNext = () => {
    // Naviga alla pagina successiva, puoi personalizzarla a seconda della tua logica
    navigate('/last-chapter'); // Modifica il percorso in base alla tua applicazione
  };

  const handleBack = () => {
    // Naviga alla pagina precedente
    navigate(-1); // Torna indietro
  };

  return (
    <div>
      <h1>Congratulations, {userName}</h1>
      <p className='lead text-center fs-1'>
      You’ve restored the forest’s creatures and revived Eldoria’s magic. With the amulet whole and the potion brewed, you’ve proven yourself a true hero.
Thank you for joining this magical journey. Your bravery has restored balance and ensured the forest’s magic lives on—protected by its new guardians, you included.
Until the next adventure… 🌟

      </p>

      {/* Freccia destra per andare avanti */}
      <img
        src="/img/next.png"
        alt="Arrow Right"
        className="arrow arrow-right"
        onClick={handleNext}
      />

      {/* Freccia sinistra per tornare indietro */}
      <img
        src="/img/back.png"
        alt="Arrow Left"
        className="arrow arrow-left"
        onClick={handleBack}
      />
    </div>
  );
}

export default CongratulationsPotion;
