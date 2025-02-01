import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSyncAlt } from 'react-icons/fa';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import StoryPage from './components/StoryPage';
import ChapterZero from './components/ChapterZero';
import LastChapter from './components/LastChapter';
import Activities from './components/Activities';
import StartActivity from './components/StartActivity';
import StepsPage from './components/StepsPage';
import Question from './components/Question';
import StoryPageMuseum from './components/StoryPageMuseum';
import Potion from './components/Potion';
import Scratch2 from './components/Scratch2';
import StepSelectionEldora from './components/StepsEldora';
import LastStepSelectionEldora from './components/LastStepsEldora';
import StepSelectionEgypt from './components/StepsEgypt';
import Raining from './components/Raining';
import Scratch from './components/Scratch';
import Map from './components/Map';
import Anubi from './components/Anubi';
import MapEgypt from './components/MapEgypt';
import TheEnd from './components/theEnd';
import Start from './components/start';
import Potion2 from './components/Potion2';
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
          <Route path="/chapter-zero" element={<ChapterZero />} />
          <Route path="/steps/1" element={<StepsPage stepId={1} />} />
          <Route path="/question/1" element={<Question question_id={1} />} />
          <Route path="/question/2" element={<Question question_id={2} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/start-activity" element={<StartActivity />} />
          <Route path="/storyNature/:activityId/:storyId" element={<StoryPage />} /> {/* Simone dice: puoi testarla a http://localhost:5173/storyNature/1/1, ma se alla fine facciamo la storia frontend allora poi la componente storyPage si può cestinare */}
          <Route path="/challenge/1/1" element={<Potion/>} /> 
          <Route path="/challenge/1/2" element={<Potion2/>}/>  {/*Rebecca dice: ho cambiato la roue da /challenge/1 a challenge/1/1 in modo da collegare le due challenge di Rebecca */}
          <Route path="/storyMuseum/:activityId/:storyId" element={<StoryPageMuseum />} /> {/* Simone dice: Credo Anita non l'abbia usata, ma se alla fine facciamo la storia frontend allora poi la componente storyPageMuseum si può cestinare */}
          <Route path="/last-chapter" element={<LastChapter />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/challenge/2" element={<Scratch />} />
          <Route path="/challenge/2-alternativa" element={<Scratch2 />} /> {/* Simone dice: è la challenge delle card che si girano */}
          <Route path="/step-selection-eldora" element={<StepSelectionEldora activity_id={1} />}/>
          <Route path="/raining" element={<Raining />}/>  
          <Route path="/step-selection-egypt" element={<StepSelectionEgypt activity_id={2} />}/>
          <Route path="/map" element={<Map />}/>
          <Route path="/challenge/4" element={<Anubi/>} />
          <Route path="/last-step-selection-eldora" element={<LastStepSelectionEldora activity_id={1} />}/>
          <Route path="/mapEgypt" element={<MapEgypt />}/>
          <Route path="/the-end" element={<TheEnd />}/>
          <Route path="/" element={<Start />}/>

        </Routes>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <FaSyncAlt size={100} className="mb-4 text-primary" />
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Please rotate your device or use a tablet!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
