const express = require('express');

const router = express.Router();

const {browse, readLogin} = require("../../../controllers/userActions");

router.get("/", browse );
router.post("/", readLogin)

module.exports = router;