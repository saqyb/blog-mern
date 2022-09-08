const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const authenticate = async (req, res, next) => {
  try {
    // console.log("Authenticate.js");
    const token = req.cookies.jwtoken;
    if (token) {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!rootUser) {
        throw new Error("User Not Found");
      } else {
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
      }
    }
    // req.todos = [...rootUser.todos];
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No Token Provided");
    console.log(err);
  }
};
module.exports = authenticate;
