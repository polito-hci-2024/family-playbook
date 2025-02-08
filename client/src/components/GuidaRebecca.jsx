import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../CSS/InteractiveGuide.css";

const Button = ({ onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="next-button">
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

const InteractiveGuide = ({onClose}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i < messages[currentIndex].length - 1) {
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
    if (!isTyping && currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevMessage = () => {
    if (!isTyping && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const skipGuide = () => {
    console.log("Guide skipped");
  };

  const renderTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const calculateTextWidth = (text) => {
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.width = "60vw"; // Imposta una larghezza massima del 60% della larghezza dello schermo
    tempElement.innerText = text;
    document.body.appendChild(tempElement);
    const width = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);
    return width;
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      const width = calculateTextWidth(messages[currentIndex]);
      messageBoxRef.current.style.maxWidth = `${width}px`;
    }
  }, [currentIndex]);

  return (
    <div className="interactive-guide-container">
      <div>
        <button className="skip-button" onClick={onClose}>
          Skip the Guide
        </button>
        <div className="container-message-dots-buttons">
        <div className="progress-dots">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`dot ${index <= currentIndex ? "active" : ""}`}
            ></div>
          ))}
        </div>
        <motion.div
          className="message-box"
          ref={messageBoxRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p>{renderTextWithLineBreaks(displayedText)}</p>
        </motion.div>

        <div className="button-container">
          <Button onClick={prevMessage} disabled={currentIndex === 0}>
            Back
          </Button>
          <Button onClick={nextMessage} disabled={isTyping}>
            Next
          </Button>
        </div>
        </div>
        <img src="/img/lumi_smile.png" alt="Mascotte" className="mascot" />
      </div>
    </div>
  );
};

export default InteractiveGuide;
