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
      You’ve successfully restored the forest’s creatures and revived the magic of Eldoria. With the amulet now whole and the potion of vitality brewed, you’ve proven yourself as a true hero of this enchanted world. But remember, the battle to protect Eldoria’s heart is never over. As long as the dark force lingers, there will always be new challenges to face.
Thank you for joining this magical journey through the heart of Eldoria. Your bravery has not only helped restore balance, but it has also ensured that the forest's magic lives on—protected by its newfound guardians, you among them.
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
