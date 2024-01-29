import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StudyPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const StudyPage = () => {
  const { state } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [progress, setProgress] = useState(0);
  const [flipTriggeredByClick, setFlipTriggeredByClick] = useState(false);

  useEffect(() => {
    // Add event listeners for keyboard navigation
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      // Remove event listeners when component unmounts
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex]);

  if (!state || !state.data) {
    return <div>No data available</div>;
  }

  const data = state.data;
  const card = data[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.length - 1 && showFront) {
      setProgress((currentIndex + 2) / data.length);
      setCurrentIndex(currentIndex + 1);
      setShowFront(true);
      setFlipTriggeredByClick(false); // Reset click trigger
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && showFront) {
      setProgress(currentIndex / data.length);
      setCurrentIndex(currentIndex - 1);
      setShowFront(true);
      setFlipTriggeredByClick(false); // Reset click trigger
    }
  };

  const toggleCard = () => {
    if (!flipTriggeredByClick) {
      // Card is flipped by click, so don't flip again
      setFlipTriggeredByClick(true);
      return;
    }
    if (!showFront) {
      // Card is already flipped, so flip it back to the front
      setShowFront(true);
    } else {
      // Card is on the front, flip it to the back
      setShowFront(false);
    }
  };

  const handleKeyPress = (e) => {
    e.stopPropagation();
    if (e.key === "ArrowLeft") {
      handlePrevious();
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      handleNext();
      e.preventDefault();
    } else if ((e.key === " " || e.key === "Spacebar") && !e.repeat) {
      toggleCard();
      e.preventDefault(); // Prevent default spacebar behavior
    }
  };

  const progressBar = `${currentIndex + 1}/${data.length}`;

  return (
    <div className="study-page">
      <h1>{state.chapter + "과"}</h1>
      <div
        className={`card ${showFront ? "" : "flip"}`}
        onClick={toggleCard}
        onKeyDown={handleKeyPress}
        tabIndex="0"
      >
        <div className="card-content">
          <div className="card-front">{card.Word}</div>
          <div className="card-back">
            <div>{card.Translation}</div>
            <div> {card.Example}</div>
          </div>
        </div>
      </div>
      <div className="card-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="circle-button"
        >
          <FaArrowLeft />
        </button>
        <span>
          {currentIndex + 1}/{data.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === data.length - 1}
          className="circle-button"
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="progress-bar">
        <div
          className="progress-indicator"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StudyPage;
