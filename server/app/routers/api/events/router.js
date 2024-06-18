const express = require('express');

const router = express.Router();

const {browse, read, add} = require("../../../controllers/eventAction")

router.get("/", browse);
router.get("/:id", read);
router.post("/", add)



module.exports = router;