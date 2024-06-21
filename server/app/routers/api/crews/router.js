const express = require("express");

const router = express.Router();
const { browse, read, edit } = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);

module.exports = router;
