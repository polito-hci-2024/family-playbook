import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../CSS/ChapterZero.css';  

const ChapterZero = () => {
  const [city, setCity] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [character, setCharacter] = useState('');

  const navigate = useNavigate();  // Hook per la navigazione programmatica

  const handleProceed = () => {
    if (!city || !ageRange || !character) {
      alert('Please complete all selections before proceeding.');
      return;
    }
    // Naviga alla pagina successiva
    navigate('/next');  // Cambia il percorso a '/next'
  };

  return (
    <div style={{ fontFamily: 'Cinzel, serif', color: '#333', padding: '20px', height: '100vh', position: 'relative' }}>
      {/* Titolo principale */}
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center', textShadow: '2px 2px 5px #000' }}>
        Chapter Zero
      </h1>

      {/* Sezione: Select the City */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Select the City</h2>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px' }}
        >
          <option value="" disabled>Select a city</option>
          <option value="Torino">Torino</option>
          <option value="Milano">Milano</option>
        </select>
      </div>

      {/* Sezione: Select Your Age */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Select Your Age</h2>
        <select
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px' }}
        >
          <option value="" disabled>Select an age range</option>
          <option value="2-5">2-5</option>
          <option value="5-10">5-10</option>
          <option value="10-16">10-16</option>
        </select>
      </div>

      {/* Sezione: Select Your Character */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Select Your Character</h2>
        <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px' }}
        >
          <option value="" disabled>Select a character</option>
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Rogue">Rogue</option>
        </select>
      </div>

      {/* Pulsante Freccia */}
      <button
        onClick={handleProceed}
      >
        <img
          src="client\img\right-arrow.png" 
          alt="Proceed"
          style={{ width: '50px', height: '50px' }}
        />
      </button>
    </div>
  );
};

export default ChapterZero;
