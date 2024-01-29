import React, { useState, useEffect } from "react";
import ChapterTile from "./ChapterTile";

import "./Homepage.css";
const Homepage = (props) => {
  return (
    <div className="home-main">
      <h1 className="home-title">LAK4202 어휘 연습</h1>
      {props.chapters?.map((chapter) => (
        <ChapterTile chapterNumber={chapter} />
      ))}
    </div>
  );
};

export default Homepage;
