const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/records", require("./recordsRouter"));
router.use("/orders", require("./ordersRouter"));
router.use("/genres", require("./genresRouter"));
router.use("/cart", require("./cartRouter"));
router.use("/user", require("./userRouter"));

module.exports = router;
