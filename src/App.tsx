import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { getCsvFile } from "./utilities";
import "./App.css";
import { CsvFileJson } from "./types";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

export default function App() {
  const [csvData, setCsvData] = useState<CsvFileJson[]>([]);
  const [monthFilter, setMonthFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data: CsvFileJson[] = (await getCsvFile(
        "data/ProgrammingChallengeData.csv"
      )) as CsvFileJson[];
      setCsvData(data);
    };
    fetchData();
  }, []);

  // const useStyles = makeStyles({
  //   select: {
  //     "&:before": {
  //       borderColor: "white",
  //     },
  //     "&:after": {
  //       borderColor: "white",
  //     },
  //     "&:not(.Mui-disabled):hover::before": {
  //       borderColor: "white",
  //     },
  //   },
  //   icon: {
  //     fill: "white",
  //   },
  //   root: {
  //     color: "white",
  //   },
  // });

  // const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={headerHeight}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Employee Information
          </Typography>
          <Button variant="outlined" color="inherit">
            Apply Filter
          </Button>
          <FormControl size="small">
            <InputLabel id="month-filter">Month</InputLabel>
            <Select
              labelId="month-filter"
              value={monthFilter}
              label="Month"
              onChange={(e) => setMonthFilter(e.target.value)}
              sx={{ width: "200px", color: "white" }}
            >
              <MenuItem value="January">January</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const headerHeight = {
  minHeight: "100px",
  justifyContent: "center",
};
