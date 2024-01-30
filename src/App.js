import React, { useState, useEffect } from "react";
import FetchCSVData from "./FetchCSVData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import ChapterPage from "./ChapterPage";
import StudyPage from "./StudyPage";
import Breadcrumbs from "./Breadcrumbs";
function App() {
  const [data, setData] = useState([]);
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    document.title = "LAK4202 어휘";
  }, []);

  return (
    <>
      <FetchCSVData setData={setData} setChapters={setChapters} />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <Router>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Homepage chapters={chapters} />} />
          <Route path="/chapter" element={<ChapterPage data={data} />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
