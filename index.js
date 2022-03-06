const express = require("express");
const gtts = require("node-gtts")("en-uk");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomUUID } = require("crypto");

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

app.get("/files/audios/:file", (req, res) => {
  var file = req.params.file;
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, "files/audios", file));
});

app.post("/error", (req, res) => {
  console.log(req.body.error);
  res.send({});
});

app.post("/speech", function (req, res) {
  let file = path.join("files", "audios", `${randomUUID()}_${Date.now()}.mp3`);
  let filepath = path.join(__dirname, file);
  console.log(req.body)
  gtts.save(filepath, req.body.text);
  res.send({ url: file });
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
