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

    jsonData = jsonData.map((data: any) => {
      const birthday = formatDate(data.birthday);
      return { ...data, birthday, age: birthday };
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

// calculates age based on birthdate string
export const calculateAge = (
  birthdate: string,
  type: "years" | "days" | "hours"
) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age;

  switch (type) {
    case "years":
      age = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      break;
    case "days":
      age = Math.floor(
        (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      break;
    case "hours":
      age = Math.floor(
        (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60)
      );
      break;
    default:
      age = 0;
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
