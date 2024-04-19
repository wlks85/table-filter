const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const db = require("./models");
const config = require("./config");
const app = express();

app.use(express.json());
app.use(cors());

const privateKey = fs.readFileSync(
  "./utils/credential/private_key.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "./utils/credential/certificate.crt",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/build")));

db.mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected mongodb successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

require("./routes/variable")(app);
require("./routes/variant")(app);
require("./routes/metadata")(app);
require("./routes/auth")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(443, () => {
//   console.log("HTTPS Server is running on Port 443");
// });

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log("Server is running on PORT 5000");
});
