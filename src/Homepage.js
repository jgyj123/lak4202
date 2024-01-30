import React, { useState, useEffect } from "react";
import ChapterTile from "./ChapterTile";
import ClipLoader from "react-spinners/ClipLoader";
import "./Homepage.css";
const Homepage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="home-main">
      <h1 className="home-title">LAK4202 어휘 연습</h1>
      <div className="loading-screen"></div>
      {props.chapters?.map((chapter) => (
        <ChapterTile chapterNumber={chapter} />
      ))}
      {props.chapters.length == 0 && (
        <div className="loading">
          <ClipLoader />{" "}
        </div>
      )}
    </div>
  );
};

export default Homepage;
