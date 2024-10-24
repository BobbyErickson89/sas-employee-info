import { useEffect, useState } from "react";
import { getCsvFile, months } from "./utilities";
import "./App.css";
import { CsvFileJson } from "./types";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";

export default function App() {
  const today = new Date();
  const currentMonth = today.getMonth();

  const [csvData, setCsvData] = useState<CsvFileJson[]>([]);
  const [monthFilter, setMonthFilter] = useState<number>(currentMonth);
  const [filteredData, setFilteredData] = useState<CsvFileJson[]>([]);

  const matchesMonth = (date: string) => {
    const birthday = new Date(date);
    const birthdayMonth = birthday.getMonth();
    return birthdayMonth === monthFilter;
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={headerHeight}>
        <Toolbar sx={{ gap: 5 }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
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

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Birthday</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.location}</td>
              <td>{data.birthday}</td>
              <td>{data.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

const headerHeight = {
  minHeight: "100px",
  justifyContent: "center",
};
