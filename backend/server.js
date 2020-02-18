let express = require("express");
let mongoose = require("mongoose");
let approuter = require("./router");
let timelinerouter = require("./timelinerouter");
let cors = require("cors");
let bodyparser = require("body-parser");
let app = express();
const socketIo = require("socket.io");

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
const server = app.listen(8083, () =>
  console.log("Server Running................")
);
const io = socketIo(server);

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log();
  });
});
io.on("like", () => {
  socketIo.emit("likedDone", () => {});
});
