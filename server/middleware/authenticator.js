const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const myToken = process.env.JWT_KEY;

const validator = (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token)
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    console.log("error in token");
  } else {
    try {
      const respnse = jwt.verify(token, myToken);
      if (respnse) {
        // const userId = decoded.userId;
        const email = decoded.email;
        User.findByEmail(email, (err, result) => {
          if (err) {
            res.status(401).send({ error: "error", msg: "Invalid user" });
          } else if (result[0].verified) {
            next();
          } else {
            res.status(401).send({ error: "error", msg: "Invalid user" });
          }
        });
      } else {
        res.status(401).send({ error: "error", msg: "Invalid user" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "error", msg: "Invalid user" });
      console.log("it is in catch blllock");
    }
  }
};

module.exports = validator;
