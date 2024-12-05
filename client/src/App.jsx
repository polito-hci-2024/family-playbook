import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

function App() {
  // Media query per il tablet (Microsoft Surface in verticale)
  const isTablet = useMediaQuery({ query: '(max-width: 1824px) and (min-width: 600px)' });

  return (
    <div>
      {isTablet ? (
        <div>Vista per Tablet</div>
      ) : (
        <div>INSERIRE IMMAGINE CATTIVA DI LUMI CHE DICE DI RUOTARE IL TABLET</div>
      )}
    </div>
  );
}

export default App;
