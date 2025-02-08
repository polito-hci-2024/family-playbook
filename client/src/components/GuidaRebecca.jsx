import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../CSS/InteractiveGuide.css";

const Button = ({ onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="next-button">
    {children}
  </button>
);

const messages = [
  " <b>Hi, I'm Lumi</b>, \nWelcome to <b><i>PlayBook</b></i>!🎉",
  " <i>Playbook</i> is your gateway to fun-filled adventures for families in <b>Turin</b>, with experiences tailored just for you, turning your city into the perfect playground.",
  " <b><i>How It Works:</b></i><br><b>1.</b> Choose a <i>character</i>, a <i>path</i>, and an <i>object</i> to start your adventure.<br><b>2.</b><i> Based on your choices</i>, we’ll suggest exciting real-world activities.<br><b>3.</b>Take on the challenges and complete your journey along the way!",
  " <b>Every day is a new adventure.</b> <br><i> Ready to begin?🚀</i>"
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

  const renderTextWithFormatting = (text) => {
     //Usa espressioni regolari per sostituire i simboli con i rispettivi tag HTM
  
    return { __html: text };
 };
  

  const calculateTextWidth = (text) => {
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.width = "70vw"; // Imposta una larghezza massima del 60% della larghezza dello schermo
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
          <p dangerouslySetInnerHTML={renderTextWithFormatting(displayedText)} />
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
