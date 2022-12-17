const express = require("express");
const { User, Cart, Order, Record, Genre, Style } = require("../db");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    // moved users orders to the user router so that admin can have full access to all orders on the order router
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [Record],
      attributes: {exclude: ['creditCardNum', 'creditCardName', 'expiryDate', 'ccSecurity']}
    });

    res.send(orders);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});


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
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNum,
      address,
      birthday,
      avatarUrl,
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
