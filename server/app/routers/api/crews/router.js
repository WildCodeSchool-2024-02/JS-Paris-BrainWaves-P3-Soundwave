const express = require("express");

const router = express.Router();
const { browse, read, readEventsByCrewId } = require("../../../controllers/crewAction");

router.get("/", browse);
// router.get("/:id", read);
router.get("/:id", readEventsByCrewId);

module.exports = router;
