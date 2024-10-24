import Papa from "papaparse";

// function for fetching local csv files and converting them to json
export const getCsvFile = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const csvString = await response.text();
    let jsonData = Papa.parse(csvString, {
      header: true,
      transformHeader: (header) => convertToCamelCase(header),
    }).data;

    jsonData = jsonData.map((data: any) => {
      return { ...data, birthday: formatDate(data.birthday) };
    });

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

export const formatDate = (dateStr: string): string => {
  const longFormat = new Date(dateStr);
  if (!isNaN(longFormat.getTime())) {
    const month = longFormat.getMonth() + 1; // getMonth() returns 0-based month
    const day = String(longFormat.getDate()).padStart(2, "0");
    const year = longFormat.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const [month, day, year] = dateStr.split("/");
  return `${parseInt(month, 10)}/${String(day).padStart(2, "0")}/${year}`;
};

// TODO: could be used for checking if date is already in correct format
export const isDateInMDYFormat = (dateStr: string): boolean => {
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return regex.test(dateStr);
};
