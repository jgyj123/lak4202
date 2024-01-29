import React from "react";
import "./ChapterTile.css";
import { useNavigate } from "react-router-dom";
const ChapterTile = ({ chapterNumber }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chapter", {
      state: {
        chapter: chapterNumber,
      },
    });
  };
  return (
    <button className="chapter-tile" onClick={handleClick}>
      <p className="chapter-label">
        <strong>{chapterNumber}</strong> 과
      </p>
    </button>
  );
};

export default ChapterTile;
