var express = require("express");
var timelinerouter = express.Router();
var userApi = require("./userapi");
var bodyparser = require("body-parser");
var userschema2 = require("./userschema2");
var userschema3 = require("./userschema3");
var userdb = require("./userschema");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

timelinerouter.post("/like", async (req, res) => {
  userschema2.find(
    { _id: req.body.postId, likes: { $in: [req.body.userId] } },
    function(err, result) {
      if (result.length > 0) {
        userschema2.updateOne(
          { _id: req.body.postId },
          { $pull: { likes: req.body.userId } },
          function(err, re) {
            userschema2
              .find({ _id: req.body.postId }, { likes: 1 })
              .then(result => {
                if (result) {
                  let addStatusInResult = {
                    dataFromDatabase: result,
                    status: "Image Disliked"
                  };
                  res.send(addStatusInResult);
                } else {
                  let addStatusInResult = {
                    dataFromDatabase: result,
                    status: "Error"
                  };
                  res.send(addStatusInResult);
                }
              });
          }
        );
      } else {
        userschema2.find({ _id: req.body.postId }, function(err, resu) {
          if (resu) {
            userschema2.updateOne(
              { _id: req.body.postId },
              { $push: { likes: req.body.userId } },
              function(err, re) {
                userschema2
                  .find({ _id: req.body.postId }, { likes: 1 })
                  .then(result => {
                    if (result) {
                      let addStatusInResult = {
                        dataFromDatabase: result,
                        status: "Image Liked"
                      };
                      res.send(addStatusInResult);
                    } else {
                      let addStatusInResult = {
                        dataFromDatabase: result,
                        status: "Error"
                      };
                      res.send(addStatusInResult);
                    }
                  });
              }
            );
          } else {
            let addStatusInResult = {
              dataFromDatabase: resu,
              status: "Error"
            };
            res.send(addStatusInResult);
          }
        });
      }
    }
  );
});

timelinerouter.post("/allPost", function(req, res) {
  const query = req.body.email ? { email: req.body.email } : {};
  userschema2
    .find(query)
    .sort({ _id: -1 })
    .skip(req.body.Skip)
    .limit(5)
    .then(resu => {
      if (resu.length === 0) {
      }
      if (resu) {
        let addStatusInResult = {
          dataFromDatabase: resu,
          status: "Profile Inserted"
        };
        res.send(addStatusInResult);
      } else {
        let addStatusInResult = {
          dataFromDatabase: resu,
          status: "Error"
        };
        res.send(addStatusInResult);
      }
    });
});

timelinerouter.post("/upload", upload.single("file"), function(req, res) {
  const data = {
    username: req.body.username,
    caption: req.body.caption,
    email: req.body.email,
    category: req.body.category,
    image: req.file.originalname
  };
  userschema2.create(data, function(err, resu) {
    if (resu) {
      userschema2.find({}, function(err, re) {
        let addStatusInResult = {
          status: "Post Inserted"
        };
        res.send(addStatusInResult);
      });
    } else {
      let addStatusInResult = {
        status: "Error"
      };
      res.send(addStatusInResult);
    }
  });
});

timelinerouter.post("/category", (req, res) => {
  req.body.category = req.body.category.toLowerCase();
  userschema3.findOne({ category: req.body.category }).then(result => {
    if (!result) {
      userschema3.create(req.body, function(err, resu) {
        if (resu) {
          userschema3.find({}, function(err, re) {
            let addStatusInResult = {
              dataFromDatabase: re,
              status: "Category Inserted"
            };
            res.send(addStatusInResult);
          });
        } else {
          let addStatusInResult = {
            dataFromDatabase: resu,
            status: "Error"
          };
          res.send(addStatusInResult);
        }
      });
    } else {
      let addStatusInResult = {
        status: "Already Exist"
      };
      res.send(addStatusInResult);
    }
  });
});

timelinerouter.post("/allcategory", function(req, res) {
  userschema3.find({}, function(err, resu) {
    if (resu) {
      let addStatusInResult = {
        dataFromDatabase: resu,
        status: "Category Inserted"
      };
      res.send(addStatusInResult);
    } else {
      let addStatusInResult = {
        dataFromDatabase: resu,
        status: "Error"
      };
      res.send(addStatusInResult);
    }
  });
});

timelinerouter.post("/userdata", (req, res) => {
  userdb
    .find({ _id: req.body.id })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.err(err);
    });
});

timelinerouter.post("/totalPosts", (req, res) => {
  const query = req.body.email ? { email: req.body.email } : {};
  userschema2
    .find(query)
    .countDocuments()
    .then(result => {
      if (result) {
        let count = {
          counts: result
        };
        res.send(count);
      }
    })
    .catch(err => {
      console.err(err);
    });
});

module.exports = timelinerouter;
