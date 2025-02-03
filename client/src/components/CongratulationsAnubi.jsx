import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate per la navigazione
import '../CSS/CongratulationsAnubi.css';

function CongratulationsAnubi() {
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
      You’ve completed the quest, adventurer! By finding Anubis' symbols, you’ve proven your wisdom and earned his protection. The mysteries of Egypt are now revealed, and your journey here ends.
      Thank you for your courage. The adventure may be over, but there are always more worlds to explore.
      Until next time! 🌟
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

export default CongratulationsAnubi;
