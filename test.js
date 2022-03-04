var gtts = require("node-gtts")("en");
var path = require("path");
var filepath = path.join(__dirname, "test.mp3");

gtts.save(filepath, "QMS voice compatibility test", function () {
  console.log("save done");
});
