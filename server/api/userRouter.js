const express = require("express");
const { User, Cart, Order, Record, Genre, Style } = require("../db");
const router = express.Router();
const { authenticateUser } = require("./helpers/authUserMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    // moved users orders to the user router so that admin can have full access to all orders on the order router
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [Record],
      attributes: {
        exclude: [
          "creditCardNum",
          "creditCardName",
          "expiryDate",
          "ccSecurity",
        ],
      },
    });

    res.send(orders);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.get("/userlist", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      const userList = await User.findAll({
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).send(userList);
    }
  } catch (err) {
    res.sendStatus(401);
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

router.put("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
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
    const updatedUser = await user.update({
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNum,
      address,
      birthday,
      avatarUrl,
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.put("/adminuserupdate", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      const {
        id,
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

      const userToChange = await User.findByPK(id);
      const updatedUser = await userToChange.update({
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

      res.status(200).send(updatedUser);
    }
  } catch (err) {
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
