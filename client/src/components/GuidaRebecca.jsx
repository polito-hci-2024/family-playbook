import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../CSS/InteractiveGuide.css";

const Button = ({ onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="next-button">
    {children}
  </button>
);

const InteractiveGuide = ({ messages, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i < messages[currentIndex].length) {
        const char = messages[currentIndex][i];
        if (char === '<') {
          const endIndex = messages[currentIndex].indexOf('>', i);
          if (endIndex !== -1) {
            const tag = messages[currentIndex].slice(i, endIndex + 1);
            setDisplayedText((prev) => prev + tag);
            i = endIndex + 1;
          } else {
            setDisplayedText((prev) => prev + char);
            i++;
          }
        } else {
          setDisplayedText((prev) => prev + char);
          i++;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentIndex, messages]);

  const nextMessage = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose(); // Chiude la guida all'ultimo messaggio
    }
  };

  const prevMessage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderTextWithFormatting = (text) => {
    return { __html: text };
  };

  const calculateTextWidth = (text) => {
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.width = "70vw";
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
          {messages.length > 1 && (
            <div className="progress-dots">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index <= currentIndex ? "active" : ""}`}
                ></div>
              ))}
            </div>
          )}
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
            {messages.length > 1 && (
              <Button onClick={prevMessage} disabled={currentIndex === 0}>
                Back
              </Button>
            )}
            <Button onClick={nextMessage}>
              {currentIndex === messages.length - 1 ? "Close Guide" : "Next"}
            </Button>
          </div>
        </div>
        <img src="/img/lumi_smile.png" alt="Mascotte" className="mascot" />
      </div>
    </div>
  );
};

export default InteractiveGuide;
