const user = require("disconnect/lib/user");
const express = require("express");
const { Record, User, Cart, CartRecords, Style, Genre } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

router.post("/", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email, phoneNum, address, birthday, avatarUrl } = req.body;
   await User.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNum: phoneNum,
        address: address,
        birthday: birthday,
        avatarUrl: avatarUrl,
        isAdmin: false,
      })

      res.sendStatus(200)

  } catch (err) {
    console.log(err)
    res.sendStatus(404)
    next(err);
  }
});

module.exports = router;