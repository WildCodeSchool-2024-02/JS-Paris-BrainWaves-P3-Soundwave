const express = require('express');

const router = express.Router();

const {browse, read, add, readCategoryEvents} = require("../../../controllers/eventAction")

router.get("/", browse);
router.get("/category/:genre", readCategoryEvents);
router.get("/:id", read);
router.post("/", add)



module.exports = router;