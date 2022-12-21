const express = require("express");
const router = express.Router();
const User = require("../db/User");
const { authenticateUser } = require("./helpers/authUserMiddleware");

/**
 * Get user based on token
 */
router.get("/", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

/**
 * Authenticate User
 */
router.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/testAuth", authenticateUser, (req, res, next) => {
  if (req.user.isAdmin === false) return res.sendStatus(404);
  const userInfo = req.user;
  res.status(200).send(userInfo);
});

module.exports = router;
