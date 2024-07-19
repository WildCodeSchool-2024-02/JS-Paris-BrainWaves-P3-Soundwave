const express = require("express");

const router = express.Router();

const { browse } = require("../../../controllers/categoryAction");

router.get("/", browse);

module.exports = router;
