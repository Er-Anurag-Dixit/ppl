var express = require("express");
var mongoose = require("mongoose");
var approuter = require("./router");
var timelinerouter = require("./timelinerouter");
var cors = require("cors");
var bodyparser = require("body-parser");
var app = express();
app.use(cors());
app.use(express.static("Uploads"));
app.use(bodyparser.urlencoded({ extended: false }));
mongoose.connect(
  "mongodb://localhost:27017/react",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db Connected................")
);

app.use(bodyparser.json());
app.use("/", approuter);
app.use("/timeline", timelinerouter);
app.listen(8083, () => console.log("Server Running................"));
