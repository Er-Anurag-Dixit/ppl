var express = require("express");
var approuter = express.Router();
var userApi = require("./userapi");
var userschema2 = require("./userschema2");
var userschema4 = require("./comments");
var userdb = require("./userschema");
const jwt = require('jsonwebtoken');

approuter.post("/signup", async (req, res) => {
  let result = await userApi.get_data(req.body);

  if (result.length) {
    res.send("Email already exist");
  } else {
    await userApi.adduser(req.body);

    res.send("done");
  }
});

approuter.post("/login", async (req, res) => {
  let result = await userApi.get_data(req.body);
  if (result.length) {
    let results = await userApi.exist(req.body);
    if (results.length) {
      let data = await userApi.get_data(req.body);
      jwt.sign(req.body, 'privatekey', { expiresIn: '1h' },(err, token) => {
        if(err) { console.log(err) }    
        let addStatusInResult = {
          dataFromDatabase: data,
          statusCode:200,
          status: "logged in successfully",
          token,
        };
        res.send(addStatusInResult);
    });
    } else {
      res.send("wrong password");
    }
  } else {
    res.send("Email Id doesn't exist ");
  }
});

approuter.post("/comments", function(req, res) {
  userdb
    .find({ _id: req.body.userId }, { fname: 1, lname: 1 }, function(
      err,
      result
    ) {
      if (err) {
        console.err("Error");
      }
    })
    .then(data => {
      const username = data[0].fname + " " + data[0].lname;
      const variable = {
        cID: req.body.imageId,
        comment: req.body.comment,
        user: username
      };
      userschema4.create(variable, function(err, resu) {
        if (resu) {
          userschema4.find(
            { cID: req.body.imageId },
            { comment: 1, user: 1, _id: 0 },
            function(err, re) {
              // console.log("comments--->", re, "length", re.length);
              userschema2
                .updateOne(
                  { _id: req.body.imageId },
                  { noOfComments: re.length }
                )
                .then(result => {
                  // userschema2.find({ _id: req.body.imageId }).then(data => {
                  //   console.log("result=======>", data);
                  // });
                  // console.log("--------", result);
                });
              let addStatusInResult = {
                dataFromDatabase: re,
                status: "Comment Inserted"
              };
              res.send(addStatusInResult);
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
    });
});

approuter.post("/allcomments", function(req, res) {
  userschema4.find({ cID: req.body.imageId }, { comment: 1, user: 1 }, function(
    err,
    resu
  ) {
    if (resu) {
      let addStatusInResult = {
        dataFromDatabase: resu
      };
      res.send(addStatusInResult);
    } else {
      let addStatusInResult = {
        dataFromDatabase: resu
      };
      res.send(addStatusInResult);
    }
  });
});

approuter.post("/imagedata", async (req, res) => {
  userschema2.find({ _id: req.body.id }, function(err, resu) {
    if (resu) {
      let addStatusInResult = {
        dataBase: resu
      };
      res.send(addStatusInResult);
    } else {
      let addStatusInResult = {
        database: resu
      };
      res.send(addStatusInResult);
    }
  });
});

module.exports = approuter;
