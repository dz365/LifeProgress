require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  verifyUser,
  signJwt,
  verifyUserWithoutResponse,
} = require("./middleware/jwtauth");
const API_PORT = process.env.API_PORT || 3000;
const BASE_URL = "/api";
const crypto = require("crypto");

const app = express();

// Handle CORS
app.use(cors({ origin: "*" }));

// Setup body-parser middleware
app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

mongoose.connect(process.env.MONGO_URL);
const User = require("./models/User")(mongoose);

// Initialize passport
app.use(passport.initialize());
require("./middleware/passport")(User, passport);

app.use(`${BASE_URL}`, router);

// Login route with Passport
router.post(`/user/signin`, (req, res, next) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Login failed.",
      });
    }
    const token = signJwt(user);

    return res.status(200).json({
      message: "Login successful",
      token: token,
      authData: jwt.decode(token, { json: true, complete: true }),
    });
  })(req, res, next);
});

router.post(`/user/create`, (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(409).json({
        message: info.message,
      });
    }
    return res.status(200).json({
      message: "Registration successful",
    });
  })(req, res, next);
});
// Set up Express to listen on API_PORT
app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
});
