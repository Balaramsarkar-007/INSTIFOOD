const express = require("express");
const router = express.Router();
const Owner = require("../models/ShopOwner");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { verifyToken, generateTocken } = require("../middleware/manageTocken");

router.post("/auth/owner/signin", verifyToken, generateTocken, async (req, res, next) => {
  try {
    const data = req.otplessData;
    let owner = await Owner.findOne({ ph: data.identities[0].identityValue });

    if (owner) {
      return res
        .status(200)
        .json({
          status: "SUCCESS",
          message: "Login sucessfully",
          owner: owner,
        });
    }

    try {
      let newOwner = new Owner({ ph: data.identities[0].identityValue });
      let saveOwner = await newOwner.save();
      console.log(saveOwner);
      return res
        .status(200)
        .json({
          status: "SUCCESS",
          message: "Sign in sucessfully",
          owner: saveOwner,
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

router.get("/auth/owner/varify-logedin", async (req, res, next) => {
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
      let owner = await Owner.findOne({ ph: currSecessionTockenDecode.userId });
      console.log(owner);

      if (owner) {
        return res
          .status(200)
          .json({ success: true, message: "User is logedin", owner: owner });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Owner is not logedin" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No owner present" });
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
