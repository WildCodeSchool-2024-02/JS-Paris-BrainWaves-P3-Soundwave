const express = require('express');

const router = express.Router();

const {browse} = require("../../../controllers/eventAction")

router.get("/", browse);



module.exports = router;