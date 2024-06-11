const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");
const eventRouter = require("./events/router")

router.use("/items", itemsRouter);
router.use("/events", eventRouter);

/* ************************************************************************* */

module.exports = router;
