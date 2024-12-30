import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import StoryPage from './components/StoryPage';
import ChapterZero from './components/ChapterZero';
import LastChapter from './components/LastChapter';
import './CSS/App.css';
import Activities from './components/Activities';
import StartActivity from './components/StartActivity';
import StepsPage from './components/StepsPage';
import Question from './components/Question';
import StoryPageMuseum from './components/StoryPageMuseum';
import Potion from './components/Potion';

function App() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Imposta i criteri per considerare il dispositivo un tablet
      setIsTablet(width >= 600 && width <= 1824 && height >= 1000);
    };

    // Aggiungi listener per il resize
    window.addEventListener('resize', handleResize);

    // Esegui subito il controllo iniziale
    handleResize();

    // Pulisci il listener quando il componente viene smontato
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isTablet ? (
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/chapter-zero" element={<ChapterZero />} />
          <Route path="/steps/1" element={<StepsPage stepId={1} />} />
          <Route path="/question/1" element={<Question question_id={1} />} />
          <Route path="/question/2" element={<Question question_id={2} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/start-activity" element={<StartActivity />} />
          <Route path="/storyNature/:activityId/:storyId" element={<StoryPage />} />
          <Route path="/potion" element={<Potion/>} />
          <Route path="/storyMuseum/:activityId/:storyId" element={<StoryPageMuseum />} />
          <Route path="/last-chapter" element={<LastChapter />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      ) : (
        <div className="rotate-message">
          <p>
            <strong>Lumi dice:</strong> Per favore, usa un tablet o ruota il tuo dispositivo!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
