import Papa from "papaparse";

// function for fetching local csv files and converting them to json
export const getCsvFile = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    // Getting our string of csv data
    const csvString = await response.text();

    // Parsing the csv data into json
    let jsonData = Papa.parse(csvString, {
      header: true,
      transformHeader: (header) => convertToCamelCase(header),
    }).data;

    // Formatting the dates
    jsonData = jsonData.map((data: any) => {
      const birthday = formatDate(data.birthday);
      const age = calculateAge(birthday);
      return { ...data, birthday, age };
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

// formatting date to mm/dd/yyyy format
export const formatDate = (dateStr: string) => {
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

export const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the current date is before the birthdate in the current year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const months = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];
