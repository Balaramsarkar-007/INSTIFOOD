const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { verifyToken, generateTocken } = require("../middleware/manageTocken");
const { sessionDetails } = require("../heplerFun.js/authSessionDetail");

router.post("/auth/user/signin", verifyToken, generateTocken,  async (req, res, next) => {
  try {
    const data = req.otplessData;
    let user = await User.findOne({ ph: data.identities[0].identityValue });

    if (user) {
      return res
        .status(200)
        .json({
          status: "SUCCESS",
          message: "Login sucessfully",
          user: user,
        });
    }

    try {
      let newUser = new User({ ph: data.identities[0].identityValue });
      let savedUser = await newUser.save();
      console.log(savedUser);
      return res
        .status(200)
        .json({
          status: "SUCCESS",
          message: "Sign in sucessfully",
          user: savedUser,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
    res.send("Sign in sucessfully");
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/auth/user/varify-logedin", async (req, res, next) => {
  try {
    let currSecessionTocken = req.cookies.JWTSessionToken;
    console.log(currSecessionTocken);

    if (!currSecessionTocken) {
      return res
        .status(401)
        .json({ success: false, message: "No seesion tocken present" });
    }

    const currSecessionTockenDecode = jwt.verify(currSecessionTocken, process.env.JWT_SECRET);
    console.log(currSecessionTockenDecode);

    const options = {
      method: "POST",
      headers: {
        clientId: process.env.OTPLESS_CLIENT_ID,
        clientSecret: process.env.OTPLESS_SECERT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken: currSecessionTockenDecode.sessionToken }),
    };

    const response = await fetch(
      "https://user-auth.otpless.app/v1/sessions/validate-session",
      options
    );
    data = await response.json();
    console.log(data);

    if (data.success) {
      let user = await User.findOne({ ph: currSecessionTockenDecode.userId });
      console.log(user);

      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "User is logedin", userId: user });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "User is not logedin" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No user present" });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/auth/user/sing-out", async (req, res, next) => {
  let sessionToken = req.cookies.JWTSessionToken;
  if (!sessionToken) {
    return res
      .status(401)
      .json({ success: false, message: "No seesion tocken present" });
  }

  const currSecessionTockenDecode = jwt.verify(sessionToken, process.env.JWT_SECRET);

  const options = {
    method: "POST",
    headers: {
      clientId: process.env.OTPLESS_CLIENT_ID,
      clientSecret: process.env.OTPLESS_SECERT_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionToken: currSecessionTockenDecode.sessionToken }),
  };

  const response = await fetch(
    "https://user-auth.otpless.app/v1/sessions/validate-session",
    options
  );
  data = await response.json();
  console.log(data);
  if (data.success) {
    res.clearCookie("JWTSessionToken");
    res.status(200).json({ success: true, message: "User is loged out" });
  } else {
    res.clearCookie("JWTSessionToken");
    res.status(401).json({ success: false, message: "User is not loged out" });
  }
  next();
});

module.exports = router;
