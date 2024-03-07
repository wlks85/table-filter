const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "./audios_vars_correspondence.csv"; // Replace with your CSV file path
const jsonFilePath = "audio_code.json"; // Output JSON file path
const jsonArray = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    jsonArray.push(row);
  })
  .on("end", () => {
    fs.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("CSV file successfully converted to JSON:", jsonFilePath);
      }
    });
  })
  .on("error", (err) => {
    console.error("Error parsing CSV:", err);
  });
