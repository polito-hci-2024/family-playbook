import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../CSS/StepsPage.css';
import API from '../API.mjs';

function StepsPage({ stepId }) {
  const navigate = useNavigate();
  const [panels, setPanels] = useState([]); 
  const [stepName, setStepName] = useState('');
  const [showArrows, setShowArrows] = useState(false);
  const [scrollY, setScrollY] = useState(0); 

  const replacePlaceholder = (text, characterName, name) => {
    return text
      .replace(/\{\$characterName\}/g, characterName)
      .replace(/\{\$name\}/g, name);
  };

  const fetchStepData = async (id) => {
    try {
      const characterName = localStorage.getItem('characterName') || 'Hero'; 
      const name = localStorage.getItem('userName') || 'Leo'; 
      const data = await API.getStepsById(id);
      setStepName(data[0]?.step_name || ''); 
      setPanels(data.map((panel) => ({
        id: panel.panel_number,
        image: panel.image_url,
        text: replacePlaceholder(panel.description, characterName, name),
      })));
    } catch (error) {
      console.error('Error fetching step data:', error);
    }
  };

  const handleNext = () => {
    navigate(`/question/${parseInt(stepId)}`);
  };

  const handleBack = () => {
    navigate('/chapter-zero');
  };

  const handleScroll = () => {
    setScrollY(window.scrollY); 
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (panels.length > 1 && scrollY + windowHeight >= (docHeight / 4) * 3) {
      setShowArrows(true);
    }
  };

  useEffect(() => {
    fetchStepData(stepId);
  }, [stepId]);

  useEffect(() => {
    if (panels.length > 1) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [panels.length]);

  useEffect(() => {
    if (panels.length < 2) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [panels.length]);

  return (
    <div className="step">
      <div className="Introduction">
        <div className="story-background">
          <p 
            className="title" 
            style={{
              opacity: scrollY > 50 ? 0 : 1, 
              transition: 'opacity 0.3s ease' 
            }}
          >
            {stepName || 'Loading...'}
          </p>
          {panels.map((panel, index) => (
            <motion.div
              className="story-panel"
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.8 }}
            >
              {panel.image && (
                <img
                  src={panel.image}
                  alt={`Panel ${panel.id}`}
                  className={`story-image ${panel.id === 4 ? 'inline-image-bivio' : 'inline-image'}`}
                />
              )}
              <p className="story-text">{panel.text}</p>
            </motion.div>
          ))}
          {showArrows && (
            <>
              <img
                src="/img/next.png"
                alt="Arrow Right"
                className="arrow arrow-right"
                onClick={handleNext}
              />
              <img
                src="/img/back.png"
                alt="Arrow Left"
                className="arrow arrow-left"
                onClick={handleBack}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepsPage;
