import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

export default function FetchTSVData(props) {
  const [tsvData, setTsvData] = useState([]);

  useEffect(() => {
    fetchTSVData(); // Fetch the TSV data when the component mounts
  }, []); // The empty array ensures that this effect runs only once, like componentDidMount

  const fetchTSVData = () => {
    const tsvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQaR8s8V36JzoOPT23A-Wl5VFtRlna_wXMgagG_siwJDDFyqa0piu_gwkB7VjPHWBMIy8GDH9y0yhIf/pub?output=tsv";

    axios
      .get(tsvUrl) // Use Axios to fetch the TSV data
      .then((response) => {
        const parsedTsvData = parseTSV(response.data); // Parse the TSV data into an array of objects
        setTsvData(parsedTsvData); // Set the fetched data in the component's state
        const chapters = fetchUniqueChapters(parsedTsvData);
        props.setChapters(chapters);
        props.setData(parsedTsvData);
        console.log(parsedTsvData); // Now you can work with 'tsvData' in your component's state.
      })
      .catch((error) => {
        console.error("Error fetching TSV data:", error);
      });
  };

  function parseTSV(tsvText) {
    const rows = tsvText.split(/\r?\n/); // Use a regular expression to split the TSV text into rows
    const headers = rows[0].split("\t"); // Extract headers (assumes the first row is the header row), using tab as the delimiter
    const data = []; // Initialize an array to store the parsed data
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split("\t"); // Split the row data using tab as the delimiter
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    return data;
  }

  function fetchUniqueChapters(dataArray) {
    const allChapters = dataArray.map((item) => item.Chapter);
    const uniqueChapters = new Set(allChapters);
    return Array.from(uniqueChapters);
  }

  return <div></div>;
}
