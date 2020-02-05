var mongoose = require("mongoose");

var myschema = mongoose.Schema({
  username: { type: String },
  caption: { type: String },
  email: { type: String },
  category: { type: String },
  image: { type: String },
  likes: { type: Array },
  noOfComments: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("uploaddatas", myschema);
