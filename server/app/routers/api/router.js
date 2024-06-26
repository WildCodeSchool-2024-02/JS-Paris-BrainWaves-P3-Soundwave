const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");
const eventRouter = require("./events/router");
const crewRouter = require("./crews/router");
const userRouter = require("./users/router");
const categoryRouter = require("./category/router");

router.use("/items", itemsRouter);
router.use("/events", eventRouter);
router.use("/crews", crewRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

/* ************************************************************************* */

module.exports = router;
