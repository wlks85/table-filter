const fs = require("fs");
const csv = require("csv-parser");

exports.readCSV = (filepath, schema) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filepath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(schema(data));
      })
      .on("end", () => {
        fs.unlinkSync(filepath);
        resolve(results);
      })
      .on("error", (err) => {
        fs.unlinkSync(filepath);
        reject("CSV file read failed!");
      });
  });
};

exports.readAudioCSV = (filepath, schema) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filepath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(schema(data));
      })
      .on("end", () => {
        const cleanedResults = results.map((row) => {
          return Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              value?.replace(/\n/g, ""),
            ])
          );
        });

        resolve(cleanedResults);
      })
      .on("error", (err) => {
        reject("CSV file read failed!");
      });
  });
};
