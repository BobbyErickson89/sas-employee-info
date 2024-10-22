import Papa from "papaparse";

// function for fetching local csv files and converting them to json
export const getCsvFile = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const csvString = await response.text();
    const jsonData = Papa.parse(csvString, {
      header: true,
      transformHeader: (header) => convertToCamelCase(header),
    }).data;

    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

// used for converting strings to camel case
export const convertToCamelCase = (str: string) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};
