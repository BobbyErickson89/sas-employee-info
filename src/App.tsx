import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { getCsvFile } from "./utilities";
import "./App.css";
import { CsvFileJson } from "./types";

function App() {
  const [csvData, setCsvData] = useState<CsvFileJson[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: CsvFileJson[] = (await getCsvFile(
        "data/ProgrammingChallengeData.csv"
      )) as CsvFileJson[];
      setCsvData(data);
    };
    fetchData();
  }, []);

  console.log("csv data:", csvData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload...
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
