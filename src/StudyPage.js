import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StudyPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const StudyPage = () => {
  const { state } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [progress, setProgress] = useState(0);
  const [interactionState, setInteractionState] = useState({
    clicked: false,
    touched: false,
  });

  useEffect(() => {
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
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex]);

  useEffect(() => {
    setProgress((currentIndex + 1) / data.length);
  }, [currentIndex, data.length]);

  if (!state || !state.data) {
    return <div>No data available</div>;
  }

  const data = state.data;
  const card = data[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFront(true);
      setInteractionState({ clicked: false, touched: false });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFront(true);
      setInteractionState({ clicked: false, touched: false });
    }
  };

  const toggleCard = () => {
    if (!interactionState.clicked && !interactionState.touched) {
      setInteractionState({ ...interactionState, clicked: true });
      setShowFront(!showFront);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!interactionState.touched) {
      setInteractionState({ ...interactionState, touched: true });
      setShowFront(!showFront);
    }
  };

  return (
    <div className="study-page">
      <h1>{state.chapter + "과"}</h1>
      <div
        className={`card ${showFront ? "" : "flip"}`}
        onClick={toggleCard}
        onTouchEnd={handleTouchEnd}
        tabIndex="0"
      >
        <div className="card-content">
          <div className="card-front">{card.Word}</div>
          <div className="card-back">
            <div>{card.Translation}</div>
            <div>{card.Example}</div>
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
