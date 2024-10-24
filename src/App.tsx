import { useEffect, useState } from "react";
import { getCsvFile, months, calculateAge } from "./utilities";
import "./App.css";
import { CsvFileJson } from "./types";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Button from "./components/SASButton";
import Dropdown from "./components/SASDropdown";

export default function App() {
  const today = new Date();
  const currentMonth = today.getMonth();

  const [csvData, setCsvData] = useState<CsvFileJson[]>([]);
  const [monthFilter, setMonthFilter] = useState<number>(currentMonth);
  const [filteredData, setFilteredData] = useState<CsvFileJson[]>([]);
  const [sortType, setSortType] = useState<"years" | "days" | "hours">("years");

  const matchesMonth = (date: string) => {
    const birthday = new Date(date);
    const birthdayMonth = birthday.getMonth();
    return birthdayMonth === monthFilter;
  };

  const handleSort = () => {
    const nextSortType =
      sortType === "years" ? "days" : sortType === "days" ? "hours" : "years";
    setSortType(nextSortType);
  };

  const fetchData = async () => {
    const data: CsvFileJson[] = (await getCsvFile(
      "data/ProgrammingChallengeData.csv"
    )) as CsvFileJson[];

    const filteredByBday = data.filter((data) => matchesMonth(data.birthday));

    setCsvData(data);
    setFilteredData(filteredByBday);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppBar position="static" sx={headerHeight}>
        <Toolbar sx={{ gap: 5 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Employee Information
          </Typography>

          <Button
            text="Apply Filter"
            onClick={() => {
              if (monthFilter === months.length) {
                setFilteredData(csvData);
                return;
              }
              const newFilteredData = csvData.filter((data) =>
                matchesMonth(data.birthday)
              );

              setFilteredData(newFilteredData);
            }}
          />

          <Dropdown
            selectedValue={monthFilter}
            onChange={(e) => setMonthFilter(Number(e.target.value))}
            options={[...months, { value: months.length, label: "All Months" }]}
          />
        </Toolbar>
      </AppBar>

      <table className="sas-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Birthday</th>
            <th className="sas-table-age-header" onClick={handleSort}>
              Age ({sortType})
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.location}</td>
              <td>{data.birthday}</td>
              <td>{calculateAge(data.birthday, sortType)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const headerHeight = {
  minHeight: "100px",
  justifyContent: "center",
  minWidth: "700px",
};
