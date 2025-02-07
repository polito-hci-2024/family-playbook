import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "../CSS/InteractiveGuide.css";

const Button = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="next-button"
  >
    {children}
  </button>
);

const messages = [
  " Hi, I'm Lumi, \n Welcome to PlayBook!",
  " Turn your city into a playground with adventures designed for your family!",
  " Tell us about you: Answer a few quick questions to get personalized activities.",
  " Start your journey: Pick a character, a path, and a special item.",
  " Explore & play: Discover two real-world activities and complete fun challenges!",
  " Every day is a new adventure. Ready to begin?🚀"
];

export default function InteractiveGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i < messages[currentIndex].length - 1) { // Aggiungi un controllo qui
        setDisplayedText((prev) => prev + messages[currentIndex][i]);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextMessage = () => {
    if (!isTyping && currentIndex < (messages.length - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevMessage = () => {
    if (!isTyping && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const skipGuide = () => {
    console.log("Guide skipped"); // Qui puoi reindirizzare l'utente dove vuoi
  };

  // Funzione per dividere il testo con i ritorni a capo (\n)
  const renderTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="interactive-guide-container">
      <div>
        <button className="skip-button" onClick={skipGuide}>Skip the Guide</button>
        <div className="progress-dots">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`dot ${index <= currentIndex ? 'active' : ''}`}
            ></div>
          ))}
        </div>
        <motion.div
          className="message-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p>{renderTextWithLineBreaks(displayedText)}</p>
        </motion.div>
        
        <div className="button-container">
          <Button onClick={prevMessage} disabled={currentIndex === 0}>Back</Button>
          <Button onClick={nextMessage} disabled={isTyping}>Next</Button>
        </div>
        <img src="/img/lumi_smile.png" alt="Mascotte" className="mascot" />
      </div>
    </div>
  );
}
