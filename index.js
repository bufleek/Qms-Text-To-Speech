const express = require("express");
const gtts = require("node-gtts")("en");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var speech = "Ticket Number, O, U, T, 1, Go to, OutPatient";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "/test.mp3"));
});

app.post("/speech", function (req, res) {
  let text = speech;
  res.set({ "Content-Type": "audio/mpeg" });
  gtts.stream(text).pipe(res);
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
