const user = require("disconnect/lib/user");
const express = require("express");
const { Record, User, Cart, CartRecords, Style, Genre } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

router.post("/", async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNum,
      address,
      birthday,
      avatarUrl,
    } = req.body;
    const newUser = await User.create({
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
    });

    const newUserCart = await Cart.create();

    newUserCart.setUser(newUser);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
    next(err);
  }
});

router.post("/usernameAuth", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["username"],
    });

    const usernames = users.map((user) => user.dataValues.username);

    const currentUsername = req.body.currentUsername.toLowerCase();

    usernames.includes(currentUsername)
      ? res.sendStatus(400)
      : res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
    next(err);
  }
});

router.post("/userEmailAuth", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["email"],
    });

    const userEmails = users.map((user) => user.dataValues.email);

    const currentEmail = req.body.currentEmail.toLowerCase();

    userEmails.includes(currentEmail)
      ? res.sendStatus(400)
      : res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
