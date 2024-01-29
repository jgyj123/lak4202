import { useLocation, useNavigate } from "react-router-dom";
import "./ChapterPage.css";
import React, { useState, useEffect } from "react";

const ChapterPage = ({ data }) => {
  const [chapterData, setChapterData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const filteredData = data.filter(
      (item) => item.Chapter === location.state.chapter
    );
    setChapterData(filteredData);
  }, [data, location.state.chapter]);
  const handleLearnClick = () => {
    navigate("/study", {
      state: { data: chapterData, chapter: location.state.chapter },
    });
  };
  return (
    <>
      <div className="chapter-top">
        {" "}
        <h1>{location.state.chapter + "과"}</h1>
        <button onClick={handleLearnClick} className="learn-button">
          Study Now
        </button>
      </div>

      <div className="chapter-table-container">
        <table className="chapter-table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Translation</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {chapterData.map((item, index) => (
              <tr key={index}>
                <td className="computer-top-label">
                  <strong className="word">{item.Word}</strong>
                </td>
                <p className="mobile-label">Translation:</p>{" "}
                {/* Label for mobile */}
                <td className="computer-top-label">
                  {item.Translation || "-"}
                </td>
                <p className="mobile-label">Example:</p>{" "}
                {/* Label for mobile */}
                <td>{item.Example || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ChapterPage;
