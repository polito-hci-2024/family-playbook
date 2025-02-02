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
        You’ve completed the quest, brave adventurer! By finding Anubis' sacred symbols, you’ve proven your wisdom and skill. The god of the underworld now watches over you. The ancient mysteries of Egypt have been uncovered, and your adventure here comes to a close.
        Thank you for your courage and curiosity. The journey may be over for now, but remember—there are always more worlds to explore. 
        Until we meet again!
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
