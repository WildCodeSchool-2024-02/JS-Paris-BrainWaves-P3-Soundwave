const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  edit,
  readEventsByCrewId,
} = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);

router.get("/:id/events", readEventsByCrewId);

module.exports = router;
