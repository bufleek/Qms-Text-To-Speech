const express = require("express");
const gtts = require("node-gtts")("en-uk");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options("*", cors());

const corsOptions = {
  optionsSuccessStatus: 200,
};
var speech = "Ticket Number , O , U , T , 1 , Go To , Consultation";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/test", (req, res) => {
  console.log("test");
  res.sendFile(path.join(__dirname, "/test.mp3"));
});

app.post("/error", (req, res) => {
  console.log(req.body.error);
  res.send({});
});

app.post("/speech", cors(corsOptions), function (req, res) {
  console.log(req.body);
  res.set({ "Content-Type": "audio/mpeg" });
  gtts.stream("Ticket number. OUT1 . go to . Consultation 1 ").pipe(res);
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
